
'use client';

import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ArrowRight, History } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function FarmerDashboard() {
  const { language, content } = useLanguage();
  const c = content[language].farmerDashboard;

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <PlusCircle className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="font-headline">{c.create.title}</CardTitle>
              <CardDescription>{c.create.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <p className="mb-4 text-sm text-muted-foreground">
            {c.create.longDescription}
          </p>
          <Button asChild>
            <Link href="/create-batch?role=farmer">
              {c.create.button} <ArrowRight className="ml-2 h-4 w-4" />
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
              <CardTitle className="font-headline">{c.view.title}</CardTitle>
              <CardDescription>{c.view.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <p className="mb-4 text-sm text-muted-foreground">
            {c.view.longDescription}
          </p>
          <Button asChild variant="secondary">
            <Link href="/past-batches?role=farmer">
              {c.view.button} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
