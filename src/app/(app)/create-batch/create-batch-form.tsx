"use client";

import { useState } from "react";
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
import { CalendarIcon, Download, LoaderCircle, QrCode } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { mockBatchData } from "@/lib/data";

export function CreateBatchForm() {
  const [loading, setLoading] = useState(false);
  const [newBatchId, setNewBatchId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<CreateBatchValues>({
    resolver: zodResolver(CreateBatchSchema),
    defaultValues: {
      productName: "",
      farmName: "",
      location: "",
      harvestDate: undefined,
      processingDetails: "",
    },
  });

  async function onSubmit(values: CreateBatchValues) {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("New Batch Created:", values);
    
    setNewBatchId(mockBatchData.batchId);
    setLoading(false);
    toast({
      title: "Batch Created Successfully!",
      description: `Batch ID ${mockBatchData.batchId} is now being tracked.`,
    });
  }

  const qrCodeImage = PlaceHolderImages.find(img => img.id === 'qr-code-placeholder');

  if (newBatchId && qrCodeImage) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            Your QR Code is Ready
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
            Download this QR code and attach it to your product packaging. Consumers can scan it to see the full provenance story.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
            <Button variant="outline" size="lg" onClick={() => { form.reset(); setNewBatchId(null); }}>
              Create Another Batch
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle className="font-headline">Batch Details</CardTitle>
        <CardDescription>Fill out the form to register a new harvest.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <FormControl>
                      <Input placeholder="e.g., Sonoma County, California" {...field} />
                    </FormControl>
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
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="processingDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processing & Handling Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the steps taken after harvest (e.g., washing, drying, packaging)."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} size="lg">
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
  );
}
