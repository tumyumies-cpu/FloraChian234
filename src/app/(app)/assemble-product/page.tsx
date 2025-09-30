
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AssembleProductContent } from "./assemble-product-content";

export default function AssembleProductPage() {
  return (
    <Suspense fallback={<Skeleton className="h-[40rem] w-full" />} >
      <AssembleProductContent />
    </Suspense>
  );
}
