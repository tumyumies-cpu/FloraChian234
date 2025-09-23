
import { CreateBatchForm } from "./create-batch-form";
import { Suspense } from "react";

export default function CreateBatchPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Create a New Batch</h1>
        <p className="text-muted-foreground">Capture a photo and enter the details below to start tracking a new harvest.</p>
      </div>
      <Suspense fallback={<div>Loading form...</div>}>
        <CreateBatchForm />
      </Suspense>
    </div>
  );
}
