import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";

import { populatePolicies as createDefaultPolicies } from "./app/api/services/policies";
import { Collections } from "./collections/Collections";
import { GiftCards } from "./collections/GiftCards";
import { Locations } from "./collections/Locations";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { Payments } from "./collections/Payments";
import { Policies } from "./collections/Policies";
import { Products } from "./collections/Products/Products";
import { Shipping } from "./collections/Shipping";
import { Users } from "./collections/Users";
import { Footer } from "./globals/Footer";
import { HeroSection } from "./globals/HeroSection";
import StoreSettings from "./globals/StoreSettings";
import { plugins } from "./plugins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const catalog = [Collections, Products];

export default buildConfig({
  admin: {
    importMap: {
      autoGenerate: true,
      baseDir: path.resolve(dirname),
    },
    suppressHydrationWarning: true,
    user: Users.slug,

    components: {
      Nav: "@/admin/components/Nav/Nav.tsx",
      views: {
        dashboard: {
          Component: "@/admin/components/Dashboard/Dashboard",
          path: "@/admin/components/Dashboard/Dashboard",
        },
      },
    },
  },
  collections: [
    Orders,
    ...catalog,
    Users,
    Media,
    Policies,
    GiftCards,
    Payments,
    Locations,
    Shipping,
  ],
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),
  editor: lexicalEditor(),
  endpoints: [
    {
      handler: (req) => {
        return Response.json({ status: "OK" });
      },
      method: "get",
      path: "/healthz",
    },
  ],
  globals: [StoreSettings, HeroSection, Footer],
  onInit: async (payload) => {
    await createDefaultPolicies(payload);
  },
  plugins: [
    ...plugins,
    // Add the Vercel Blob Storage plugin to handle file uploads
    vercelBlobStorage({
      collections: {
        media: {
          prefix: "uploads/media/", // Prefix for media files
        },
      },
      enabled: true, // Enable the plugin
      token: process.env.BLOB_READ_WRITE_TOKEN, // Vercel Blob token
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
  telemetry: false,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
