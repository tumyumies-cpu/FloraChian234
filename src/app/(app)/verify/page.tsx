
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifyContent } from "./verify-content";

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        } >
            <VerifyContent />
        </Suspense>
    );
}
