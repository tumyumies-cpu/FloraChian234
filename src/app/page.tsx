
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1498550744921-75f79806b8a7?q=80&w=2070&auto=format&fit=crop"
        alt="Lush green landscape"
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4">
        <div className="container mx-auto flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2 text-white">
              <Leaf className="h-7 w-7" />
              <span className="font-headline text-xl font-semibold">FloraChain</span>
           </Link>
           <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
              <Link href="/login">Sign In</Link>
           </Button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="flex h-screen flex-col items-center justify-center text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Traceability from Soil to Soul
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Experience unparalleled transparency in the herbal supply chain. Follow your product's complete journey from the farm to your hands, verified at every step.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/login">
                Track Your Product
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
