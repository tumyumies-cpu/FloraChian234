import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getBatches } from '@/lib/db';
import Link from 'next/link';
import { ShieldCheck, Search, FileText, BarChart, ListOrdered } from 'lucide-react';
import type { BatchData } from '@/lib/data';

function getStatus(batch: BatchData) {
    const completedSteps = batch.timeline.filter(e => e.status === 'complete').length;
    if (completedSteps === batch.timeline.length) {
        return <Badge variant="secondary">Complete</Badge>;
    }
    if (completedSteps > 1) {
        const currentStep = batch.timeline.find(e => e.status === 'pending');
        return <Badge variant="default">{currentStep?.title || 'In Progress'}</Badge>;
    }
    return <Badge variant="outline">Created</Badge>;
}

export async function AdminDashboard() {
  const batches = await getBatches();
  const totalBatches = batches.length;
  const inProgress = batches.filter(b => b.timeline.filter(e => e.status === 'complete').length > 1 && b.timeline.filter(e => e.status === 'complete').length < b.timeline.length).length;


  return (
    <div className="p-6 space-y-6">
      <CardHeader className="p-0">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="font-headline">Global Monitoring</CardTitle>
            <CardDescription>Oversee all activity on the FloraChain platform.</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBatches}</div>
            <p className="text-xs text-muted-foreground">batches currently being tracked</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Batches In-Progress</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgress}</div>
             <p className="text-xs text-muted-foreground">actively moving through the supply chain</p>
          </CardContent>
        </Card>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>All Batches</CardTitle>
              <CardDescription>A complete log of every batch registered on the platform.</CardDescription>
              <div className="relative pt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by Batch ID, Product, or Farm..." className="pl-9" />
              </div>
          </CardHeader>
          <CardContent>
               <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Farm</TableHead>
                      <TableHead>Harvest Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batches.map(batch => (
                        <TableRow key={batch.batchId}>
                            <TableCell className="font-mono">{batch.batchId}</TableCell>
                            <TableCell className="font-medium">{batch.productName}</TableCell>
                            <TableCell>{batch.farmName}</TableCell>
                            <TableCell>{batch.harvestDate}</TableCell>
                            <TableCell>{getStatus(batch)}</TableCell>
                            <TableCell className="text-right">
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/provenance/${batch.batchId}?role=admin`}>View Details</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {batches.length === 0 && (
                    <div className="text-center text-muted-foreground p-8">
                        No batches have been created yet.
                    </div>
                )}
          </CardContent>
      </Card>
    </div>
  );
}
