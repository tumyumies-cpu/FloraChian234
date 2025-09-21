import { getBatches } from "@/lib/db";
import { AssembleProductForm } from "./assemble-product-form";

export default async function AssembleProductPage() {
  const batches = await getBatches();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Assemble a New Product</h1>
        <p className="text-muted-foreground">Select ingredient batches to combine into a final product.</p>
      </div>
      <AssembleProductForm batches={batches} />
    </div>
  );
}
