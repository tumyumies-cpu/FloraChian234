
"use client";

import { getBatchForSummary } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { BatchData } from '@/lib/data';
import { useEffect, useState } from 'react';

interface ComponentBatchSummaryProps {
  batchIds: string[];
  productId: string;
  role: string;
}

export function ComponentBatchSummary({ batchIds, productId, role }: ComponentBatchSummaryProps) {
  const [batchDetails, setBatchDetails] = useState<(BatchData | null)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBatches() {
      setLoading(true);
      const promises = batchIds.map(id => getBatchForSummary(id));
      try {
        const results = await Promise.all(promises);
        setBatchDetails(results);
      } catch (error) {
        console.error("Failed to fetch batch summaries:", error);
        setBatchDetails([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBatches();
  }, [batchIds]);


  if (loading) {
      return <p>Loading ingredient details...</p>;
  }

  const validBatches = batchDetails.filter(b => b !== null) as BatchData[];

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
                <TableHead className="text-right">Details</TableHead>
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
                    <TableCell className="text-right">
                       <Button asChild variant="outline" size="sm">
                          <Link href={`/provenance/${batch.batchId}?role=${role}&fromProduct=${productId}`}>View Full Log</Link>
                       </Button>
                    </TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
