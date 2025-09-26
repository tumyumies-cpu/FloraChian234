
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

type DiagnosisState = DiagnosePlantHealthOutput | null;

export function CreateBatchForm() {
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [newBatchId, setNewBatchId] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisState>(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [threeDaysAgo, setThreeDaysAgo] = useState<Date | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [language, setLanguage] = useState('English');
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addBatch } = useDbContext();

  useEffect(() => {
    // This will only run on the client, after initial hydration
    setThreeDaysAgo(subDays(new Date(), 2));
  }, []);

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
            title: 'Unhealthy Plant Detected',
            description: 'Batch creation is blocked because the plant quality is too low.',
        });
      }
    } catch (error) {
      console.error("Diagnosis failed:", error);
      toast({
        variant: 'destructive',
        title: 'AI Diagnosis Failed',
        description: 'Could not analyze the plant health. Please try again or proceed manually.',
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
  }, [toast, language]);

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
                title: "Location Captured",
                description: `Farm location set to: ${preciseLocation}`,
             });
          } else {
             toast({
                variant: "destructive",
                title: "Location Error",
                description: result.message || "Could not retrieve location.",
             });
          }
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not retrieve location. Please enable location services.",
          });
          setLoadingLocation(false);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser.",
      });
      setLoadingLocation(false);
    }
  };

  async function onSubmit(values: CreateBatchValues) {
    if (!photo) {
      toast({
        variant: 'destructive',
        title: 'Photo Required',
        description: 'Please take or upload a photo of the harvest.',
      });
      return;
    }
    if (!diagnosis) {
        toast({
            variant: 'destructive',
            title: 'AI Diagnosis Required',
            description: 'Please wait for the AI diagnosis to complete.',
        });
        return;
    }
     if (diagnosis.healthAssessment.healthStatus === 'Unhealthy') {
        toast({
            variant: 'destructive',
            title: 'Batch Creation Blocked',
            description: 'Cannot create a batch for an unhealthy plant.',
        });
        return;
    }
     if (!values.location) {
      toast({
        variant: 'destructive',
        title: 'Location Required',
        description: 'Please use the auto-locate button to set the farm location.',
      });
      return;
    }

    setLoading(true);
    try {
        const newBatch = addBatch({ ...values, photo, diagnosis });
        setNewBatchId(newBatch.batchId);
        toast({
            title: "Batch Created Successfully!",
            description: `Batch ID ${newBatch.batchId} is now being tracked.`,
        });
    } catch (error) {
        console.error("Failed to create batch:", error);
        toast({
            variant: "destructive",
            title: "Failed to Create Batch",
            description: "An unexpected error occurred.",
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
            Batch Created & QR Code Ready
          </CardTitle>
          <CardDescription>Batch ID: {newBatchId}</CardDescription>
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
          <p className="text-muted-foreground text-sm mt-4">
            This QR code now contains the Batch ID and can be attached to the physical batch for scanning at the next stage of the supply chain.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleViewProvenance}>
              View Product Journey
            </Button>
            <Button variant="outline" size="lg" onClick={handleResetForm}>
              Create Another Batch
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

    const getDiagnosisTitleAndColor = () => {
        if (diagnosisLoading) return { title: "Analyzing...", color: "bg-muted-foreground" };
        if (!diagnosis) return { title: "Awaiting Photo", color: "bg-muted-foreground" };
        if (!diagnosis.isPlant) return { title: "No Plant Detected", color: "bg-amber-500" };
        switch (diagnosis.healthAssessment.healthStatus) {
            case 'Healthy': return { title: "Plant is Healthy", color: "bg-green-500" };
            case 'Moderate Concern': return { title: "Moderate Concern", color: "bg-yellow-500" };
            case 'Unhealthy': return { title: "Unhealthy Plant", color: "bg-destructive" };
            default: return { title: "Diagnosis Available", color: "bg-primary" };
        }
    }
  const { title, color } = getDiagnosisTitleAndColor();

  const isBatchCreationDisabled = loading || !photo || !diagnosis || diagnosisLoading || diagnosis.healthAssessment.healthStatus === 'Unhealthy';


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-headline font-bold">1. Harvest Photo</h2>
          <p className="text-muted-foreground">
            Take a real-time photo of the harvest for AI analysis.
          </p>
        </div>
        <CameraCapture onCapture={handlePhotoCapture} />
        
        <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-headline font-bold mt-8">2. AI Health Diagnosis</h2>
              <p className="text-muted-foreground">
                Select a language and get a detailed analysis of the plant's health.
              </p>
            </div>
            <div className="max-w-xs">
                <Label htmlFor="language-select">Report Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language-select" className="mt-2">
                        <div className="flex items-center gap-2">
                          <Languages className="h-4 w-4" />
                          <SelectValue placeholder="Select language" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Mandarin Chinese">Mandarin Chinese</SelectItem>
                        <SelectItem value="Telugu">Telugu</SelectItem>
                        <SelectItem value="Tamil">Tamil</SelectItem>
                    </SelectContent>
                </Select>
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
                {diagnosisLoading ? "AI is analyzing the photo..." : diagnosis ? diagnosis.identification.description : "The AI diagnosis will appear here after a photo is taken."}
              </CardDescription>
            </div>
          </CardHeader>
          {diagnosis && diagnosis.isPlant && (
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="diagnosis">
                  <AccordionItem value="diagnosis">
                    <AccordionTrigger>Diagnosis & Recommendations</AccordionTrigger>
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
                            <h5 className="font-semibold mb-2">Potential Causes</h5>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {diagnosis.healthAssessment.potentialCauses.map((cause, i) => <li key={i}>{cause}</li>)}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-2">Recommendations</h5>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {diagnosis.healthAssessment.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                            </ul>
                          </div>
                        </>
                       )}
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="farming-guide">
                    <AccordionTrigger>Farming Guide</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                      <div>
                        <h5 className="font-semibold mb-2">Suggested Fertilizers</h5>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {diagnosis.farmingGuide.suggestedFertilizers.map((fert, i) => <li key={i}>{fert}</li>)}
                            {diagnosis.farmingGuide.suggestedFertilizers.length === 0 && <li>No specific fertilizers recommended at this time.</li>}
                        </ul>
                      </div>
                       <div>
                        <h5 className="font-semibold mb-2">General Care Guide</h5>
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
                    <AccordionTrigger>Market Value</AccordionTrigger>
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
          <CardTitle className="font-headline">3. Batch Details</CardTitle>
          <CardDescription>Fill out the form to register the new harvest.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Organic Basil" {...field} />
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
                    <FormLabel>Farm Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Verdant Valley Farms" {...field} />
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
                    <FormLabel>Farm Location</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="Click the button to get location" {...field} readOnly className="bg-muted"/>
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
                    <FormLabel>Harvest Date</FormLabel>
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
                              <span>Pick a date</span>
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
                            !threeDaysAgo || date > new Date() || date < threeDaysAgo
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
                    <FormLabel>Initial Notes & Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the harvest conditions, batch quality, or any other relevant details."
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
                      Generating Batch...
                    </>
                  ) : (
                    "Create Batch & Get QR Code"
                  )}
                </Button>
              </div>
               {isBatchCreationDisabled && diagnosis && (
                <p className="text-sm text-destructive text-center">
                    Cannot create batch. Please ensure a photo is taken and the AI diagnosis is complete and not 'Unhealthy'.
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
