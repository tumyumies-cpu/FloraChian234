import { VerifyForm } from "./verify-form";
import { Suspense } from "react";

export default function VerifyPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const role = searchParams.role || 'consumer';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Verify Product Provenance</h1>
        <p className="text-muted-foreground">
          Enter an ID below to look up a product's history.
        </p>
      </div>
      <Suspense fallback={<div>Loading form...</div>}>
        <VerifyForm role={role} />
      </Suspense>
    </div>
  );
}
