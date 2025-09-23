
"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AssembleProductSchema, type AssembleProductValues } from "@/lib/schemas";
import { LoaderCircle, PackagePlus, Recycle, QrCode } from "lucide-react";
import type { BatchData } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { assembleProduct } from "@/app/actions";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdvancedFilterControls, type FilterState, type SortState } from "./advanced-filter-controls";
import QRCode from 'qrcode';
import { useAuth } from "@/context/auth-context";

interface AssembleProductFormProps {
    batches: BatchData[];
}

export function AssembleProductForm({ batches }: AssembleProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [newProductId, setNewProductId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({ productName: "", farmName: "", batchId: "" });
  const [sort, setSort] = useState<SortState>({ key: 'harvestDate', order: 'desc' });
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authInfo } = useAuth();
  
  const brandName = useMemo(() => {
    if (!authInfo?.email) return 'DefaultBrand';
    const emailPrefix = authInfo.email.split('@')[0];
    return emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
  }, [authInfo]);

  const form = useForm<AssembleProductValues>({
    resolver: zodResolver(AssembleProductSchema),
    defaultValues: {
      productName: "",
      batchIds: [],
      brandName: brandName,
    },
  });
  
  useEffect(() => {
    form.setValue('brandName', brandName);
  }, [brandName, form]);

  useEffect(() => {
    if (newProductId) {
      const url = `${window.location.origin}/provenance/${newProductId}`;
      QRCode.toDataURL(url, { width: 250, margin: 2 }, (err, dataUrl) => {
        if (err) {
          console.error("Failed to generate QR code:", err);
          return;
        }
        setQrCodeDataUrl(dataUrl);
      });
    }
  }, [newProductId]);

  const availableBatches = useMemo(() => batches.filter(batch => {
    const isReady = batch.timeline.find(e => e.id === 6 && e.status === 'complete');
    return isReady;
  }), [batches]);

  const filteredAndSortedBatches = useMemo(() => {
    let filtered = availableBatches.filter(batch =>
      batch.productName.toLowerCase().includes(filters.productName.toLowerCase()) &&
      batch.farmName.toLowerCase().includes(filters.farmName.toLowerCase()) &&
      batch.batchId.toLowerCase().includes(filters.batchId.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sort.key];
      const bValue = b[sort.key];

      if (aValue < bValue) return sort.order === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.order === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [availableBatches, filters, sort]);

  async function onSubmit(values: AssembleProductValues) {
    setLoading(true);
    const result = await assembleProduct(values);
    setLoading(false);

    if (result.success && result.productId) {
        setNewProductId(result.productId);
        toast({
            title: "Product Assembled Successfully!",
            description: `New product SKU ${result.productId} has been created.`,
        });
    } else {
        toast({
            variant: "destructive",
            title: "Failed to Assemble Product",
            description: result.message || "An unknown error occurred.",
        });
    }
  }

  const handleResetForm = () => {
    form.reset();
    setNewProductId(null);
    setQrCodeDataUrl(null);
  };

  const handleViewProvenance = () => {
    if (newProductId) {
      const role = searchParams.get('role') || 'brand';
      router.push(`/provenance/${newProductId}?role=${role}`);
    }
  };

  if (newProductId && qrCodeDataUrl) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            Product Formulated & QR Code Ready
          </CardTitle>
          <CardDescription>Product ID: {newProductId}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <div className="flex justify-center p-4 border rounded-lg bg-white">
                <Image
                src={qrCodeDataUrl}
                alt={`QR Code for product ${newProductId}`}
                width={250}
                height={250}
                data-ai-hint="qr code"
                />
            </div>
            <p className="text-muted-foreground text-sm mt-4">
                The new product, "{form.getValues('productName')}", has been created. Its QR code can now be used on packaging for consumer scanning.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                 <Button size="lg" onClick={handleViewProvenance}>
                    View Product Journey
                </Button>
                <Button variant="outline" size="lg" onClick={handleResetForm}>
                    <Recycle className="mr-2" /> Formulate Another Product
                </Button>
            </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline">Product Formulation Details</CardTitle>
            <CardDescription>Give your new product a name and select the ingredient batches to include.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="brandName"
                        render={({ field }) => (
                            <FormItem className="hidden">
                                <FormLabel>Brand Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Final Product Name</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., Premium Ayurvedic Resilience Blend" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="batchIds"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel>Select Ingredient Batches</FormLabel>
                                    <p className="text-sm text-muted-foreground">Choose one or more batches that have been acquired by a supplier to combine into this product.</p>
                                </div>
                                <div className="space-y-4">
                                    <AdvancedFilterControls
                                      onFilterChange={setFilters}
                                      onSortChange={setSort}
                                      initialFilters={filters}
                                      initialSort={sort}
                                    />
                                    <div className="rounded-md border max-h-[30rem] overflow-y-auto">
                                        <Table>
                                            <TableHeader className="sticky top-0 bg-card">
                                                <TableRow>
                                                    <TableHead className="w-[50px]"></TableHead>
                                                    <TableHead>Ingredient / Farm</TableHead>
                                                    <TableHead>Harvest Date</TableHead>
                                                    <TableHead className="text-right">Batch ID</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredAndSortedBatches.map((batch) => (
                                                    <FormField
                                                        key={batch.batchId}
                                                        control={form.control}
                                                        name="batchIds"
                                                        render={({ field }) => {
                                                            const isChecked = field.value?.includes(batch.batchId);
                                                            return (
                                                                <TableRow key={batch.batchId} data-state={isChecked && "selected"}>
                                                                    <TableCell className="p-2">
                                                                         <FormControl>
                                                                            <Checkbox
                                                                                checked={isChecked}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                    ? field.onChange([...(field.value || []), batch.batchId])
                                                                                    : field.onChange(
                                                                                        field.value?.filter(
                                                                                            (value) => value !== batch.batchId
                                                                                        )
                                                                                    )
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        <div>{batch.productName}</div>
                                                                        <div className="text-xs text-muted-foreground">{batch.farmName}</div>
                                                                    </TableCell>
                                                                    <TableCell className="text-muted-foreground">{batch.harvestDate}</TableCell>
                                                                    <TableCell className="text-right font-mono text-xs">{batch.batchId}</TableCell>
                                                                </TableRow>
                                                            )
                                                        }}
                                                    />
                                                ))}
                                                {filteredAndSortedBatches.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                            No ingredient batches ready for formulation. Batches must be acquired by a supplier first.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading} size="lg">
                        {loading ? (
                            <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Formulating Product...
                            </>
                        ) : (
                           <>
                             <PackagePlus className="mr-2" />
                             Formulate Product
                           </>
                        )}
                        </Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
