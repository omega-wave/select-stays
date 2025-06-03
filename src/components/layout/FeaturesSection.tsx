"use client";

import React from "react";
import Container from "./Container";
import { Heart, LocateFixed, ScanFace } from "lucide-react";

const features = [
    {
        title: "Thoughtful Care",
        description: "We handpick every property, ensuring quality and comfort at every stay.",
        icon: Heart,
    },
    {
        title: "Local Insights",
        description: "Get insider guides and recommendations tailored to your stay.",
        icon: LocateFixed,
    },
    {
        title: "Effortless Bookings",
        description: "Our seamless platform and 24/7 support make travel easy.",
        icon: ScanFace,
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-16 bg-white">
            <Container>
                <h2 className="text-3xl font-bold tracking-tight font-headline text-center mb-4">Why Choose Us</h2>
                <p className="text-muted-foreground text-center mb-12">Unmatched Value, Unforgettable Experiences Always</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;

                        return (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                                    <IconComponent size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
