import type { Metadata } from "next";

import ProductTemplate from "@/app/(frontend)/_templates/product";
import { mapProducts } from "@/utils/map-products";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import {
  imageSchema,
  productSchema,
} from "@/app/(frontend)/_components/schema";
import Script from "next/script";

type ProductPageProps = {
  params: Promise<{ productHandle: string }>;
};

export async function generateMetadata(
  props: ProductPageProps
): Promise<Metadata> {
  const params = await props.params;
  const { productHandle } = params;

  const payload = await getPayload({ config });
  const productRes = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      handle: {
        equals: productHandle,
      },
    },
  });

  const mappedProducts = mapProducts(productRes.docs);
  const product = mappedProducts[0];

  if (!product) {
    notFound();
  }

  // Find the first variant with a valid imageUrl
  const imageUrl = product.variants?.find(
    (variant: any) =>
      typeof variant.imageUrl === "string" && variant.imageUrl.length > 0
  )?.imageUrl;

  return {
    description: `${product.title}`,
    openGraph: {
      description: `${product.title}`,
      images: imageUrl ? [imageUrl] : [],
      title: `${product.title} | N-KEYS`,
    },
    title: `${product.title} | N-KEYS`,
  };
}
export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;

  const payload = await getPayload({ config });
  const product = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      handle: {
        equals: params.productHandle,
      },
    },
  });

  const mappedProducts = mapProducts(product.docs);

  const pricedProduct = mappedProducts[0];

  if (!pricedProduct) {
    notFound();
  }

  const schema: any[] = [
    imageSchema(pricedProduct),
    productSchema(pricedProduct),
  ];

  return (
    <>
      <Script type={"application/ld+json"} strategy={"lazyOnload"}>
        {JSON.stringify(schema)}
      </Script>
      <ProductTemplate product={pricedProduct} />
    </>
  );
}
