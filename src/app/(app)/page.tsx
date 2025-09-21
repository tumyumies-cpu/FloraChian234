import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ScanLine, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Welcome to FloraChain</h1>
        <p className="text-muted-foreground">Your dashboard for transparent product provenance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
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
              Begin tracking a new batch by entering its initial details like farm, location, and harvest date. A unique QR code will be generated to follow its journey.
            </p>
            <Button asChild>
              <Link href="/create-batch">
                Start Tracking <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ScanLine className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="font-headline">Verify Batch</CardTitle>
                <CardDescription>Scan or enter an ID to view provenance.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Check the authenticity and trace the full journey of a product by scanning its QR code or manually entering its unique batch ID.
            </p>
            <Button asChild>
              <Link href="/verify">
                Verify Product <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
