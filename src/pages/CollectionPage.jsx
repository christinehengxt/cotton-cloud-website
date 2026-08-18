import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];
const FILTERS = ['All', ...CATEGORIES];

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section className="products products-page">
      <div className="products-head">
        <span className="section-eyebrow">Shop All</span>
        <h2>
          The Full <em>Collection</em>
        </h2>
      </div>

      <div className="collection-filters">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {activeFilter === 'All' ? (
        CATEGORIES.map((category) => (
          <div className="products-category" key={category}>
            <h3 className="products-category-title">{category}</h3>
            <div className="products-grid">
              {PRODUCTS.filter((p) => p.category === category).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
