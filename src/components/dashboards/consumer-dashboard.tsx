import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanLine, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ConsumerDashboard() {
  return (
    <div className="p-6">
      <CardHeader className="p-0">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ScanLine className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="font-headline">Verify Product</CardTitle>
            <CardDescription>Scan a QR code or enter an ID to view its story.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <p className="mb-4 text-sm text-muted-foreground">
          Check the authenticity and trace the full journey of a product by scanning its QR code or manually entering its unique batch ID.
        </p>
        <Button asChild>
          <Link href="/verify?role=consumer">
            Verify a Product <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </div>
  );
}
