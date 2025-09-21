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
import { LoaderCircle, Check, PackagePlus, Recycle, QrCode } from "lucide-react";
import type { BatchData } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { assembleProduct } from "@/app/actions";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

interface AssembleProductFormProps {
    batches: BatchData[];
}

export function AssembleProductForm({ batches }: AssembleProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [newProductId, setNewProductId] = useState<string | null>(null);
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
                                <div className="space-y-3 rounded-md border p-4 max-h-96 overflow-y-auto">
                                {batches.map((batch) => (
                                    <FormField
                                        key={batch.batchId}
                                        control={form.control}
                                        name="batchIds"
                                        render={({ field }) => {
                                            const isChecked = field.value?.includes(batch.batchId);
                                            // A batch is selectable if it's been processed
                                            const isProcessed = batch.timeline.find(e => e.title === 'Processing' && e.status === 'complete');
                                            const isSelectable = isProcessed || isChecked;
                                            
                                            return (
                                                <FormItem
                                                    key={batch.batchId}
                                                    className={cn("flex flex-row items-start space-x-3 space-y-0", !isSelectable && "opacity-50 cursor-not-allowed")}
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={isChecked}
                                                            disabled={!isSelectable}
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
                                                    <FormLabel className="font-normal w-full">
                                                        <div className="flex justify-between">
                                                            <span>{batch.productName} from {batch.farmName}</span>
                                                            <span className="text-muted-foreground font-mono text-xs">{batch.batchId}</span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Harvested: {batch.harvestDate} - 
                                                            <span className={cn("font-semibold", isProcessed ? "text-green-600" : "text-amber-600")}>
                                                                {isProcessed ? " Processed" : " Awaiting Processing"}
                                                            </span>
                                                        </p>
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
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
