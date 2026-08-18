import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Logo from './Logo';

export default function Newsletter() {
  const ref = useReveal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  }

  return (
    <section className="newsletter reveal" id="newsletter" ref={ref}>
      <Logo
        width={48}
        height={72}
        stroke="#8a6c5e"
        opacity={0.25}
        style={{ margin: '0 auto 2rem', display: 'block' }}
      />
      <h2>Stay in the softness</h2>
      {submitted ? (
        <p className="newsletter-thanks">Thank you — we'll be in touch soon 🌸</p>
      ) : (
        <>
          <p>Early access to new drops, restocks, and gentle notes from Cotton Cloud.</p>
          <form className="email-row" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Join</button>
          </form>
        </>
      )}
    </section>
  );
}
