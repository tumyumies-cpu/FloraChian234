
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { BatchData } from '@/lib/data';
import { useEffect, useState } from 'react';
import { useDbContext } from '@/context/db-context';
import { useToast } from '@/hooks/use-toast';

interface ComponentBatchSummaryProps {
  batchIds: string[];
  productId: string;
  role: string;
}

export function ComponentBatchSummary({ batchIds, productId, role }: ComponentBatchSummaryProps) {
  const { getBatchById, removeBatchFromProduct } = useDbContext();
  const [batchDetails, setBatchDetails] = useState<(BatchData | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const details = batchIds.map(id => getBatchById(id));
    setBatchDetails(details);
    setLoading(false);
  }, [batchIds, getBatchById]);
  
  const handleRemoveBatch = (batchId: string) => {
    try {
        removeBatchFromProduct(productId, batchId);
        setBatchDetails(prev => prev.filter(b => b?.batchId !== batchId));
        toast({
            title: "Batch Removed",
            description: `Batch ${batchId} has been removed from the product.`
        })
    } catch (error) {
        console.error("Failed to remove batch:", error);
        toast({
            variant: "destructive",
            title: "Failed to Remove Batch",
            description: "An unknown error occurred."
        })
    }
  }

  if (loading) {
      return <p>Loading ingredient details...</p>;
  }

  const validBatches = batchDetails.filter(b => b !== null) as BatchData[];
  const isBrandRole = role === 'brand';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Package className="h-6 w-6" />
            </div>
            <div>
                <CardTitle className="font-headline">Ingredient Batch Summary</CardTitle>
                <CardDescription>
                This product was formulated using the following {validBatches.length} ingredient batches.
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Batch ID</TableHead>
                <TableHead>Farm</TableHead>
                <TableHead>Harvest Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validBatches.map(batch => (
                batch && (
                  <TableRow key={batch.batchId}>
                    <TableCell className="font-medium">{batch.productName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">{batch.batchId}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{batch.farmName}</TableCell>
                    <TableCell className="text-muted-foreground">{batch.harvestDate}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <Button asChild variant="outline" size="sm">
                          <Link href={`/provenance/${batch.batchId}?role=${role}&fromProduct=${productId}`}>View Log</Link>
                       </Button>
                       {isBrandRole && (
                        <Button variant="destructive" size="icon" onClick={() => handleRemoveBatch(batch.batchId)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove Batch</span>
                        </Button>
                       )}
                    </TableCell>
                  </TableRow>
                )
              ))}
               {validBatches.length === 0 && (
                 <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No ingredient batches are currently in this product.
                    </TableCell>
                 </TableRow>
               )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
