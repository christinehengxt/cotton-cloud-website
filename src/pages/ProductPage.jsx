import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductById, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = getProductById(id);

  const [size, setSize] = useState(product?.sizes[0] ?? '');
  const [color, setColor] = useState(product?.colors[0]?.name ?? '');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [notified, setNotified] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return (
      <section className="product-page">
        <div className="product-page-notfound">
          <h2>We couldn't find that piece.</h2>
          <Link to="/" className="btn-primary">Back to Collection</Link>
        </div>
      </section>
    );
  }

  const pairedProducts = (product.pairsWith ?? [])
    .map((pid) => getProductById(pid))
    .filter(Boolean);

  const handleAddToBag = () => {
    addItem(product, size, qty, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addItem(product, size, qty, color);
    navigate('/checkout');
  };

  const handleNotify = () => {
    setNotified(true);
  };

  return (
    <section className="product-page">
      <div className="product-page-crumb">
        <Link to="/">Home</Link> <span>/</span> <Link to="/collection">Collection</Link> <span>/</span> {product.name}
      </div>

      <div className="product-page-grid">
        <div className={`product-page-img ${product.bg}`}>
          <span className="card-icon">{product.icon}</span>
          <span className="card-badge">{product.badge}</span>
        </div>

        <div className="product-page-body">
          <h1>{product.name}</h1>
          <p className="sub">{product.sub}</p>
          <p className="product-page-price">{formatPrice(product.price)}</p>
          <p className="product-page-desc">{product.description}</p>

          <div className="product-page-option">
            <span className="option-label">Color · {color}</span>
            <div className="color-row">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  className={`color-swatch ${color === c.name ? 'active' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => setColor(c.name)}
                  type="button"
                  aria-label={c.name}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="product-page-option">
            <div className="option-label-row">
              <span className="option-label">Size</span>
              <button className="size-guide-toggle" type="button" onClick={() => setShowSizeGuide((v) => !v)}>
                {showSizeGuide ? 'Hide size guide' : 'Size guide'}
              </button>
            </div>
            <div className="size-row">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`size-btn ${size === s ? 'active' : ''}`}
                  onClick={() => setSize(s)}
                  type="button"
                >
                  {s}
                </button>
              ))}
            </div>
            {showSizeGuide && (
              <div className="size-guide-table-wrap">
                <table className="size-guide-table">
                  <thead>
                    <tr>
                      {product.sizeGuide.headers.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizeGuide.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => (
                          <td key={i}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {!product.comingSoon && (
            <div className="product-page-option">
              <span className="option-label">Quantity</span>
              <div className="qty-row">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>
          )}

          <div className="product-page-actions">
            {product.comingSoon ? (
              <button className="btn-primary" type="button" onClick={handleNotify} disabled={notified}>
                {notified ? 'Notified ✓' : 'Notify me'}
              </button>
            ) : (
              <>
                <button className="btn-ghost" type="button" onClick={handleAddToBag}>
                  {added ? 'Added ✓' : 'Add to bag'}
                </button>
                <button className="btn-primary" type="button" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </>
            )}
          </div>

          <ul className="product-page-details">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>

      {pairedProducts.length > 0 && (
        <div className="pairs-with">
          <div className="products-head">
            <span className="section-eyebrow">Complete the Look</span>
            <h2>Goes well <em>with</em></h2>
          </div>
          <div className="products-grid">
            {pairedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
