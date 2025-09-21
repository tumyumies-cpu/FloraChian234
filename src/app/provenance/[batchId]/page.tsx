import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { getBatchData } from '@/lib/data';
import { StoryGenerator } from '@/components/story-generator';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Leaf } from 'lucide-react';
import { InteractiveTimeline } from '@/components/interactive-timeline';

export default function ProvenancePage({ 
  params,
  searchParams,
}: { 
  params: { batchId: string };
  searchParams: { role?: string };
}) {
  const batchData = getBatchData(params.batchId);
  const role = searchParams.role || 'consumer';

  if (!batchData) {
    notFound();
  }

  const storyGeneratorProps = {
    batchId: batchData.batchId,
    farmName: batchData.farmName,
    location: batchData.location,
    harvestDate: batchData.harvestDate,
    processingDetails: batchData.processingDetails,
  };

  return (
    <div className="min-h-screen bg-background">
       <header className="flex items-center justify-between p-4 border-b">
         <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Leaf className="h-6 w-6" />
            <span className="font-headline text-lg font-semibold">FloraChain</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href={{ pathname: '/', query: { role } }}><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
          </Button>
       </header>

      <main className="container mx-auto max-w-5xl py-8 sm:py-12">
        <div className="space-y-12">
          {/* Header Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4">
              <p className="font-semibold text-primary">PROVENANCE REPORT</p>
              <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight">{batchData.productName}</h1>
              <p className="text-lg text-muted-foreground">Batch ID: <span className="font-mono text-foreground">{batchData.batchId}</span></p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                <div className="text-sm"><span className="font-semibold">Farm:</span> {batchData.farmName}</div>
                <div className="text-sm"><span className="font-semibold">Location:</span> {batchData.location}</div>
                <div className="text-sm"><span className="font-semibold">Harvested:</span> {batchData.harvestDate}</div>
              </div>
            </div>
            <Card className="overflow-hidden">
                <Image
                  src={batchData.imageUrl}
                  alt={`Image of ${batchData.productName}`}
                  width={1200}
                  height={800}
                  className="object-cover w-full h-full"
                  data-ai-hint={batchData.imageHint}
                />
            </Card>
          </section>

          <Separator />
          
          {/* AI Story Section */}
          <section>
            <StoryGenerator {...storyGeneratorProps} />
          </section>

          {/* Timeline Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-headline font-bold text-center">Product Journey</h2>
            <InteractiveTimeline initialEvents={batchData.timeline} role={role} />
          </section>

        </div>
      </main>
    </div>
  );
}
