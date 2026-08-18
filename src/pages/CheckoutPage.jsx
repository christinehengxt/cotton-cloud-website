import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../data/products';
import { findVoucherByCode, getEligibleVouchers } from '../data/vouchers';

function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutPage() {
  const { items, total, removeItem, clearCart } = useCart();
  const { user, markOrdered } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [discountError, setDiscountError] = useState('');

  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      fullName: f.fullName || user.name,
      email: f.email || user.email,
    }));
  }, [user]);

  const eligibleVouchers = getEligibleVouchers(user).filter((v) => v.code !== appliedVoucher?.code);
  const discountAmount = appliedVoucher ? Math.round(total * appliedVoucher.percent) / 100 : 0;
  const finalTotal = total - discountAmount;

  const applyVoucherCode = (code) => {
    const voucher = findVoucherByCode(code);
    if (!voucher || !voucher.eligible(user)) {
      setDiscountError('That code is invalid or not eligible for your account.');
      return;
    }
    setAppliedVoucher(voucher);
    setDiscountCode('');
    setDiscountError('');
  };

  const update = (field) => (e) => {
    let { value } = e.target;
    if (field === 'cardNumber') value = formatCardNumber(value);
    if (field === 'expiry') value = formatExpiry(value);
    if (field === 'cvc') value = value.replace(/\D/g, '').slice(0, 4);
    setForm((f) => ({ ...f, [field]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.postcode.trim()) e.postcode = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.cardName.trim()) e.cardName = 'Required';
    if (form.cardNumber.replace(/\s/g, '').length !== 16) e.cardNumber = '16 digits required';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Use MM/YY';
    if (form.cvc.length < 3) e.cvc = '3-4 digits';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    setPlacing(true);
    setTimeout(() => {
      const orderId = `CC-${Date.now().toString().slice(-8)}`;
      if (user) markOrdered();
      clearCart();
      navigate('/order-confirmed', { state: { orderId, name: form.fullName, total: finalTotal } });
    }, 900);
  };

  if (items.length === 0) {
    return (
      <section className="checkout-page">
        <div className="checkout-empty">
          <h2>Your bag is empty.</h2>
          <p className="sub">Add something soft to it first.</p>
          <Link to="/" className="btn-primary">Browse the Collection</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="checkout-block">
            <h2>Shipping details</h2>
            <div className="field-row">
              <label>
                Full name
                <input type="text" value={form.fullName} onChange={update('fullName')} />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </label>
              <label>
                Email
                <input type="email" value={form.email} onChange={update('email')} />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>
            </div>
            <label>
              Address
              <input type="text" value={form.address} onChange={update('address')} />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </label>
            <div className="field-row">
              <label>
                City
                <input type="text" value={form.city} onChange={update('city')} />
                {errors.city && <span className="field-error">{errors.city}</span>}
              </label>
              <label>
                Postcode
                <input type="text" value={form.postcode} onChange={update('postcode')} />
                {errors.postcode && <span className="field-error">{errors.postcode}</span>}
              </label>
            </div>
            <label>
              Phone
              <input type="tel" value={form.phone} onChange={update('phone')} />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </label>
          </div>

          <div className="checkout-block">
            <h2>Payment</h2>
            <label>
              Name on card
              <input type="text" value={form.cardName} onChange={update('cardName')} />
              {errors.cardName && <span className="field-error">{errors.cardName}</span>}
            </label>
            <label>
              Card number
              <input
                type="text"
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                value={form.cardNumber}
                onChange={update('cardNumber')}
              />
              {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
            </label>
            <div className="field-row">
              <label>
                Expiry
                <input type="text" placeholder="MM/YY" value={form.expiry} onChange={update('expiry')} />
                {errors.expiry && <span className="field-error">{errors.expiry}</span>}
              </label>
              <label>
                CVC
                <input type="text" inputMode="numeric" placeholder="123" value={form.cvc} onChange={update('cvc')} />
                {errors.cvc && <span className="field-error">{errors.cvc}</span>}
              </label>
            </div>
            <p className="checkout-note">This is a demo store — no real payment is processed.</p>
          </div>

          <button className="btn-primary checkout-submit" type="submit" disabled={placing}>
            {placing ? 'Placing order…' : `Pay ${formatPrice(finalTotal)}`}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order summary</h2>
          <ul className="checkout-items">
            {items.map((item) => (
              <li key={`${item.id}-${item.size}-${item.color}`} className="checkout-item">
                <span className="checkout-item-icon">{item.icon}</span>
                <div className="checkout-item-info">
                  <span className="checkout-item-name">{item.name}</span>
                  <span className="checkout-item-meta">
                    {item.color ? `${item.color} · ` : ''}Size {item.size} · Qty {item.qty}
                  </span>
                </div>
                <span className="checkout-item-price">{formatPrice(item.price * item.qty)}</span>
                <button
                  type="button"
                  className="checkout-item-remove"
                  onClick={() => removeItem(item.id, item.size, item.color)}
                  aria-label={`Remove ${item.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          {!user && (
            <p className="checkout-note" style={{ marginTop: '1.2rem' }}>
              <Link to="/login" state={{ from: '/checkout' }}>Log in</Link> to use your vouchers.
            </p>
          )}

          {eligibleVouchers.length > 0 && (
            <div className="voucher-suggestions" style={{ marginTop: '1.2rem' }}>
              {eligibleVouchers.map((v) => (
                <div className="voucher-suggestion" key={v.code}>
                  <span>{v.label}</span>
                  <button type="button" onClick={() => applyVoucherCode(v.code)}>Apply</button>
                </div>
              ))}
            </div>
          )}

          {appliedVoucher ? (
            <div className="discount-applied">
              <span>{appliedVoucher.code} applied — {appliedVoucher.percent}% off</span>
              <button type="button" onClick={() => setAppliedVoucher(null)} aria-label="Remove voucher">×</button>
            </div>
          ) : (
            <div className="discount-row">
              <input
                type="text"
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => { setDiscountCode(e.target.value); setDiscountError(''); }}
              />
              <button type="button" onClick={() => applyVoucherCode(discountCode)}>Apply</button>
            </div>
          )}
          {discountError && <span className="field-error">{discountError}</span>}

          <div className="checkout-total-row checkout-total-first">
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          {appliedVoucher && (
            <div className="checkout-total-row checkout-discount-line">
              <span>Discount</span>
              <span>−{formatPrice(discountAmount)}</span>
            </div>
          )}
          <div className="checkout-total-row checkout-total-final">
            <span>Total</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
