
"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CreateBatchSchema, type CreateBatchValues } from "@/lib/schemas";
import { CalendarIcon, LoaderCircle, QrCode, MapPin, Sparkles, Languages, Leaf, AlertTriangle, CheckCircle, Info, BadgeDollarSign } from "lucide-react";
import { format, subDays } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CameraCapture } from "@/components/camera-capture";
import { diagnosePlantHealth, DiagnosePlantHealthOutput } from "@/ai/flows/diagnose-plant-health";
import { getGeocodedLocation } from "@/app/actions";
import QRCode from 'qrcode';
import { useDbContext } from "@/context/db-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useLanguage, content } from '@/context/language-context';
import { LanguageSwitcher } from "@/components/language-switcher";

type DiagnosisState = DiagnosePlantHealthOutput | null;

// Simulate approved harvest zones (latitude, longitude, radius in degrees)
const APPROVED_ZONES = [
    { name: "Coimbatore", lat: 11.01, lon: 76.95, radius: 1 },
    { name: "Pratapgarh", lat: 25.9, lon: 81.97, radius: 1 },
    { name: "Kangra", lat: 32.1, lon: 76.27, radius: 1 },
];

export function CreateBatchForm() {
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [newBatchId, setNewBatchId] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisState>(null);
  const [diagnosisLoading, setDiagnosisLoading] useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addBatch } = useDbContext();
  const { language, setLanguage, content } = useLanguage();
  const c = content[language].createBatch;


  useEffect(() => {
    if (newBatchId) {
      QRCode.toDataURL(newBatchId, { width: 250, margin: 2 }, (err, dataUrl) => {
        if (err) {
          console.error("Failed to generate QR code:", err);
          return;
        }
        setQrCodeDataUrl(dataUrl);
      });
    }
  }, [newBatchId]);

  const form = useForm<CreateBatchValues>({
    resolver: zodResolver(CreateBatchSchema),
    defaultValues: {
      productName: "Organic Basil",
      farmName: "Verdant Valley Farms",
      location: "",
      harvestDate: new Date(),
      processingDetails: "Hand-picked at dawn, immediately cooled.",
    },
  });

  const handlePhotoCapture = useCallback(async (dataUrl: string) => {
    setPhoto(dataUrl);
    setDiagnosis(null);
    setDiagnosisLoading(true);
    try {
      const result = await diagnosePlantHealth({ photoDataUri: dataUrl, language });
      setDiagnosis(result);
      if (result.healthAssessment.healthStatus === 'Unhealthy') {
        toast({
            variant: 'destructive',
            title: c.toast.unhealthyTitle,
            description: c.toast.unhealthyDescription,
        });
      }
    } catch (error) {
      console.error("Diagnosis failed:", error);
      toast({
        variant: 'destructive',
        title: c.toast.diagnosisFailedTitle,
        description: c.toast.diagnosisFailedDescription,
      });
      // Allow proceeding without diagnosis by creating a mock 'error' diagnosis object
      setDiagnosis({ 
          isPlant: false, 
          identification: { commonName: 'Error', latinName: 'Error', description: 'AI analysis could not be completed.' },
          healthAssessment: { healthStatus: 'Unhealthy', healthScore: 0, diagnosis: 'N/A', potentialCauses: [], recommendations: [] },
          farmingGuide: { suggestedFertilizers: [], careGuide: 'N/A' },
          marketValue: { estimatedPrice: 'N/A', priceRationale: 'N/A' },
      });
    } finally {
      setDiagnosisLoading(false);
    }
  }, [toast, language, c]);

  const handleGetLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const result = await getGeocodedLocation(latitude, longitude);

          if (result.success && result.location) {
             const preciseLocation = `${result.location} (Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)})`;
             form.setValue("location", preciseLocation, { shouldValidate: true });
             toast({
                title: c.toast.locationCapturedTitle,
                description: `${c.toast.locationCapturedDescription}: ${preciseLocation}`,
             });
          } else {
             toast({
                variant: "destructive",
                title: c.toast.locationErrorTitle,
                description: result.message || c.toast.locationErrorDescription,
             });
          }
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            variant: "destructive",
            title: c.toast.locationErrorTitle,
            description: c.toast.locationPermissionError,
          });
          setLoadingLocation(false);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: c.toast.locationNotSupportedTitle,
        description: c.toast.locationNotSupportedDescription,
      });
      setLoadingLocation(false);
    }
  };

  // Simulate smart contract validation for geo-fencing
  const validateLocation = (locationString: string): boolean => {
      const match = locationString.match(/Lat: ([-]?\d+\.\d+), Lon: ([-]?\d+\.\d+)/);
      if (!match) return false;
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[2]);

      return APPROVED_ZONES.some(zone => {
          const distance = Math.sqrt(Math.pow(lat - zone.lat, 2) + Math.pow(lon - zone.lon, 2));
          return distance <= zone.radius;
      });
  };

  async function onSubmit(values: CreateBatchValues) {
    if (!photo) {
      toast({
        variant: 'destructive',
        title: c.toast.photoRequiredTitle,
        description: c.toast.photoRequiredDescription,
      });
      return;
    }
    if (!diagnosis) {
        toast({
            variant: 'destructive',
            title: c.toast.diagnosisRequiredTitle,
            description: c.toast.diagnosisRequiredDescription,
        });
        return;
    }
     if (diagnosis.healthAssessment.healthStatus === 'Unhealthy') {
        toast({
            variant: 'destructive',
            title: c.toast.batchCreationBlockedTitle,
            description: c.toast.batchCreationBlockedDescription,
        });
        return;
    }
     if (!values.location) {
      toast({
        variant: 'destructive',
        title: c.toast.locationRequiredTitle,
        description: c.toast.locationRequiredDescription,
      });
      return;
    }
    
    // Simulate smart contract check for geo-fencing
    if (!validateLocation(values.location)) {
        toast({
            variant: 'destructive',
            title: "Compliance Error",
            description: "Harvest location is outside of an approved geo-fenced zone. Batch cannot be created.",
        });
        return;
    }

    setLoading(true);
    try {
        const newBatch = addBatch({ ...values, photo, diagnosis });
        setNewBatchId(newBatch.batchId);
        toast({
            title: c.toast.batchCreatedSuccessTitle,
            description: `${c.toast.batchCreatedSuccessDescription} ${newBatch.batchId}.`,
        });
    } catch (error) {
        console.error("Failed to create batch:", error);
        toast({
            variant: "destructive",
            title: c.toast.batchCreationFailureTitle,
            description: c.toast.batchCreationFailureDescription,
        });
    } finally {
        setLoading(false);
    }
  }

  const handleViewProvenance = () => {
    if (newBatchId) {
      const role = searchParams.get('role') || 'farmer';
      router.push(`/provenance/${newBatchId}?role=${role}`);
    }
  };

  const handleResetForm = () => {
    form.reset({
        productName: "Organic Basil",
        farmName: "Verdant Valley Farms",
        location: "",
        harvestDate: new Date(),
        processingDetails: "Hand-picked at dawn, immediately cooled.",
    });
    setNewBatchId(null);
    setPhoto(null);
    setDiagnosis(null);
    setQrCodeDataUrl(null);
  }
  
  if (newBatchId && qrCodeDataUrl) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            {c.qr.title}
          </CardTitle>
          <CardDescription>{c.qr.batchIdLabel}: {newBatchId}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center p-4 border rounded-lg bg-white">
            <Image
              src={qrCodeDataUrl}
              alt={`QR Code for batch ${newBatchId}`}
              width={250}
              height={250}
              data-ai-hint="qr code"
            />
          </div>
          <div className="text-muted-foreground text-sm mt-4">
            {c.qr.description}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleViewProvenance}>
              {c.qr.viewJourneyButton}
            </Button>
            <Button variant="outline" size="lg" onClick={handleResetForm}>
              {c.qr.createAnotherButton}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

    const getDiagnosisTitleAndColor = () => {
        if (diagnosisLoading) return { title: c.diagnosis.analyzing, color: "bg-muted-foreground" };
        if (!diagnosis) return { title: c.diagnosis.awaitingPhoto, color: "bg-muted-foreground" };
        if (!diagnosis.isPlant) return { title: c.diagnosis.noPlant, color: "bg-amber-500" };
        switch (diagnosis.healthAssessment.healthStatus) {
            case 'Healthy': return { title: c.diagnosis.healthy, color: "bg-green-500" };
            case 'Moderate Concern': return { title: c.diagnosis.moderate, color: "bg-yellow-500" };
            case 'Unhealthy': return { title: c.diagnosis.unhealthy, color: "bg-destructive" };
            default: return { title: c.diagnosis.available, color: "bg-primary" };
        }
    }
  const { title, color } = getDiagnosisTitleAndColor();

  const isBatchCreationDisabled = loading || !photo || !diagnosis || diagnosisLoading || diagnosis.healthAssessment.healthStatus === 'Unhealthy';


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-headline font-bold">1. {c.step1.title}</h2>
          <p className="text-muted-foreground">
            {c.step1.description}
          </p>
        </div>
        <CameraCapture onCapture={handlePhotoCapture} />
        
        <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-headline font-bold mt-8">2. {c.step2.title}</h2>
              <p className="text-muted-foreground">
                {c.step2.description}
              </p>
            </div>
            <div className="max-w-xs">
                <Label htmlFor="language-select">{c.step2.languageLabel}</Label>
                <LanguageSwitcher />
            </div>
        </div>
        
        <Card className={cn("transition-all", !photo && "opacity-50 pointer-events-none")}>
          <CardHeader className="flex-row items-start gap-4 space-y-0">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white shrink-0 mt-1", color)}>
              {diagnosisLoading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {title}
                {diagnosis && diagnosis.isPlant && <Badge variant="secondary">{diagnosis.healthAssessment.healthScore}/100</Badge>}
              </CardTitle>
              <CardDescription>
                {diagnosisLoading ? c.diagnosis.loadingText : diagnosis ? diagnosis.identification.description : c.diagnosis.placeholder}
              </CardDescription>
            </div>
          </CardHeader>
          {diagnosis && diagnosis.isPlant && (
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="diagnosis">
                  <AccordionItem value="diagnosis">
                    <AccordionTrigger>{c.diagnosis.recommendations.title}</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                       <div className="flex items-center gap-2">
                        {diagnosis.healthAssessment.healthStatus === 'Healthy' ? 
                            <CheckCircle className="h-5 w-5 text-green-600" /> : 
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                        }
                        <h4 className="font-semibold">{diagnosis.healthAssessment.healthStatus}</h4>
                       </div>
                       <p className="text-sm text-muted-foreground">{diagnosis.healthAssessment.diagnosis}</p>
                       
                       {diagnosis.healthAssessment.healthStatus !== 'Healthy' && (
                        <>
                          <div>
                            <h5 className="font-semibold mb-2">{c.diagnosis.recommendations.causesTitle}</h5>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {diagnosis.healthAssessment.potentialCauses.map((cause, i) => <li key={i}>{cause}</li>)}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-2">{c.diagnosis.recommendations.recsTitle}</h5>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {diagnosis.healthAssessment.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                            </ul>
                          </div>
                        </>
                       )}
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="farming-guide">
                    <AccordionTrigger>{c.diagnosis.farmingGuide.title}</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                      <div>
                        <h5 className="font-semibold mb-2">{c.diagnosis.farmingGuide.fertilizersTitle}</h5>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {diagnosis.farmingGuide.suggestedFertilizers.map((fert, i) => <li key={i}>{fert}</li>)}
                            {diagnosis.farmingGuide.suggestedFertilizers.length === 0 && <li>{c.diagnosis.farmingGuide.noFertilizers}</li>}
                        </ul>
                      </div>
                       <div>
                        <h5 className="font-semibold mb-2">{c.diagnosis.farmingGuide.careGuideTitle}</h5>
                        <div className="flex items-start gap-2">
                            <Leaf className="h-5 w-5 text-primary mt-1" />
                            <div>
                            <h4 className="font-semibold">{diagnosis.identification.commonName} <Badge variant="outline" className="ml-2 italic">{diagnosis.identification.latinName}</Badge></h4>
                            <p className="text-sm text-muted-foreground mt-2">{diagnosis.farmingGuide.careGuide}</p>
                            </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="market-value">
                    <AccordionTrigger>{c.diagnosis.marketValue.title}</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                      <div className="flex items-start gap-2">
                        <BadgeDollarSign className="h-5 w-5 text-primary mt-1" />
                        <div>
                           <h4 className="font-semibold">{diagnosis.marketValue.estimatedPrice}</h4>
                           <p className="text-sm text-muted-foreground mt-1">{diagnosis.marketValue.priceRationale}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </CardContent>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">3. {c.step3.title}</CardTitle>
          <CardDescription>{c.step3.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{c.form.productName.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={c.form.productName.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="farmName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{c.form.farmName.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={c.form.farmName.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{c.form.location.label}</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder={c.form.location.placeholder} {...field} readOnly className="bg-muted"/>
                      </FormControl>
                      <Button type="button" variant="outline" size="icon" onClick={handleGetLocation} disabled={loadingLocation}>
                         {loadingLocation ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="harvestDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{c.form.harvestDate.label}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{c.form.harvestDate.placeholder}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="processingDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{c.form.notes.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={c.form.notes.placeholder}
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isBatchCreationDisabled} size="lg" className="w-full">
                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      {c.form.submitButtonLoading}
                    </>
                  ) : (
                    c.form.submitButton
                  )}
                </Button>
              </div>
               {isBatchCreationDisabled && diagnosis && (
                <div className="text-sm text-destructive text-center">
                    {c.form.submitError}
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

    