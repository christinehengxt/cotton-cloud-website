import { Link } from 'react-router-dom';
import Logo from './Logo';
import BagIcon from './BagIcon';
import AccountIcon from './AccountIcon';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const { count } = useCart();
  const { user } = useAuth();

  return (
    <nav>
      <Link to="/" className="nav-brand">
        <Logo width={44} height={30} stroke="#8a6c5e" />
        <div className="nav-wordmark">
          <span className="name">Cotton Cloud</span>
          <span className="tagline">move softly · feel beautiful</span>
        </div>
      </Link>
      <ul className="nav-links">
        <li><Link to="/collection">Collection</Link></li>
        <li><Link to="/best-sellers">Best Sellers</Link></li>
      </ul>
      <div className="nav-actions">
        <Link to="/checkout" className="nav-cta nav-cart" aria-label={`Bag${count > 0 ? `, ${count} items` : ''}`}>
          <BagIcon />
          {count > 0 && <span className="nav-cart-badge">{count}</span>}
        </Link>
        <Link
          to={user ? '/account' : '/login'}
          className="nav-cta nav-account"
          aria-label={user ? `Account, ${user.name}` : 'Log in'}
        >
          <AccountIcon />
        </Link>
      </div>
    </nav>
  );
}
