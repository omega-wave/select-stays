import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Container from "./Container";

export default function Header() {
    const navItems = [
        { href: "/about-us", label: "About Us" },
        { href: "/explore-stays", label: "Explore Stays" },
        { href: "/list-property", label: "List Your Property" },
        { href: "/contact-us", label: "Contact Us" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
            {" "}
            <Container className="flex h-[72px] items-center justify-between">
                {" "}
                <Link href="/" className="flex items-center">
                    <Image
                        src="https://selectstays.in/wp-content/uploads/2025/02/cropped-Logo_Final-18-1.png"
                        alt="Select Stays Logo"
                        width={140}
                        height={32}
                        priority
                    />
                </Link>
                <nav className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.href} className="text-gray-700 hover:text-primary text-[14px] font-medium">
                            {item.label}
                        </Link>
                    ))}
                </nav>{" "}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-700">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            {" "}
                            <div className="flex items-center mb-8 mt-4">
                                <Image
                                    src="https://selectstays.in/wp-content/uploads/2025/02/cropped-Logo_Final-18-1.png"
                                    alt="Select Stays Logo"
                                    width={120}
                                    height={28}
                                    priority
                                />
                            </div>
                            <nav className="flex flex-col gap-5 mt-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="text-gray-700 hover:text-primary text-sm font-medium"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    );
}
