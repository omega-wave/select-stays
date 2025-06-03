"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PropertyImageGalleryProps {
    images: string[];
    altText: string;
}

export default function PropertyImageGallery({ images, altText }: PropertyImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const swiperWrapperRef = useRef<HTMLDivElement>(null); // Number of visible images in the main gallery based on screen size
    const [visibleImagesCount, setVisibleImagesCount] = useState(3);

    // Adjust visible images count based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleImagesCount(1);
            } else if (window.innerWidth < 1024) {
                setVisibleImagesCount(2);
            } else {
                setVisibleImagesCount(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        // Reset to start when images change
        setStartIndex(0);
        setCurrentIndex(0);
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <Card className="aspect-video flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">No images available</p>
            </Card>
        );
    }

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        } else {
            // Jump to end if at beginning
            setStartIndex(Math.max(0, images.length - visibleImagesCount));
        }
    };

    const handleNext = () => {
        if (startIndex < images.length - visibleImagesCount) {
            setStartIndex(startIndex + 1);
        } else {
            // Jump to beginning if at end
            setStartIndex(0);
        }
    };

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    // Get the visible images for the main carousel
    const getVisibleImages = () => {
        const end = Math.min(startIndex + visibleImagesCount, images.length);
        return images.slice(startIndex, end);
    };
    return (
        <div className="relative px-4">
            {/* Main image carousel */}
            <div className="elementor-image-carousel-wrapper">
                <div className="relative px-2">
                    {" "}
                    {/* Navigation buttons */}
                    {images.length > visibleImagesCount && (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 hover:bg-background/80 z-20 shadow-md"
                                onClick={handlePrev}
                                style={{ transform: "translateY(-50%) translateX(-20%)" }}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 hover:bg-background/80 z-20 shadow-md"
                                onClick={handleNext}
                                style={{ transform: "translateY(-50%) translateX(20%)" }}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </>
                    )}{" "}
                    {/* Images row */}
                    <div className="flex gap-2 md:gap-3 overflow-hidden py-1" ref={swiperWrapperRef}>
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative flex-shrink-0 flex-grow",
                                    index >= startIndex && index < startIndex + visibleImagesCount ? "block" : "hidden"
                                )}
                                style={{
                                    width: `calc(${100 / Math.min(visibleImagesCount, images.length)}% - ${
                                        (2 * (Math.min(visibleImagesCount, images.length) - 1)) /
                                        Math.min(visibleImagesCount, images.length)
                                    }rem)`,
                                    maxWidth: "33.333%",
                                }}
                            >
                                <div
                                    className="relative aspect-[3/2] cursor-pointer rounded-lg overflow-hidden"
                                    onClick={() => openLightbox(index)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${altText} - Image ${index + 1}`}
                                        fill
                                        className="object-cover transition-opacity duration-300"
                                        priority={index === 0}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/5 hover:bg-black/20 transition-colors"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>{" "}
            {/* Pagination dots */}
            {images.length > visibleImagesCount && (
                <div className="flex justify-center gap-1.5 mt-4">
                    {Array.from({ length: Math.ceil(images.length / visibleImagesCount) }).map((_, i) => {
                        const isActive = startIndex >= i * visibleImagesCount && startIndex < (i + 1) * visibleImagesCount;
                        return (
                            <button
                                key={i}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    isActive ? "bg-primary w-4" : "bg-gray-300 hover:bg-gray-400"
                                )}
                                onClick={() => setStartIndex(i * visibleImagesCount)}
                                aria-label={`Go to slide group ${i + 1}`}
                            />
                        );
                    })}
                </div>
            )}
            {/* Lightbox */}
            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                <DialogContent className="max-w-screen-lg w-[90vw] max-h-[90vh] p-2 sm:p-4">
                    <div className="relative w-full h-full aspect-video">
                        <Image
                            src={images[lightboxIndex]}
                            alt={`${altText} - Image ${lightboxIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />

                        {images.length > 1 && (
                            <>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80 z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                                    }}
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80 z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                                    }}
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </>
                        )}

                        {/* Image count indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/70 px-3 py-1 rounded-full text-sm font-medium">
                            {lightboxIndex + 1} / {images.length}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
