
"use client";
import { getAllBatches } from "@/app/actions";
import { AssembleProductForm } from "./assemble-product-form";
import { Suspense, useEffect, useState } from "react";
import type { BatchData } from "@/lib/data";

function AssembleProductContent() {
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBatches() {
      const fetchedBatches = await getAllBatches();
      setBatches(fetchedBatches);
      setLoading(false);
    }
    fetchBatches();
  }, []);
  
  if (loading) {
    return <div>Loading batches...</div>;
  }
  
  return <AssembleProductForm batches={batches} />;
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
