import { useReveal } from '../hooks/useReveal';

const VALUES = [
  {
    title: 'Gentle fabrics',
    body: 'Every material chosen for how it feels against your skin during practice and rest.',
  },
  {
    title: 'Mindful making',
    body: "Small batches, thoughtful choices — we'd rather do less and do it beautifully.",
  },
  {
    title: 'For every body',
    body: 'Soft silhouettes designed to celebrate movement, not define it.',
  },
  {
    title: 'A little magic',
    body: "That feeling when your outfit matches your energy? That's what we make for.",
  },
];

export default function About() {
  const ref = useReveal();

  return (
    <div className="about-wrap">
      <section className="about reveal" id="about" ref={ref}>
        <div className="about-text">
          <span className="section-eyebrow" style={{ color: 'var(--sage)' }}>
            Our story
          </span>
          <h2>
            Started with two<br />pieces and a lot<br />of <em>hope</em>
          </h2>
          <p>
            Cotton Cloud started with two pieces of clothing and a lot of
            hope. I bought my first sports bra and skirt, tried them on, and
            felt something shift — not just the fit, but the possibility.
          </p>
          <p style={{ marginTop: '1rem' }}>
            That women who move, who breathe, who practice — deserve clothes
            that feel like a soft hug. So I started making that feeling
            available for other people too.
          </p>
          <a href="#" className="btn-ghost-light">Read Our Story</a>
        </div>
        <div className="about-values">
          {VALUES.map((value) => (
            <div className="value" key={value.title}>
              <h4>{value.title}</h4>
              <p>{value.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
