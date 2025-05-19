import { getPayload, type Plugin } from "payload";

import { cjPlugin } from "@shopnex/cj-plugin";
import { importExportPlugin } from "@shopnex/import-export-plugin";
import { storePlugin } from "@shopnex/store-plugin";
import { stripePlugin } from "@shopnex/stripe-plugin";

import { paymentCanceled } from "./webhooks/payment-canceled";
import { paymentSucceeded } from "./webhooks/payment-succeeded";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { MetaImageField } from "@payloadcms/plugin-seo/fields";
import { lexicalToPlainText } from "./utils/lexicalToPlainText";
import { mapProducts } from "./utils/map-products";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import config from "@payload-config";

export const plugins: Plugin[] = [
  stripePlugin({
    // isTestKey: Boolean(process.env.NEXT_PUBLIC_STRIPE_IS_TEST_KEY),
    logs: true,
    paymentCollectionSlug: "payments",
    rest: false,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
    stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
    webhooks: {
      "payment_intent.canceled": paymentCanceled,
      "payment_intent.succeeded": paymentSucceeded,
    },
  }),
  cjPlugin({
    cjApiKey: process.env.CJ_PASSWORD || "",
    cjEmailAddress: process.env.CJ_EMAIL_ADDRESS || "",
    cjRefreshToken: process.env.CJ_REFRESH_TOKEN,
  }),
  seoPlugin({
    collections: ["products", "collections"],
    uploadsCollection: "media",
    generateTitle: ({ doc }) => {
      return `${doc.title} | N-KEYS`;
    },
    generateDescription: ({ doc }) => {
      const lexical = doc.description;
      let plain = "";
      if (lexical && lexical.root) {
        plain = lexicalToPlainText(lexical.root).trim();
      }
      return plain.slice(0, 150);
    },
    generateImage: async ({ doc }) => {
      const payload = await getPayload({ config });

      const productRes = await payload.find({
        collection: "products",
        limit: 1,
        where: {
          handle: {
            equals: doc.handle,
          },
        },
      });

      const [product] = productRes.docs;
      if (!product) {
        return "No product found";
      }

      const [mappedProduct] = mapProducts([product]);

      const imageUrl =
        mappedProduct?.variants?.find(
          (variant) =>
            typeof variant.imageUrl === "string" && variant.imageUrl.length > 0
        )?.imageUrl || "";

      return imageUrl;
    },
    generateURL: ({ doc, collectionSlug }) => {
      return `https://n-keys.com/${collectionSlug}/${doc.handle}`;
    },

    tabbedUI: true,
    fields: ({ defaultFields }) =>
      defaultFields.map((field) =>
        field.type !== "upload"
          ? field
          : MetaImageField({
              hasGenerateFn: true,
              relationTo: "media",
              overrides: {
                admin: {
                  allowCreate: true,
                },
              },
            })
      ),
  }),
  storePlugin({}),
  importExportPlugin({
    collections: ["products", "orders"],
    disableJobsQueue: true,
    importCollections: [
      {
        collectionSlug: "products",
      },
      {
        collectionSlug: "orders",
      },
    ],
  }),
  vercelBlobStorage({
    collections: {
      media: {
        prefix: "uploads/media/",
      },
    },
    enabled: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
];
