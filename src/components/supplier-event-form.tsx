
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
import { SupplierEventSchema, type SupplierEventValues } from "@/lib/schemas";
import { LoaderCircle, Upload } from "lucide-react";
import { useEffect } from "react";

interface SupplierEventFormProps {
  onSubmit: (data: SupplierEventValues) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  initialData?: SupplierEventValues;
}

export function SupplierEventForm({ onSubmit, onCancel, loading, initialData }: SupplierEventFormProps) {
  const form = useForm<SupplierEventValues>({
    resolver: zodResolver(SupplierEventSchema),
    defaultValues: initialData || {
      supplierId: "TR-SF-007",
      location: "Oakland, CA Distribution Center",
      quantity: "500 kg",
      lotNumber: "", // Set dynamically in useEffect
      inspectionReport: "Passed visual and sensory evaluation. COA pending.",
      certifications: "USDA Organic, Non-GMO Project Verified",
    },
  });

  useEffect(() => {
    // This logic must run on the client to avoid hydration errors
    if (typeof window !== 'undefined') {
        if (!initialData && !form.getValues('lotNumber')) {
            form.setValue('lotNumber', `LOT-${Math.floor(1000 + Math.random() * 9000)}`);
        }
    }
  }, [form, initialData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 bg-background border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Supplier/Trader ID</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Weight/Quantity Received</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="lotNumber"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Internal Lot Number</FormLabel>
                    <FormControl><Input {...field} readOnly className="bg-muted" /></FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <FormField
            control={form.control}
            name="inspectionReport"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Pre-Shipment Inspection Report</FormLabel>
                <FormControl><Textarea rows={2} {...field} /></FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="certifications"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Certifications</FormLabel>
                <FormControl><Input placeholder="e.g., USDA Organic, FSSAI" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

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
