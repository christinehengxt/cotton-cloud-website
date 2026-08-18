import { useReveal } from '../hooks/useReveal';

export default function Philosophy() {
  const ref = useReveal();

  return (
    <section className="philosophy reveal" ref={ref}>
      <span className="section-eyebrow">Our philosophy</span>
      <h2>
        Clothes that feel like<br />a <em>soft morning</em>
      </h2>
      <p>
        Cotton Cloud was born from a simple feeling — that what you wear to
        practice should feel as intentional as the practice itself. Soft,
        natural, made for you.
      </p>
      <div className="rule">
        <div className="rule-line"></div>
        <span className="rule-mark">✦</span>
        <div className="rule-line"></div>
      </div>
    </section>
  );
}
