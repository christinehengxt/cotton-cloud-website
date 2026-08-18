import Logo from './Logo';

export default function Nav() {
  return (
    <nav>
      <div className="nav-brand">
        <Logo width={32} height={48} stroke="#8a6c5e" />
        <div className="nav-wordmark">
          <span className="name">Cotton Cloud</span>
          <span className="tagline">move softly · feel beautiful</span>
        </div>
      </div>
      <ul className="nav-links">
        <li><a href="#collection">Collection</a></li>
        <li><a href="#about">Story</a></li>
        <li><a href="#newsletter">Journal</a></li>
      </ul>
      <button className="nav-cta">Shop Now</button>
    </nav>
  );
}
