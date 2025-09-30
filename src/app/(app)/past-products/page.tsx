
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PastProductsContent } from "./past-products-content";

export default function PastProductsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />} >
      <PastProductsContent />
    </Suspense>
  );
}
