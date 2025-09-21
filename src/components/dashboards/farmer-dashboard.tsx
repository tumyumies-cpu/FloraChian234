import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FarmerDashboard() {
  return (
    <>
      <CardHeader>
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
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          As a farmer, you can begin tracking a new batch by entering its initial details like farm, location, and harvest date. A unique QR code will be generated to follow its journey.
        </p>
        <Button asChild>
          <Link href="/create-batch?role=farmer">
            Start Tracking <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </>
  );
}
