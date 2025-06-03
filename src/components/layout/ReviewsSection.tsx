"use client";

import React from "react";
import Container from "./Container";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "@/components/ui/star-rating";

// Sample reviews for the home page
const reviews = [
    {
        id: "r1",
        name: "Rohan",
        message:
            "Perfect stay with amazing views! I had a little hesitant initially but the photos were totally accurate. The beach was literally 5 minutes away and the hosts were helpful in getting the rental car. We'll definitely be back to this beautiful property!",
        rating: 5,
        location: "Anjuna",
        avatar: "R",
    },
    {
        id: "r2",
        name: "Rajat",
        message:
            "Coming to Baga? Beautiful peaceful surroundings and a stunning design. We absolutely loved staying here. The staff was extremely helpful in making our stay memorable and everything was just a short walk away from here.",
        rating: 5,
        location: "Baga",
        avatar: "R",
    },
    {
        id: "r3",
        message:
            "Booked this place for 5 nights, and we enjoyed every single one. The area is quiet yet close to restaurants, bars and the beach. The host also arranged airport transfers which was appreciated. The local recommendations provided were fantastic!",
        name: "Meghna",
        rating: 4.5,
        location: "Candolim",
        avatar: "M",
    },
];

export default function ReviewsSection() {
    return (
        <section className="py-16 bg-white">
            <Container>
                <h2 className="text-3xl font-bold tracking-tight font-headline text-center mb-4">Reviews</h2>
                <p className="text-muted-foreground text-center mb-12">Authentic Reviews From Happy Travelers</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {reviews.map((review) => (
                        <Card key={review.id} className="h-full">
                            <CardContent className="p-6 flex flex-col h-full">
                                <StarRating rating={review.rating} className="mb-3" />
                                <p className="text-sm mb-4 flex-grow">{review.message}</p>
                                <div className="flex items-center pt-4 border-t">
                                    <Avatar className="h-10 w-10 mr-3">
                                        <AvatarImage src={`/avatar-${review.avatar}.png`} alt={review.name} />
                                        <AvatarFallback>{review.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-sm">{review.name}</p>
                                        <p className="text-xs text-muted-foreground">{review.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}
