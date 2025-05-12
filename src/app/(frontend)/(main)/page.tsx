import type { Metadata } from "next";

import config from "@payload-config";
import { getPayload } from "payload";

import FeaturedProducts from "../_components/featured-products";
import Hero from "../_components/hero";

export const metadata: Metadata = {
  description:
    "Your one-stop shop for all things e-commerce. From product management to order fulfillment, we've got you covered.",
  title: "N-KEYS | E-commerce Platform",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const payload = await getPayload({ config });

  const heroSection = await payload.findGlobal({
    slug: "hero-section",
  });
  const hero = heroSection.type?.find((f) => f.blockType === "hero");

  const featuredCollections = await payload.find({
    collection: "collections",
    limit: 3,
    sort: "createdAt",
  });

  return (
    <>
      <Hero hero={hero as any} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={featuredCollections.docs} />
        </ul>
      </div>
    </>
  );
}
