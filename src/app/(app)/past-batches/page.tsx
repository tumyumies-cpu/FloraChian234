
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PastBatchesContent } from "./past-batches-content";

export default function PastBatchesPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />} >
      <PastBatchesContent />
    </Suspense>
  );
}
