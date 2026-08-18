import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function ProductCard({ product }) {
  const ref = useReveal();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => setDone(false), 1800);
    return () => clearTimeout(timer);
  }, [done]);

  return (
    <div className="card reveal" ref={ref}>
      <div className={`card-img ${product.bg}`}>
        <span className="card-icon">{product.icon}</span>
        <span className="card-badge">{product.badge}</span>
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="sub">{product.sub}</p>
        <div className="card-foot">
          <span className="card-price">{product.price}</span>
          <button
            className={`add-btn ${done ? 'added' : ''}`}
            onClick={() => setDone(true)}
          >
            {done ? product.ctaDoneLabel : product.ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
