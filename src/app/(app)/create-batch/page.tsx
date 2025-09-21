import { CreateBatchForm } from "./create-batch-form";

export default function CreateBatchPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Create a New Batch</h1>
        <p className="text-muted-foreground">Enter the details below to start tracking a new harvest batch.</p>
      </div>
      <CreateBatchForm />
    </div>
  );
}
