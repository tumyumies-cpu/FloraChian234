
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, ShieldCheck, Globe, Users, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage, content } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/language-switcher';

export default function HomePage() {
  const { language } = useLanguage();
  const c = content[language].home;

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
              <LanguageSwitcher variant="ghost" />
              <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link href="#about">{c.aboutNav}</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                <Link href="/login">{c.signIn}</Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-0">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              {c.title} <span className="text-accent">{c.titleHighlight}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              {c.subtitle}
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/verify?role=consumer">
                  {c.trackButton}
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
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">{c.aboutTitle}</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {c.aboutSubtitle}
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-headline font-semibold">{c.feature1Title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {c.feature1Text}
                  </p>
              </div>
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-headline font-semibold">{c.feature2Title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {c.feature2Text}
                  </p>
              </div>
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-headline font-semibold">{c.feature3Title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {c.feature3Text}
                  </p>
              </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-card border-t">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 text-foreground">
                <Leaf className="h-7 w-7 text-primary" />
                <span className="font-headline text-xl font-semibold">FloraChain</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">{c.footerSlogan}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
              <div>
                <h4 className="font-headline font-semibold">{c.footerNavigate}</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="#about" className="text-muted-foreground hover:text-primary">{c.aboutNav}</Link></li>
                  <li><Link href="/verify?role=consumer" className="text-muted-foreground hover:text-primary">{c.trackButton}</Link></li>
                  <li><Link href="/login" className="text-muted-foreground hover:text-primary">{c.signIn}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-headline font-semibold">{c.footerPartners}</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="/register-farmer" className="text-muted-foreground hover:text-primary">{c.footerJoinFarmer}</Link></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">{c.footerBrand}</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">{c.footerDistributors}</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-headline font-semibold">{c.footerLegal}</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">{c.footerPrivacy}</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">{c.footerTerms}</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} FloraChain. {c.footerRights}</p>
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
