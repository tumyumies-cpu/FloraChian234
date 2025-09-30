
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateBatchContent } from "./create-batch-content";

export default function CreateBatchPage() {
  return (
     <Suspense fallback={<Skeleton className="h-[60rem] w-full" />} >
        <CreateBatchContent />
      </Suspense>
  );
}
