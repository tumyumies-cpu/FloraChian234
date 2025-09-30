
'use client';
import { AssembleProductForm } from "@/components/assemble-product-form";
import { useDbContext } from "@/context/db-context";
import { Skeleton } from "@/components/ui/skeleton";

export function AssembleProductContent() {
  const { db, loading } = useDbContext();

  if (loading || !db) {
    return (
        <div className="space-y-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
    );
  }
  
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Assemble a New Product</h1>
            <p className="text-muted-foreground">Select ingredient batches to combine into a final product.</p>
        </div>
        <AssembleProductForm batches={db.batches} />
    </div>
  );
}
