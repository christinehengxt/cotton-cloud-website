import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export default function BestSellersPage() {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);

  return (
    <section className="products products-page">
      <div className="products-head">
        <span className="section-eyebrow">Fan Favorites</span>
        <h2>
          Best <em>Sellers</em>
        </h2>
      </div>
      {bestSellers.length > 0 ? (
        <div className="products-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="products-empty">No best sellers yet — check back soon.</p>
      )}
    </section>
  );
}
