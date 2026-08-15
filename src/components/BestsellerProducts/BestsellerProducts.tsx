import { useGetProductsQuery } from '../../features/products/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import './BestsellerProducts.css';

export default function BestsellerProducts() {
  const { data, isLoading, isError } = useGetProductsQuery({ limit: 10 });

  return (
    <section className="bestseller" id="bestseller">
      <div className="container">
        <div className="bestseller__header">
          <p className="section-tag">Featured Products</p>
          <h2 className="section-title">BESTSELLER PRODUCTS</h2>
          <p className="section-subtitle">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {isError && (
          <div className="bestseller__error">
            Failed to load products. Please try again.
          </div>
        )}

        {isLoading ? (
          <div className="bestseller__grid">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bestseller__skeleton" />
            ))}
          </div>
        ) : (
          <div className="bestseller__grid">
            {data?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="bestseller__footer">
          <button className="btn-outline">LOAD MORE PRODUCTS</button>
        </div>
      </div>
    </section>
  );
}
