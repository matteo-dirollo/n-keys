import { Suspense } from "react";

import type { SortOptions } from "../_util/sort-options";

import RefinementList from "../_components/refinement-list";
import SkeletonProductGrid from "../_components/skeleton-product-grid";
import PaginatedProducts from "./paginated-product";

export default function CollectionTemplate({
  collection,
  page,
  sortBy,
}: {
  collection: any;
  page?: string;
  sortBy?: SortOptions;
}) {
  const pageNumber = page ? Number.parseInt(page) : 1;
  const sort = sortBy || "created_at";
  const totalPages = Math.ceil(collection.products.length / 12);

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>{collection.title}</h1>
        </div>
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            collectionId={collection.id}
            page={pageNumber}
            products={collection.products}
            sortBy={sort}
            totalPages={totalPages}
          />
        </Suspense>
      </div>
    </div>
  );
}
