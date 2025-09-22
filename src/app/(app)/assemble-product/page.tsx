import { getBatches } from "@/lib/db";
import { AssembleProductForm } from "./assemble-product-form";
import { Suspense } from "react";

export default async function AssembleProductPage() {
  const batches = await getBatches();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Assemble a New Product</h1>
        <p className="text-muted-foreground">Select ingredient batches to combine into a final product.</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <AssembleProductForm batches={batches} />
      </Suspense>
    </div>
  );
}
