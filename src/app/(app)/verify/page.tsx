import { VerifyForm } from "./verify-form";

export default function VerifyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Verify Product Provenance</h1>
        <p className="text-muted-foreground">
          Enter a batch ID below to look up a product's history.
        </p>
      </div>
      <VerifyForm />
    </div>
  );
}
