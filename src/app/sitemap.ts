import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { getServerSideURL } from "@/utils/getURL";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });
  const products = await payload.find({
    collection: "products",
    limit: 0,
    where: {},
  });

  const url = getServerSideURL();

  return [
    ...products.docs.map(({ handle, updatedAt }) => ({
      url: `${url}/products/${handle}`,
      lastModified: new Date(updatedAt),
      // alternates: {
      //   languages: {
      //     en: `${url}/products/${handle}/en`,
      //   },
      // },
    })),
  ];
}
