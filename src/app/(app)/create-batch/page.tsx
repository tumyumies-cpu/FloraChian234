
'use client';
import { CreateBatchForm } from "./create-batch-form";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/language-context";

function CreateBatchContent() {
  const { content, language } = useLanguage();
  const c = content[language].createBatch;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">{c.step3.title}</h1>
        <p className="text-muted-foreground">{c.step3.description}</p>
      </div>
      <CreateBatchForm />
    </div>
  );
}

export default function CreateBatchPage() {
  return (
     <Suspense fallback={<Skeleton className="h-[60rem] w-full" />}>
        <CreateBatchContent />
      </Suspense>
  );
}
