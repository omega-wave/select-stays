import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Select Stays - Luxury Vacation Rentals",
    description: "Find and book luxury vacation homes and villas with private pools, chefs, and more amenities.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {" "}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </head>{" "}
            <body className={cn("font-body antialiased min-h-screen flex flex-col text-gray-700")}>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <Toaster />
            </body>
        </html>
    );
}
