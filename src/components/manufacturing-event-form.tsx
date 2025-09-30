
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ManufacturingEventSchema, type ManufacturingEventValues } from "@/lib/schemas";
import { LoaderCircle, Upload } from "lucide-react";
import { useEffect } from "react";

interface ManufacturingEventFormProps {
  onSubmit: (data: ManufacturingEventValues) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  initialData?: ManufacturingEventValues;
}

export function ManufacturingEventForm({ onSubmit, onCancel, loading, initialData }: ManufacturingEventFormProps) {
  const form = useForm<ManufacturingEventValues>({
    resolver: zodResolver(ManufacturingEventSchema),
    defaultValues: initialData || {
      recipeId: "AYUR-R-01",
      extractionMethod: "Aqueous decoction",
      equipmentUsed: "Stainless steel vats, GMP-certified",
      packagingDetails: "Packaged in eco-friendly, recyclable amber glass bottles.",
      qualityControl: {
        ipssTests: "Passed - All parameters within spec",
        heavyMetals: "Passed - Pb, As, Hg, Cd below detectable limits",
        microbialSafety: "Passed - E. coli, Salmonella not detected",
      },
      finalBatchId: "", // Set dynamically in useEffect
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0],
      gmpCompliance: "All processes compliant with Good Manufacturing Practices.",
    },
  });
  
  useEffect(() => {
    // This logic must run on the client to avoid hydration errors
    if (typeof window !== 'undefined') {
        if (!initialData && !form.getValues('finalBatchId')) {
            form.setValue('finalBatchId', `FP-${Math.floor(10000 + Math.random() * 90000)}`);
        }
    }
  }, [form, initialData]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 bg-background border-t">
        <Accordion type="multiple" defaultValue={['formulation', 'qc', 'batch']} className="w-full">
          
          <AccordionItem value="formulation">
            <AccordionTrigger>1. Formulation & Processing</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="recipeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipe ID / Formula Reference</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                    control={form.control}
                    name="extractionMethod"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Extraction Method</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="equipmentUsed"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Processing Equipment Used</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="qc">
            <AccordionTrigger>2. Quality Control & Lab Tests</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="qualityControl.ipssTests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identity, Purity, Strength, Safety (IPSS) Tests</FormLabel>
                    <FormControl><Textarea rows={2} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="qualityControl.heavyMetals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heavy Metal Test Results</FormLabel>
                    <FormControl><Textarea rows={2} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qualityControl.microbialSafety"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Microbiological Safety Results</FormLabel>
                    <FormControl><Textarea rows={2} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="batch">
            <AccordionTrigger>3. Packaging & Final Batch Data</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
                 <FormField
                    control={form.control}
                    name="packagingDetails"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Packaging Details</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                         <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="finalBatchId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Finished Product Batch ID</FormLabel>
                        <FormControl><Input {...field} readOnly className="bg-muted" /></FormControl>
                         <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gmpCompliance"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>GMP Compliance Notes</FormLabel>
                        <FormControl><Textarea rows={2} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </AccordionContent>
          </AccordionItem>

        </Accordion>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            Submit Manufacturing Data
          </Button>
        </div>
      </form>
    </Form>
  );
}
