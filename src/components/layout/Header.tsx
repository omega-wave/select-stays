import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Waves } from 'lucide-react';
import Container from './Container';

export default function Header() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/bookings', label: 'My Bookings' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Waves className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">GoaGetaways</span>
        </Link>

        <nav className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Button key={item.label} variant="ghost" asChild className="w-full justify-start text-lg">
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
