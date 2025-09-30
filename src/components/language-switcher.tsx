
'use client';

import { useLanguage } from '@/context/language-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface LanguageSwitcherProps {
    variant?: 'select' | 'ghost';
}

export function LanguageSwitcher({ variant = 'select' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const languages: { value: 'en' | 'hi' | 'te' | 'ta', label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी' },
    { value: 'te', label: 'తెలుగు' },
    { value: 'ta', label: 'தமிழ்' },
  ];

  if (variant === 'ghost') {
      return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                    <Languages className="mr-2 h-4 w-4" />
                    {languages.find(l => l.value === language)?.label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {languages.map(lang => (
                    <DropdownMenuItem key={lang.value} onClick={() => setLanguage(lang.value)}>
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      )
  }

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'hi' | 'te' | 'ta')}>
      <SelectTrigger>
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <SelectValue placeholder="Select language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map(lang => (
          <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
