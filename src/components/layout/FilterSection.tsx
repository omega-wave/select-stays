"use client";

import React from "react";
import Container from "./Container";
import FilterBar from "@/components/search/FilterBar";
import Image from "next/image";

export default function FilterSection() {
    return (
        <section className="relative py-8 bg-gradient-to-r from-blue-600/10 to-teal-600/10 overflow-hidden">
            {/* Background pattern elements */}
            <div className="absolute inset-0 bg-[url('/assets/pattern-bg.png')] opacity-10"></div>
            {/* Decorative images - similar to the image shown */}
            <div className="absolute top-0 right-0 w-48 h-48 transform translate-x-1/3 -translate-y-1/3">
                <Image src="/assets/deco-circle.svg" alt="" layout="fill" objectFit="contain" className="opacity-30" />
            </div>
            <div className="absolute bottom-0 left-0 w-48 h-48 transform -translate-x-1/3 translate-y-1/3">
                <Image src="/assets/deco-leaf.svg" alt="" layout="fill" objectFit="contain" className="opacity-30" />
            </div>{" "}
            <Container>
                {/* FilterBar with search functionality */}{" "}
                <FilterBar onFilterChange={() => {}} className="bg-white border shadow-lg mx-auto w-full" />
            </Container>
        </section>
    );
}
