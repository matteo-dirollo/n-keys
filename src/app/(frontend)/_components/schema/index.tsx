import type { Product } from "@/payload-types";
import { lexicalToPlainText } from "@/utils/lexicalToPlainText";

export const productSchema = (props: Product) => {
  const imageUrl = props.variants[0].imageUrl;

  const lexical = props.description;
  let plain = "";
  if (lexical && lexical.root) {
    plain = lexicalToPlainText(lexical.root).trim();
  }
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    headline: props.title,
    description: plain.slice(0, 150),
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${props.handle}`,
    // datePublished: new Date(props.createdAt),
    // dateModified: new Date(props.updatedAt),
    image: [imageUrl ? imageUrl : undefined].filter(Boolean),
  };
};

export const imageSchema = (props: Product) => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: props.variants[0].imageUrl,
  };
};
