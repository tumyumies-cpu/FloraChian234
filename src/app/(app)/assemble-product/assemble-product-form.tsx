
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AssembleProductSchema, type AssembleProductValues } from "@/lib/schemas";
import { LoaderCircle, Check, PackagePlus, Recycle, QrCode, Search } from "lucide-react";
import type { BatchData } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { assembleProduct } from "@/app/actions";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AssembleProductFormProps {
    batches: BatchData[];
}

export function AssembleProductForm({ batches }: AssembleProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [newProductId, setNewProductId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<AssembleProductValues>({
    resolver: zodResolver(AssembleProductSchema),
    defaultValues: {
      productName: "",
      batchIds: [],
    },
  });

  const availableBatches = batches.filter(batch => {
    const isProcessed = batch.timeline.find(e => e.title === 'Processing' && e.status === 'complete');
    return isProcessed;
  });

  const filteredBatches = availableBatches.filter(batch => 
    batch.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.batchId.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  };

  const handleViewProvenance = () => {
    if (newProductId) {
      const role = searchParams.get('role') || 'brand';
      router.push(`/provenance/${newProductId}?role=${role}`);
    }
  };

  const qrCodeImage = PlaceHolderImages.find(img => img.id === 'qr-code-placeholder');

  if (newProductId && qrCodeImage) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            Product Assembled & QR Code Ready
          </CardTitle>
          <CardDescription>Product ID: {newProductId}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <div className="flex justify-center p-4 border rounded-lg bg-white">
                <Image
                src={qrCodeImage.imageUrl}
                alt="Generated QR Code for new product"
                width={250}
                height={250}
                data-ai-hint={qrCodeImage.imageHint}
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
                    <Recycle className="mr-2" /> Assemble Another Product
                </Button>
            </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline">Product Details</CardTitle>
            <CardDescription>Give your new product a name and select the ingredient batches to include.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Final Product Name</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., Premium Ayurvedic Basil Tincture" {...field} />
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
                                    <p className="text-sm text-muted-foreground">Choose one or more processed batches to combine into this product.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                            placeholder="Search by product, farm, or ID..." 
                                            className="pl-9"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="rounded-md border max-h-96 overflow-y-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[50px]"></TableHead>
                                                    <TableHead>Product</TableHead>
                                                    <TableHead>Farm</TableHead>
                                                    <TableHead>Harvest Date</TableHead>
                                                    <TableHead className="text-right">Batch ID</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredBatches.map((batch) => (
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
                                                                    <TableCell className="font-medium">{batch.productName}</TableCell>
                                                                    <TableCell className="text-muted-foreground">{batch.farmName}</TableCell>
                                                                    <TableCell className="text-muted-foreground">{batch.harvestDate}</TableCell>
                                                                    <TableCell className="text-right font-mono text-xs">{batch.batchId}</TableCell>
                                                                </TableRow>
                                                            )
                                                        }}
                                                    />
                                                ))}
                                                {filteredBatches.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                            No batches found.
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
                            Assembling Product...
                            </>
                        ) : (
                           <>
                             <PackagePlus className="mr-2" />
                             Assemble Product
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

