
"use client";
import { AssembleProductForm } from "./assemble-product-form";
import { Suspense, useEffect, useState } from "react";
import type { BatchData } from "@/lib/data";
import { useDbContext } from "@/context/db-context";

function AssembleProductContent() {
  const { db, loading } = useDbContext();
  
  if (loading || !db) {
    return <div>Loading batches...</div>;
  }
  
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
