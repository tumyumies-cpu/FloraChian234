
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { TimelineEvent } from '@/lib/data';
import { getProcessorBatches } from '@/app/actions';

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

export async function ProcessorBatchTables() {
    const { incoming, processed } = await getProcessorBatches();
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Incoming Batches</CardTitle>
                    <CardDescription>Raw materials received from farmers, awaiting processing.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md max-h-[30rem] overflow-y-auto">
                        <Table>
                            <TableHeader className="sticky top-0 bg-card">
                                <TableRow>
                                    <TableHead>Ingredient</TableHead>
                                    <TableHead>Farm Name</TableHead>
                                    <TableHead>Harvest Date</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incoming.map(batch => (
                                    <TableRow key={batch.batchId}>
                                        <TableCell className="font-medium">{batch.productName}</TableCell>
                                        <TableCell>{batch.farmName}</TableCell>
                                        <TableCell>{batch.harvestDate}</TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/provenance/${batch.batchId}?role=processor`}>Process</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {incoming.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No incoming batches requiring processing.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Processed Batches</CardTitle>
                    <CardDescription>Batches you have processed and their current status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md max-h-[30rem] overflow-y-auto">
                        <Table>
                             <TableHeader className="sticky top-0 bg-card">
                                <TableRow>
                                    <TableHead>Batch ID</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {processed.map(batch => (
                                    <TableRow key={batch.batchId}>
                                        <TableCell className="font-mono">{batch.batchId}</TableCell>
                                        <TableCell>{batch.productName}</TableCell>
                                        <TableCell>{getStatus(batch.timeline)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/provenance/${batch.batchId}?role=processor`}>View Log</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                 {processed.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            You have not processed any batches yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
