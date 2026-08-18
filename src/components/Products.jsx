import { useReveal } from '../hooks/useReveal';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';

export default function Products() {
  const headRef = useReveal();

  return (
    <section className="products" id="collection">
      <div className="products-head reveal" ref={headRef}>
        <span className="section-eyebrow">The Collection</span>
        <h2>
          Made to move, <em>made to feel</em>
        </h2>
      </div>
      <div className="products-grid">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
