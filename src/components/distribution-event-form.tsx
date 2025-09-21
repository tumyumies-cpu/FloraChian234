
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
import { DistributionEventSchema, type DistributionEventValues } from "@/lib/schemas";
import { LoaderCircle, Upload } from "lucide-react";
import { useEffect } from "react";

interface DistributionEventFormProps {
  onSubmit: (data: DistributionEventValues) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  initialData?: DistributionEventValues;
}

export function DistributionEventForm({ onSubmit, onCancel, loading, initialData }: DistributionEventFormProps) {
  const form = useForm<DistributionEventValues>({
    resolver: zodResolver(DistributionEventSchema),
    defaultValues: initialData || {
      warehouseId: "WH-OAK-02",
      stockEntryDate: new Date().toISOString().split('T')[0],
      coldChain: "Maintained at 2-8°C during transit.",
      transportMode: "Refrigerated truck",
      distributorId: "DIST-US-WEST-04",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 bg-background border-t">
        <Accordion type="multiple" defaultValue={['warehouse', 'transport']} className="w-full">
          
          <AccordionItem value="warehouse">
            <AccordionTrigger>1. Warehouse & Stock</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="warehouseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse ID & Location</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="stockEntryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Entry Date</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="transport">
            <AccordionTrigger>2. Transportation</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
                <FormField
                    control={form.control}
                    name="transportMode"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Transportation Mode</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="coldChain"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cold Chain Requirements (if applicable)</FormLabel>
                        <FormControl><Textarea rows={2} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="distributor">
            <AccordionTrigger>3. Distributor</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
                <FormField
                    control={form.control}
                    name="distributorId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Distributor ID & Territory</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
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
            Submit Distribution Data
          </Button>
        </div>
      </form>
    </Form>
  );
}
