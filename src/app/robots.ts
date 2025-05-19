import type { MetadataRoute } from "next";
import { getServerSideURL } from "@/utils/getURL";
export default function robots(): MetadataRoute.Robots {
  const url = getServerSideURL();

  return {
    rules: [
      {
        userAgent: "GoogleBot",
        allow: "/",
        disallow: "/admin",
      },
      {
        userAgent: ["AhrefsBot", "BingBot", "SemrushBot"],
        disallow: ["/"],
      },
    ],
    sitemap: `${url}/sitemap.xml`,
  };
}
