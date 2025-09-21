
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProcessingEventSchema, type ProcessingEventValues } from "@/lib/schemas";
import { LoaderCircle, Upload } from "lucide-react";

interface ProcessingEventFormProps {
  onSubmit: (data: ProcessingEventValues) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export function ProcessingEventForm({ onSubmit, onCancel, loading }: ProcessingEventFormProps) {
  const form = useForm<ProcessingEventValues>({
    resolver: zodResolver(ProcessingEventSchema),
    defaultValues: {
      collectionCenterId: "CC-SF-101",
      cleaningMethod: "Manual dry cleaning",
      dryingMethod: "Sun-dried",
      dryingTemp: 25,
      dryingDuration: "72 hours",
      finalMoisture: 8.5,
      particleSize: "Coarse",
      visualInspection: "Good color, strong aroma, consistent texture.",
      storageCondition: "Cool, dry, dark warehouse",
      storageDuration: "14 days",
      dispatchDate: new Date().toISOString().split("T")[0],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 bg-background border-t">
        <Accordion type="multiple" defaultValue={['procurement', 'processing']} className="w-full">
          
          {/* Procurement Data */}
          <AccordionItem value="procurement">
            <AccordionTrigger>1. Procurement Data</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="collectionCenterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Center ID</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Processing Data */}
          <AccordionItem value="processing">
            <AccordionTrigger>2. Processing Data</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="cleaningMethod"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cleaning Method</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="dryingMethod"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Drying Method</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                             <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <FormField
                        control={form.control}
                        name="dryingTemp"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Drying Temp (°C)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                             <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dryingDuration"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Drying Duration</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                             <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="finalMoisture"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Final Moisture (%)</FormLabel>
                            <FormControl><Input type="number" step="0.1" {...field} /></FormControl>
                             <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="particleSize"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Grinding/Cutting Particle Size</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                         <FormMessage />
                    </FormItem>
                    )}
                />
            </AccordionContent>
          </AccordionItem>

          {/* Quality & Safety */}
          <AccordionItem value="quality">
            <AccordionTrigger>3. Quality & Safety Data</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="visualInspection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visual Inspection Notes</FormLabel>
                    <FormControl><Textarea rows={3} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Storage & Dispatch */}
          <AccordionItem value="storage">
            <AccordionTrigger>4. Storage & Dispatch</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
                 <FormField
                    control={form.control}
                    name="storageCondition"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Storage Conditions</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                         <FormMessage />
                    </FormItem>
                    )}
                />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="storageDuration"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Storage Duration</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                             <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="dispatchDate"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dispatch Date</FormLabel>
                            <FormControl><Input type="date" {...field} /></FormControl>
                             <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            Submit Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
