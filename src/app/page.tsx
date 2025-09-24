
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, ShieldCheck, Globe, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="relative h-[85vh] sm:h-[90vh] w-full">
          <Image
            src="https://images.unsplash.com/photo-1498550744921-75f79806b8a7?q=80&w=2070&auto=format&fit=crop"
            alt="Lush green landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <header className="absolute top-0 left-0 right-0 p-4 z-10">
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

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-0">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              FloraChain, every herb tells its story <span className="text-accent">from soil to shelf.</span>
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
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-16 lg:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">About FloraChain</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Our mission is to empower communities, protect biodiversity, and restore trust in Ayurveda through cutting-edge technology.
          </p>
          <div className="mt-12 max-w-4xl mx-auto text-left space-y-8">
             <div className="p-8 border rounded-lg bg-card text-card-foreground">
                <p className="text-base md:text-lg leading-relaxed">
                FloraChain is a blockchain-powered traceability platform designed to bring trust, transparency, and sustainability to the Ayurvedic herb supply chain. By combining geo-tagging, smart contracts, and secure digital records, FloraChain ensures every herb can be tracked from farm to final product.
                </p>
             </div>
             <div className="p-8 border rounded-lg bg-card text-card-foreground">
                <p className="text-base md:text-lg leading-relaxed">
                Our system empowers farmers with fair pricing and recognition, protects consumers from adulterated or unsafe products, and enables businesses to maintain compliance with national and global quality standards. With QR/NFC-enabled verification, customers can instantly check the authenticity and origin of Ayurvedic products, fostering confidence in traditional medicine while promoting sustainable sourcing practices.
                </p>
             </div>
             <div className="p-8 border rounded-lg bg-card text-card-foreground">
                <p className="text-base md:text-lg leading-relaxed">
                At FloraChain, we aim to empower rural communities, protect biodiversity, and restore trust in Ayurveda through cutting-edge technology.
                </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
