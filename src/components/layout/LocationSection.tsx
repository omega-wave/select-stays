"use client";

import React from "react";
import Container from "./Container";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const locations = [
    {
        name: "Anjuna",
        image: "/assets/locations/anjuna.jpg", // We'll create a placeholder here
        href: "/locations/anjuna",
    },
    {
        name: "Baga",
        image: "/assets/locations/baga.jpg",
        href: "/locations/baga",
    },
    {
        name: "Assagao",
        image: "/assets/locations/assagao.jpg",
        href: "/locations/assagao",
    },
    {
        name: "Candolim",
        image: "/assets/locations/candolim.jpg",
        href: "/locations/candolim",
    },
];

export default function LocationSection() {
    return (
        <section className="py-16 bg-slate-50">
            <Container>
                <h2 className="text-3xl font-bold tracking-tight font-headline text-center mb-4">Locations</h2>
                <p className="text-muted-foreground text-center mb-12">Stunning Locations in Goa's Best Spots</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {locations.map((location) => (
                        <Link href={location.href} key={location.name} className="block transition-transform hover:scale-[1.02]">
                            <Card className="overflow-hidden h-64 relative">
                                {/* Use a placeholder for now - in production, you'd use real images */}
                                <div className="bg-gradient-to-b from-transparent to-black/80 absolute inset-0 z-10"></div>
                                <div className="absolute bottom-4 left-4 z-20 text-white">
                                    <h3 className="text-lg font-semibold">{location.name}</h3>
                                </div>{" "}
                                <div className="relative h-full w-full">
                                    <Image src={location.image} alt={location.name} layout="fill" objectFit="cover" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
