import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanLine, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ProcessorDashboard() {
  return (
    <>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ScanLine className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="font-headline">Update Batch Status</CardTitle>
            <CardDescription>Scan a batch to add processing or testing info.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          As a processor, your role is to update the product journey with details about processing, lab testing, and packaging. Start by looking up a batch.
        </p>
        <Button asChild>
          <Link href="/verify?role=processor">
            Look Up a Batch <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </>
  );
}
