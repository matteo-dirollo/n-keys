import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
// import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";
import { en } from "@payloadcms/translations/languages/en";
import { de } from "@payloadcms/translations/languages/de";
import { it } from "@payloadcms/translations/languages/it";
import { fr } from "@payloadcms/translations/languages/fr";

import { populatePolicies as createDefaultPolicies } from "./app/api/services/policies";
import { Carts } from "./collections/Carts";
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
const sslCert = process.env.SUPABASE_CA_CERT;
const catalog = [Collections, Products];

// const isDevelopment = process.env.NODE_ENV === "development";

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
    Carts,
  ],
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: true,
        ca: sslCert,
      },
    },
    // schemaName: "public",
  }),
  editor: lexicalEditor(),
  endpoints: [
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handler: (req) => {
        return Response.json({ status: "OK" });
      },
      method: "get",
      path: "/healthz",
    },
  ],
  globals: [StoreSettings, HeroSection, Footer],
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: { de, en, fr, it },
  },
  onInit: async (payload) => {
    await createDefaultPolicies(payload);
  },
  plugins,
  secret:
    process.env.PAYLOAD_SECRET ||
    "9beff12a6b089174fb69dc5e94a3bf0a910026871a1b0b717079d43ed4afa267",
  sharp,
  telemetry: false,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
