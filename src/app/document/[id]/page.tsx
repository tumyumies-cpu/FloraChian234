
"use client";

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, notFound } from 'next/navigation';
import Image from 'next/image';
import QRCode from 'qrcode';
import type { BatchData, AssembledProduct, TimelineEvent } from '@/lib/data';
import { iconMap } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Leaf, Printer } from 'lucide-react';
import { useDbContext, DbProvider } from '@/context/db-context';

function PrintableReport() {
    const params = useParams();
    const searchParams = useSearchParams();
    const { getBatchById, getProductById } = useDbContext();
    
    const id = params.id as string;
    const stageId = searchParams.get('stage');

    const [data, setData] = useState<BatchData | AssembledProduct | null>(null);
    const [stage, setStage] = useState<TimelineEvent | null>(null);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id && stageId) {
            setLoading(true);
            const isProduct = id.startsWith('PROD-');
            const fetchedData = isProduct ? getProductById(id) : getBatchById(id);

            if (!fetchedData) {
                notFound();
                return;
            }
            setData(fetchedData as BatchData | AssembledProduct);

            const timeline = isProduct ? (fetchedData as AssembledProduct).timeline : (fetchedData as BatchData).timeline;
            const stageEvent = timeline.find(e => e.id === parseInt(stageId, 10));

            if (stageEvent) {
                setStage(stageEvent);
            }

            QRCode.toDataURL(id, { width: 150, margin: 2 }).then(setQrCodeDataUrl);
            
            setLoading(false);
        } else {
            notFound();
        }
    }, [id, stageId, getBatchById, getProductById]);
    
    useEffect(() => {
        if (!loading && typeof window !== 'undefined') {
            setTimeout(() => window.print(), 500);
        }
    }, [loading]);
    
    if (loading || !data || !stage) {
        return (
            <div className="p-8 max-w-2xl mx-auto">
                <Skeleton className="h-8 w-48 mb-4" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    const StageIcon = iconMap[stage.icon];
    const isProduct = id.startsWith('PROD-');
    const productName = 'productId' in data ? data.productName : (data as BatchData).productName;


    return (
        <div className="bg-white text-black min-h-screen">
            <div className="p-8 md:p-12 max-w-3xl mx-auto print:p-0">
                <header className="flex justify-between items-center mb-8 print:hidden">
                     <div className="flex items-center gap-2 text-primary">
                        <Leaf className="h-7 w-7 text-slate-800" />
                        <span className="font-headline text-xl font-semibold text-slate-800">FloraChain Report</span>
                    </div>
                    <Button onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Document
                    </Button>
                </header>

                <main className="p-8 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <p className="font-semibold text-slate-500 uppercase tracking-wider text-sm">Provenance Report</p>
                            <h1 className="text-3xl font-headline font-bold text-slate-800 mt-1">{productName}</h1>
                            <p className="text-slate-600 mt-1">ID: <span className="font-mono text-sm">{id}</span></p>
                        </div>
                        <div className="flex items-center gap-2 text-slate-800">
                             <Leaf className="h-6 w-6" />
                             <span className="font-headline text-lg font-semibold">FloraChain</span>
                        </div>
                    </div>

                    <Separator className="my-6 bg-slate-200" />

                    <h2 className="text-xl font-headline font-semibold text-slate-800">Stage Details</h2>
                    
                    <Card className="mt-4 shadow-none border-slate-200 bg-slate-50/50">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                                    <StageIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="font-headline text-lg">{stage.title}</CardTitle>
                                    <CardDescription>{stage.date}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-slate-700 whitespace-pre-wrap">{stage.description}</p>
                        </CardContent>
                    </Card>

                    <Separator className="my-6 bg-slate-200" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-2">
                             <h3 className="font-headline font-semibold text-slate-800">Verification QR Code</h3>
                             <p className="text-sm text-slate-600 mt-2">
                                This QR code links to the full, verifiable provenance history of this {isProduct ? 'product' : 'batch'}. Scan it with any smartphone camera to view its journey on the FloraChain platform.
                             </p>
                        </div>
                         {qrCodeDataUrl && (
                            <div className="flex justify-center md:justify-end">
                                <Image
                                    src={qrCodeDataUrl}
                                    alt={`QR Code for ${id}`}
                                    width={150}
                                    height={150}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}


export default function DocumentPage() {
  return (
    <DbProvider>
      <PrintableReport />
    </DbProvider>
  );
}
