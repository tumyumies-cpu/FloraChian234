"use client";
import { AssembleProductForm } from "./assemble-product-form";
import { Suspense } from "react";
import { useDbContext } from "@/context/db-context";
import { Skeleton } from "@/components/ui/skeleton";

function AssembleProductContent() {
  const { db, loading } = useDbContext();

  if (loading || !db) {
    return (
        <div className="space-y-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
    );
  }
  
  // The form now gets the initial batches directly.
  return <AssembleProductForm batches={db.batches} />;
}


export default function AssembleProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Assemble a New Product</h1>
        <p className="text-muted-foreground">Select ingredient batches to combine into a final product.</p>
      </div>
      <Suspense fallback={<div>Loading form...</div>}>
        <AssembleProductContent />
      </Suspense>
    </div>
  );
}
