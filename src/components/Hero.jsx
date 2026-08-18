import Logo from './Logo';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="hero-eyebrow">New Arrivals — Spring 2026</p>
        <h1 className="hero-title">
          Softness<br />is a form<br />of <em>strength</em>
        </h1>
        <p className="hero-body">
          Yoga wear made for the way you actually move — gentle on your skin,
          grounded in nature, beautiful in the quiet moments.
        </p>
        <div className="hero-actions">
          <a href="#collection" className="btn-primary">Shop Collection</a>
          <a href="#about" className="btn-ghost">Our Story</a>
        </div>
      </div>
      <div className="hero-visual">
        <Logo width={320} height={235} stroke="#3d2e28" bg="#f7f3ee" opacity={0.12} />
      </div>
    </section>
  );
}
