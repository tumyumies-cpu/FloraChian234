import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanLine, ArrowRight, History } from 'lucide-react';
import Link from 'next/link';

export function SupplierDashboard() {
  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ScanLine className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="font-headline">Update Batch Status</CardTitle>
              <CardDescription>Scan a batch to confirm acquisition and storage.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <p className="mb-4 text-sm text-muted-foreground">
            Log the acquisition of a batch and update its journey as it moves through your facilities before being sent to a manufacturer.
          </p>
          <Button asChild>
            <Link href="/verify?role=supplier">
              Look Up a Batch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>

      <div className="space-y-4">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <History className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="font-headline">View Batch History</CardTitle>
              <CardDescription>Review and manage all available batches.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <p className="mb-4 text-sm text-muted-foreground">
            Access the complete history of all batches to update their status with your processing and dispatch information.
          </p>
          <Button asChild variant="secondary">
            <Link href="/past-batches?role=supplier">
              View History <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
