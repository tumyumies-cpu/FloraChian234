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
import { LoaderCircle, Check, PackagePlus, Recycle } from "lucide-react";
import type { BatchData } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { assembleProduct } from "@/app/actions";

interface AssembleProductFormProps {
    batches: BatchData[];
}

export function AssembleProductForm({ batches }: AssembleProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [newProductId, setNewProductId] = useState<string | null>(null);
  const { toast } = useToast();

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
  }

  if (newProductId) {
    return (
       <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Check className="h-6 w-6 text-green-500" />
            Product Assembled!
          </CardTitle>
          <CardDescription>Product ID: {newProductId}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-muted-foreground text-sm mt-4">
                The new product, "{form.getValues('productName')}", has been created by combining the selected batches. You can now proceed to create packaging and generate QR codes for this product.
            </p>
            <div className="mt-6 flex justify-center">
                <Button variant="outline" size="lg" onClick={handleResetForm}>
                    <Recycle className="mr-2" /> Assemble Another Product
                </Button>
            </div>
        </CardContent>
      </Card>
    )
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
                                    <p className="text-sm text-muted-foreground">Choose one or more batches to combine into this product.</p>
                                </div>
                                <div className="space-y-3 rounded-md border p-4 max-h-96 overflow-y-auto">
                                {batches.map((batch) => (
                                    <FormField
                                        key={batch.batchId}
                                        control={form.control}
                                        name="batchIds"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={batch.batchId}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(batch.batchId)}
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
                                                        <p className="text-xs text-muted-foreground">Harvested: {batch.harvestDate}</p>
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
