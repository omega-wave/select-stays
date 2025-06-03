import { getProperties } from "../lib/data";
import FilterSection from "../components/layout/FilterSection";
import Container from "../components/layout/Container";
import { Button } from "../components/ui/button";
import Link from "next/link";
import PropertyTileGrid from "../components/property/PropertyTileGrid";
import LocationSection from "../components/layout/LocationSection";
import ReviewsSection from "../components/layout/ReviewsSection";
import FeaturesSection from "../components/layout/FeaturesSection";

export default async function HomePage() {
    const allProperties = await getProperties();

    // Group properties by type
    const villas = allProperties.filter((p) => p.type === "Villa");
    const apartments = allProperties.filter((p) => p.type === "Apartment");
    const studios = allProperties.filter((p) => p.type === "Studio") || [];

    return (
        <>
            {/* Hero Section with Search */}
            <FilterSection />

            {/* Villas Section */}
            <section className="py-12 bg-white">
                <Container>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold tracking-tight font-headline">Villas</h2>{" "}
                        <Button variant="outline" asChild>
                            <Link href="/properties?type=Villa">Explore More</Link>
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground mb-6">
                        <p>Spacious, Luxury and Absolute Comfort in Private Villa Across Goa</p>
                    </div>
                    <PropertyTileGrid properties={villas.slice(0, 3)} />
                </Container>
            </section>

            {/* Apartments Section */}
            <section className="py-12 bg-slate-50">
                <Container>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold tracking-tight font-headline">Apartments</h2>{" "}
                        <Button variant="outline" asChild>
                            <Link href="/properties?type=Apartment">Explore More</Link>
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground mb-6">
                        <p>Comfortable, Well-equipped apartments in Prime Locations</p>
                    </div>
                    <PropertyTileGrid properties={apartments.slice(0, 3)} />
                </Container>
            </section>

            {/* Studios Section */}
            <section className="py-12 bg-white">
                <Container>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold tracking-tight font-headline">Studios</h2>{" "}
                        <Button variant="outline" asChild>
                            <Link href="/properties?type=Studio">Explore More</Link>
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground mb-6">
                        <p>Cozy, Chic and Always Comfortable</p>
                    </div>
                    <PropertyTileGrid properties={studios.slice(0, 3)} />
                </Container>
            </section>

            {/* Locations Section */}
            <LocationSection />

            {/* Why Choose Us Section */}
            <FeaturesSection />

            {/* Reviews Section */}
            <ReviewsSection />
        </>
    );
}
