
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, ShieldCheck, Globe, Users, Twitter, Facebook, Instagram, Linkedin, Sprout, Factory, Truck, Scan, BarChart, DollarSign, Award } from 'lucide-react';
import { useLanguage, content } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const { language } = useLanguage();
  const c = content[language].home;

  const howItWorksSteps = [
    { text: c.howItWorks.step1, icon: Sprout },
    { text: c.howItWorks.step2, icon: Factory },
    { text: c.howItWorks.step3, icon: Truck },
    { text: c.howItWorks.step4, icon: Scan },
  ];

  const keyFeatures = [
    { title: c.keyFeatures.feature1, icon: ShieldCheck },
    { title: c.keyFeatures.feature2, icon: BarChart },
    { title: c.keyFeatures.feature3, icon: DollarSign },
    { title: c.keyFeatures.feature4, icon: Award },
    { title: c.keyFeatures.feature5, icon: Globe },
  ];
  
  const stakeholders = [
    { title: c.stakeholders.farmerTitle, description: c.stakeholders.farmerDesc, link: "#" },
    { title: c.stakeholders.brandTitle, description: c.stakeholders.brandDesc, link: "#" },
    { title: c.stakeholders.consumerTitle, description: c.stakeholders.consumerDesc, link: "#" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="relative h-[85vh] sm:h-[90vh] w-full">
          <Image
            src="https://images.unsplash.com/photo-1498550744921-75f79806b8a7?q=80&w=2070&auto=format&fit=crop"
            alt={c.hero.alt}
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
              <LanguageSwitcher variant="ghost" />
              <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link href="#about">{c.nav.about}</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                <Link href="/login">{c.nav.signIn}</Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-0">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              {c.hero.title} <span className="text-accent">{c.hero.titleHighlight}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              {c.hero.subtitle}
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/verify?role=consumer">
                  {c.hero.trackButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-16 lg:py-24 bg-card text-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">{c.about.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{c.about.p1}</p>
              <p className="mt-4 text-muted-foreground">{c.about.p2}</p>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1524539201386-e366a538743c?q=80&w=1974&auto=format&fit=crop" alt={c.about.alt} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

       {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-16 lg:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">{c.howItWorks.title}</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{c.howItWorks.subtitle}</p>
          <div className="relative mt-12">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              {howItWorksSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border-4 border-background z-10">
                      <StepIcon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-lg font-headline font-semibold">{step.text}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
       {/* Key Features Section */}
      <section id="features" className="w-full py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">{c.keyFeatures.title}</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Card key={index} className="text-left p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FeatureIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-headline font-semibold">{feature.title}</h3>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* For Each Stakeholder Section */}
      <section id="stakeholders" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">{c.stakeholders.title}</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stakeholders.map((stakeholder, index) => (
               <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="font-headline">{stakeholder.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{stakeholder.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button variant="outline" className="w-full" asChild>
                      <a href={stakeholder.link}>{c.stakeholders.learnMore}</a>
                    </Button>
                  </div>
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

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">{c.testimonials.title}</h2>
           <div className="mt-12 max-w-lg mx-auto">
             <Card>
               <CardContent className="p-6">
                <blockquote className="text-lg italic text-foreground">
                  "{c.testimonials.quote}"
                </blockquote>
                <p className="mt-4 font-semibold text-right">- {c.testimonials.author}</p>
               </CardContent>
             </Card>
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
