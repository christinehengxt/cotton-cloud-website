import { Link, useLocation, Navigate } from 'react-router-dom';
import { formatPrice } from '../data/products';

export default function OrderConfirmation() {
  const { state } = useLocation();

  if (!state?.orderId) return <Navigate to="/" replace />;

  return (
    <section className="confirm-page">
      <span className="card-icon">🪷</span>
      <h1>Thank you, {state.name || 'friend'}.</h1>
      <p className="sub">Your order has been placed.</p>
      <div className="confirm-details">
        <div>
          <span className="option-label">Order number</span>
          <p>{state.orderId}</p>
        </div>
        <div>
          <span className="option-label">Total paid</span>
          <p>{formatPrice(state.total ?? 0)}</p>
        </div>
      </div>
      <Link to="/" className="btn-primary">Back to Collection</Link>
    </section>
  );
}
