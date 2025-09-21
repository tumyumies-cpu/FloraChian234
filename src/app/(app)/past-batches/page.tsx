import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBatchData } from "@/lib/data";
import { List } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PastBatchesPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const role = searchParams.role || 'farmer';
  const batch = mockBatchData; // In a real app, this would be a list fetched from a DB

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Past Batches</h1>
        <p className="text-muted-foreground">A list of all the harvest batches you have created.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Batch History</CardTitle>
          <CardDescription>Click on a batch to view its full provenance details.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* In a real app, you would map over a list of batches here */}
             <div className="border rounded-lg p-4 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">{batch.productName} - <span className="font-mono text-muted-foreground">{batch.batchId}</span></h3>
                    <p className="text-sm text-muted-foreground">Harvested on {batch.harvestDate}</p>
                </div>
                <Button asChild variant="outline">
                    <Link href={`/provenance/${batch.batchId}?role=${role}`}>View Details</Link>
                </Button>
            </div>
             <p className="text-sm text-muted-foreground text-center mt-4">Showing 1 of 1 batches. More would appear here as you create them.</p>
        </CardContent>
      </Card>
    </div>
  );
}
