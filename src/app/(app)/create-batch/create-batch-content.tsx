
'use client';

import { useLanguage } from "@/context/language-context";
import { CreateBatchForm } from "./create-batch-form";

export function CreateBatchContent() {
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
