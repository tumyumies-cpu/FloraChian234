import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ArrowRight, History } from 'lucide-react';
import Link from 'next/link';

export function FarmerDashboard() {
  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <PlusCircle className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="font-headline">Create New Batch</CardTitle>
              <CardDescription>Start a new provenance record for a harvest.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <p className="mb-4 text-sm text-muted-foreground">
            Begin tracking a new batch by entering its initial details like farm, location, and harvest date. A unique QR code will be generated to follow its journey.
          </p>
          <Button asChild>
            <Link href="/create-batch?role=farmer">
              Start Tracking <ArrowRight className="ml-2 h-4 w-4" />
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
              <CardTitle className="font-headline">View Past Batches</CardTitle>
              <CardDescription>Review and manage your previous harvests.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <p className="mb-4 text-sm text-muted-foreground">
            Access the complete history of all the batches you've created, view their current status, and see their full provenance journey.
          </p>
          <Button asChild variant="secondary">
            <Link href="/past-batches?role=farmer">
              View History <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
