
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, ShieldCheck, Globe, Users, Twitter, Facebook, Instagram, Linkedin, Sprout, Factory, Truck, Scan, BarChart, DollarSign, Award, MapPin, Fingerprint, QrCode } from 'lucide-react';
import { useLanguage, content } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HomePage() {
  const { language } = useLanguage();
  const c = content[language].home;
  
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));
  const featuredProducts = PlaceHolderImages.filter(img => img.id.startsWith('product-'));

  const howItWorksSteps = [
    { text: c.howItWorks.step1, icon: Sprout },
    { text: c.howItWorks.step2, icon: Factory },
    { text: c.howItWorks.step3, icon: Truck },
    { text: c.howItWorks.step4, icon: Scan },
  ];

  const techPillars = [
    {
      title: 'Geo-Tagging & Smart Contracts',
      description: 'Harvest events are geo-tagged at the source. Smart contracts automatically verify the location is within an approved zone, ensuring origin authenticity.',
      icon: MapPin,
    },
    {
      title: 'Immutable Ledger',
      description: 'Every step, from harvest to processing to lab testing, is recorded on a permissioned blockchain, creating a tamper-proof, end-to-end provenance record.',
      icon: Fingerprint,
    },
    {
      title: 'Consumer Smart Labels',
      description: 'A unique QR code on each product links consumers to an interactive dashboard showing the full journey, including maps, certificates, and farmer profiles.',
      icon: QrCode,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 p-4 z-20 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Leaf className="h-7 w-7" />
            <span className="font-headline text-xl font-semibold">FloraChain</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex gap-1">
                <Button asChild variant="ghost">
                    <Link href="#about">{c.nav.about}</Link>
                </Button>
                 <Button asChild variant="ghost">
                    <Link href="#how-it-works">How It Works</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="#shop">Shop</Link>
                </Button>
            </div>
            <LanguageSwitcher variant="ghost" />
            <Button asChild variant="outline">
              <Link href="/login">{c.nav.signIn}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-card">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16 lg:py-24">
            <div className="text-left">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline">
                {c.hero.title} <span className="text-primary">{c.hero.titleHighlight}</span>
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                {c.hero.subtitle}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg">
                        <Link href="#shop">
                        Shop Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/verify?role=consumer">
                        {c.hero.trackButton}
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
                {heroImages.map((image, index) => (
                    <div key={image.id} className={`rounded-xl overflow-hidden shadow-lg ${index === 0 ? 'row-span-2' : ''}`}>
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            width={index === 0 ? 400 : 200}
                            height={index === 0 ? 800 : 400}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            data-ai-hint={image.imageHint}
                        />
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* How FloraChain Works (for Judges) */}
       <section id="how-it-works" className="w-full py-16 lg:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">How FloraChain Ensures Trust</h2>
                <p className="mt-4 text-lg text-muted-foreground">Our platform is built on three core technological pillars that provide an immutable, end-to-end provenance ledger.</p>
            </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {techPillars.map((pillar, index) => (
               <Card key={index} className="text-center">
                  <CardHeader className="items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                        <pillar.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-headline">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{pillar.description}</p>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-16 lg:py-24 bg-card text-foreground">
        <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">{c.about.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{c.about.p1}</p>
              <p className="mt-4 text-muted-foreground">{c.about.p2}</p>
            </div>
        </div>
      </section>
      
      {/* Shop Section */}
      <section id="shop" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Shop Our Verifiably Sourced Products</h2>
            <p className="mt-4 text-lg text-muted-foreground">Each product is linked to its complete provenance record. Experience true transparency.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
               <Card key={product.id} className="flex flex-col overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <Image
                        src={product.imageUrl}
                        alt={product.description}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        data-ai-hint={product.imageHint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{product.description}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-2xl font-bold text-primary mb-4">$29.99</p>
                    <div className="mt-auto">
                        <Button className="w-full" asChild>
                         <Link href={`/provenance/PROD-1001?role=consumer`}>View Details & Provenance</Link>
                        </Button>
                    </div>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
       {/* Live Dashboard Snapshot */}
       <section className="w-full py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold font-headline">1,200+</p>
              <p className="text-lg mt-2 text-primary-foreground/80">{c.snapshot.batches}</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-headline">150+</p>
              <p className="text-lg mt-2 text-primary-foreground/80">{c.snapshot.farmers}</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-headline">25,000+</p>
              <p className="text-lg mt-2 text-primary-foreground/80">{c.snapshot.products}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-background border-t">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 text-foreground">
                <Leaf className="h-7 w-7 text-primary" />
                <span className="font-headline text-xl font-semibold">FloraChain</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">{c.footer.slogan}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
              <div>
                <h4 className="font-headline font-semibold">{c.footer.navigate.title}</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="#about" className="text-muted-foreground hover:text-primary">{c.footer.navigate.about}</Link></li>
                  <li><Link href="/verify?role=consumer" className="text-muted-foreground hover:text-primary">{c.footer.navigate.track}</Link></li>
                  <li><Link href="/login" className="text-muted-foreground hover:text-primary">{c.footer.navigate.signIn}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-headline font-semibold">{c.footer.partners.title}</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="/register-farmer" className="text-muted-foreground hover:text-primary">{c.footer.partners.joinFarmer}</Link></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">{c.footer.partners.brands}</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">{c.footer.partners.distributors}</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-headline font-semibold">{c.footer.legal.title}</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">{c.footer.legal.privacy}</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">{c.footer.legal.terms}</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">{c.footer.legal.contact}</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} FloraChain. {c.footer.rights}</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

    