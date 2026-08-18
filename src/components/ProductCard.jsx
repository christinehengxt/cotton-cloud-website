import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { formatPrice } from '../data/products';

export default function ProductCard({ product }) {
  const ref = useReveal();
  const navigate = useNavigate();
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    if (!notified) return;
    const timer = setTimeout(() => setNotified(false), 1800);
    return () => clearTimeout(timer);
  }, [notified]);

  const handleCta = (e) => {
    e.stopPropagation();
    if (product.comingSoon) {
      setNotified(true);
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="card reveal"
      ref={ref}
      onClick={() => navigate(`/product/${product.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${product.id}`)}
    >
      <div className={`card-img ${product.bg}`}>
        <span className="card-icon">{product.icon}</span>
        <span className="card-badge">{product.badge}</span>
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="sub">{product.sub}</p>
        <div className="card-foot">
          <span className="card-price">{formatPrice(product.price)}</span>
          <button
            className={`add-btn ${notified ? 'added' : ''}`}
            onClick={handleCta}
          >
            {product.comingSoon
              ? (notified ? product.ctaDoneLabel : product.ctaLabel)
              : 'Select Options'}
          </button>
        </div>
      </div>
    </div>
  );
}
