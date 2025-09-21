import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getBatches, getAssembledProducts } from '@/lib/db';
import Link from 'next/link';
import { ShieldCheck, Search, ListOrdered, BarChart, Package, PackageCheck } from 'lucide-react';
import type { BatchData, AssembledProduct, TimelineEvent } from '@/lib/data';

function getStatus(timeline: TimelineEvent[]) {
    const completedSteps = timeline.filter(e => e.status === 'complete').length;
    if (completedSteps === timeline.length) {
        return <Badge variant="secondary">Complete</Badge>;
    }
    if (completedSteps > 1) {
        const currentStep = timeline.find(e => e.status === 'pending');
        return <Badge variant="default">{currentStep?.title || 'In Progress'}</Badge>;
    }
    return <Badge variant="outline">Created</Badge>;
}

export async function AdminDashboard() {
  const batches = await getBatches();
  const products = await getAssembledProducts();

  const totalBatches = batches.length;
  const inProgressBatches = batches.filter(b => 
    b.timeline.filter(e => e.status === 'complete').length > 1 && 
    b.timeline.filter(e => e.status === 'complete').length < b.timeline.length
  ).length;

  const totalProducts = products.length;
  const inProgressProducts = products.filter(p =>
    p.timeline.filter(e => e.status === 'complete').length > 1 &&
    p.timeline.filter(e => e.status === 'complete').length < p.timeline.length
  ).length;


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
            <div className="text-2xl font-bold">{inProgressBatches}</div>
             <p className="text-xs text-muted-foreground">moving through the supply chain</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">assembled products registered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products In-Progress</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressProducts}</div>
             <p className="text-xs text-muted-foreground">products in distribution or retail</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>All Batches</CardTitle>
                <CardDescription>Log of every ingredient batch registered.</CardDescription>
                <div className="relative pt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by Batch ID, Product, or Farm..." className="pl-9" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md max-h-[30rem] overflow-y-auto">
                  <Table>
                      <TableHeader className="sticky top-0 bg-card">
                        <TableRow>
                          <TableHead>Batch ID</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {batches.map(batch => (
                            <TableRow key={batch.batchId}>
                                <TableCell className="font-mono">{batch.batchId}</TableCell>
                                <TableCell className="font-medium">{batch.productName}</TableCell>
                                <TableCell>{getStatus(batch.timeline)}</TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/provenance/${batch.batchId}?role=admin`}>View</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </div>
                  {batches.length === 0 && (
                      <div className="text-center text-muted-foreground p-8">
                          No batches have been created yet.
                      </div>
                  )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>All Assembled Products</CardTitle>
                <CardDescription>Log of every final product registered.</CardDescription>
                <div className="relative pt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by Product ID or Name..." className="pl-9" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md max-h-[30rem] overflow-y-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-card">
                        <TableRow>
                          <TableHead>Product ID</TableHead>
                          <TableHead>Product Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map(product => (
                            <TableRow key={product.productId}>
                                <TableCell className="font-mono">{product.productId}</TableCell>
                                <TableCell className="font-medium">{product.productName}</TableCell>
                                <TableCell>{getStatus(product.timeline)}</TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/provenance/${product.productId}?role=admin`}>View</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </div>
                {products.length === 0 && (
                    <div className="text-center text-muted-foreground p-8">
                        No products have been assembled yet.
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
