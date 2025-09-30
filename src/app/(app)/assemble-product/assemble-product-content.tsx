
'use client';

import { useDbContext } from "@/context/db-context";
import { AssembleProductForm } from "./assemble-product-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AssembleProductContent() {
  const { db, loading } = useDbContext();

  if (loading || !db) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-96 w-full" />
            </CardContent>
        </Card>
    )
  }

  return (
    <AssembleProductForm batches={db.batches} />
  );
}
