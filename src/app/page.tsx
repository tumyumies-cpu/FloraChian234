
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
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link href="#about">About</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
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
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-headline font-semibold">Trust & Transparency</h3>
                  <p className="mt-2 text-muted-foreground">
                    FloraChain is a blockchain-powered traceability platform designed to bring trust and transparency to the Ayurvedic herb supply chain. By combining geo-tagging, smart contracts, and secure digital records, we ensure every herb can be tracked from farm to final product.
                  </p>
              </div>
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-headline font-semibold">Quality & Compliance</h3>
                  <p className="mt-2 text-muted-foreground">
                    Our system empowers farmers with fair pricing, protects consumers from adulterated products, and enables businesses to maintain compliance with global quality standards. With QR-enabled verification, customers can instantly check product authenticity and origin.
                  </p>
              </div>
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-headline font-semibold">Empowering Communities</h3>
                  <p className="mt-2 text-muted-foreground">
                    At FloraChain, we aim to empower rural communities, protect biodiversity, and restore trust in Ayurveda through cutting-edge technology, fostering confidence in traditional medicine while promoting sustainable sourcing practices.
                  </p>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
