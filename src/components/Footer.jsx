import Logo from './Logo';

export default function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <Logo width={30} height={22} stroke="#c9a89a" bg="#f7f3ee" />
        <span className="wordmark">COTTON CLOUD</span>
      </div>
      <span>© 2026 Cotton Cloud. All rights reserved.</span>
      <div className="footer-links">
        <a href="#">Instagram</a>
        <a href="#">TikTok</a>
        <a href="#">Shopify</a>
      </div>
    </footer>
  );
}
