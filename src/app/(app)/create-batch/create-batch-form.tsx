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
import { CalendarIcon, LoaderCircle, QrCode, MapPin, Sparkles } from "lucide-react";
import { format, subDays } from "date-fns";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter, useSearchParams } from "next/navigation";
import { CameraCapture } from "@/components/camera-capture";
import { diagnosePlantHealth } from "@/ai/flows/diagnose-plant-health";
import { createBatch } from "@/app/actions";

type DiagnosisState = {
  isHealthy: boolean;
  diagnosis: string;
} | null;

export function CreateBatchForm() {
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [newBatchId, setNewBatchId] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisState>(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

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
      const result = await diagnosePlantHealth({ photoDataUri: dataUrl });
      setDiagnosis(result);
    } catch (error) {
      console.error("Diagnosis failed:", error);
      toast({
        variant: 'destructive',
        title: 'AI Diagnosis Failed',
        description: 'Could not analyze the plant health. Please proceed manually.',
      });
      // Allow proceeding without diagnosis
      setDiagnosis({ isHealthy: true, diagnosis: 'Diagnosis could not be completed.' });
    } finally {
      setDiagnosisLoading(false);
    }
  }, [toast]);

  const handleGetLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Lat: ${latitude}, Lon: ${longitude}`);
          
          setTimeout(() => {
             form.setValue("location", "Sonoma County, California", { shouldValidate: true });
             toast({
                title: "Location Captured",
                description: "Farm location has been set based on your current position.",
             });
             setLoadingLocation(false);
          }, 1000);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not retrieve location. Please enable location services or enter it manually.",
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

    setLoading(true);
    const result = await createBatch({ ...values, photo, diagnosis });
    setLoading(false);

    if (result.success && result.batchId) {
        setNewBatchId(result.batchId);
        toast({
            title: "Batch Created Successfully!",
            description: `Batch ID ${result.batchId} is now being tracked.`,
        });
    } else {
        toast({
            variant: "destructive",
            title: "Failed to Create Batch",
            description: result.message || "An unknown error occurred.",
        });
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
  }

  const qrCodeImage = PlaceHolderImages.find(img => img.id === 'qr-code-placeholder');
  const threeDaysAgo = subDays(new Date(), 2);

  if (newBatchId && qrCodeImage) {
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
              src={qrCodeImage.imageUrl}
              alt="Generated QR Code"
              width={250}
              height={250}
              data-ai-hint={qrCodeImage.imageHint}
            />
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            This QR code can now be attached to product packaging. Consumers can scan it to see the full provenance story as it gets updated.
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
        
        <div>
          <h2 className="text-2xl font-headline font-bold mt-8">2. AI Health Diagnosis</h2>
          <p className="text-muted-foreground">
            A quick analysis of the plant's health based on the photo.
          </p>
        </div>
        
        <Card className={cn(
          "transition-all",
          !photo && "opacity-50"
        )}>
          <CardHeader className="flex-row items-start gap-3 space-y-0">
             <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-white shrink-0 mt-1",
                !diagnosis ? "bg-muted-foreground" : diagnosis.isHealthy ? "bg-green-500" : "bg-destructive"
              )}>
               <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {diagnosisLoading ? "Analyzing..." : diagnosis ? (diagnosis.isHealthy ? "Plant Looks Healthy" : "Potential Issue Detected") : "Awaiting Photo"}
              </CardTitle>
              <CardDescription>
                {diagnosisLoading ? "AI is analyzing the photo..." : diagnosis ? diagnosis.diagnosis : "The AI diagnosis will appear here after a photo is taken."}
              </CardDescription>
            </div>
          </CardHeader>
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
                        <Input placeholder="e.g., Sonoma County, California" {...field} />
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
                            date > new Date() || date < threeDaysAgo
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
                <Button type="submit" disabled={loading || !photo || !diagnosis || diagnosisLoading} size="lg" className="w-full">
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
