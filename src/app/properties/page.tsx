import { getProperties } from "@/lib/data";
import PropertyListings from "@/components/property/PropertyListings";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Property Listings | Select Stays",
    description: "Explore our curated collection of luxury villas, comfortable apartments, and cozy studios in Goa.",
};

export default async function PropertiesPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const allProperties = await getProperties();
    let filteredProperties = allProperties;

    // Filter by property type if present in query params
    if (searchParams?.type) {
        const type = searchParams.type.toString();
        if (["Villa", "Apartment", "Studio"].includes(type)) {
            filteredProperties = allProperties.filter((p) => p.type === type);
        }
    }

    return <PropertyListings initialProperties={filteredProperties} />;
}
