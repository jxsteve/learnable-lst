import { useGetProductsQuery } from '../../features/products/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import SectionHeading from '../SectionHeading/SectionHeading';
import product1 from '../../assets/images/product-1.png';
import product2 from '../../assets/images/product-2.png';
import product3 from '../../assets/images/product-3.png';
import product4 from '../../assets/images/product-4.png';
import product5 from '../../assets/images/product-5.png';
import product6 from '../../assets/images/product-6.png';
import product7 from '../../assets/images/product-7.png';
import product8 from '../../assets/images/product-8.png';
import product9 from '../../assets/images/product-9.png';
import product10 from '../../assets/images/product-10.png';
import './BestsellerProducts.css';

/** The ten card images as laid out in the Figma design, in order. */
const PRODUCT_IMAGES = [
  product1, product2, product3, product4, product5,
  product6, product7, product8, product9, product10,
];

export default function BestsellerProducts() {
  const { data } = useGetProductsQuery({ limit: 10 });

  return (
    <section className="bestseller" id="bestseller">
      <div className="bestseller__container">
        <SectionHeading
          tag="Featured Products"
          title="BESTSELLER PRODUCTS"
          subtitle="Problems trying to resolve the conflict between "
        />

        <div className="bestseller__grid">
          {PRODUCT_IMAGES.map((image, index) => (
            <ProductCard key={image} image={image} product={data?.products[index]} />
          ))}
        </div>

        <button className="bestseller__more">LOAD MORE PRODUCTS</button>
      </div>
    </section>
  );
}
