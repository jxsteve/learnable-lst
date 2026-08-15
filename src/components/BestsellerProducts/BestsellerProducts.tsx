import { useState } from 'react';
import { useGetProductsQuery } from '../../features/products/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import SectionHeading from '../SectionHeading/SectionHeading';
import './BestsellerProducts.css';

/** The design lays out ten cards; each "load more" reveals another ten. */
const PAGE_SIZE = 10;

export default function BestsellerProducts() {
  // Offset of the page being requested; earlier pages stay merged in the cache.
  const [skip, setSkip] = useState(0);
  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery({
    limit: PAGE_SIZE,
    skip,
  });

  const products = data?.products ?? [];
  const hasMore = data ? products.length < data.total : false;

  return (
    <section className="bestseller" id="bestseller">
      <div className="bestseller__container">
        <SectionHeading
          tag="Featured Products"
          title="BESTSELLER PRODUCTS"
          subtitle="Problems trying to resolve the conflict between "
        />

        {isError ? (
          <div className="bestseller__status" role="alert">
            <p>We couldn't load products right now.</p>
            <button className="bestseller__more" onClick={() => refetch()}>TRY AGAIN</button>
          </div>
        ) : (
          <>
            <div className="bestseller__grid">
              {isLoading
                ? Array.from({ length: PAGE_SIZE }, (_, index) => (
                    <div key={index} className="bestseller__skeleton" aria-hidden />
                  ))
                : products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>

            {hasMore && (
              <button
                className="bestseller__more"
                disabled={isFetching}
                onClick={() => setSkip(products.length)}
              >
                {isFetching ? 'LOADING…' : 'LOAD MORE PRODUCTS'}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
