import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBatches } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PastBatchesPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const role = searchParams.role || 'farmer';
  const batches = await getBatches();

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
          <div className="space-y-4">
            {batches.length > 0 ? (
              batches.map(batch => (
                <div key={batch.batchId} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{batch.productName} - <span className="font-mono text-muted-foreground">{batch.batchId}</span></h3>
                    <p className="text-sm text-muted-foreground">Harvested on {new Date(batch.harvestDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <Button asChild variant="outline">
                    <Link href={`/provenance/${batch.batchId}?role=${role}`}>View Details</Link>
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground p-8">
                No batches have been created yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
