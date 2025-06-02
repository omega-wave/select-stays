import PropertyListings from '@/components/property/PropertyListings';
import { getProperties } from '@/lib/data';

export default async function HomePage() {
  const properties = await getProperties();

  return (
    <PropertyListings initialProperties={properties} />
  );
}
