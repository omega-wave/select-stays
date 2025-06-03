import { getProperties } from "@/lib/data";
import PropertyListings from "@/components/property/PropertyListings";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Luxury Villas in Goa | Select Stays",
    description:
        "Explore our curated collection of luxury villas in Goa. Private pools, beach access, and more amenities for a perfect getaway.",
};

export default async function VillasPage() {
    const allProperties = await getProperties();
    const villas = allProperties.filter((p) => p.type === "Villa");

    return <PropertyListings initialProperties={villas} />;
}
