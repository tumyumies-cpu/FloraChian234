"use client";
import { VerifyForm } from "./verify-form";
import { Suspense } from "react";
import { useSearchParams } from 'next/navigation';

function VerifyContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'consumer';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Verify Product Provenance</h1>
        <p className="text-muted-foreground">
          Enter an ID below to look up a product's history.
        </p>
      </div>
      <VerifyForm role={role} />
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
