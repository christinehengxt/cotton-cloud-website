import { useReveal } from '../hooks/useReveal';
import ProductCard from './ProductCard';

const PRODUCTS = [
  {
    id: 'petal-sports-bra',
    icon: '🌸',
    badge: 'Best Seller',
    bg: 'b1',
    name: 'Petal Sports Bra',
    sub: 'Ribbed soft-stretch · sizes XS–L',
    price: 'RM 88',
    ctaLabel: 'Add to bag',
    ctaDoneLabel: 'Added ✓',
  },
  {
    id: 'bloom-skirt',
    icon: '🌿',
    badge: 'New',
    bg: 'b2',
    name: 'Bloom Skirt',
    sub: 'Flowy A-line · built-in shorts',
    price: 'RM 108',
    ctaLabel: 'Add to bag',
    ctaDoneLabel: 'Added ✓',
  },
  {
    id: 'lotus-leggings',
    icon: '🪷',
    badge: 'Coming Soon',
    bg: 'b3',
    name: 'Lotus Leggings',
    sub: 'High-waist · four-way stretch',
    price: 'RM 138',
    ctaLabel: 'Notify me',
    ctaDoneLabel: 'Notified ✓',
  },
];

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
