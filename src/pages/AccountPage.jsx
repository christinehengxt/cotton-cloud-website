import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEligibleVouchers } from '../data/vouchers';

export default function AccountPage() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;

  const vouchers = getEligibleVouchers(user);

  const handleLogOut = () => {
    logOut();
    navigate('/');
  };

  return (
    <section className="account-page">
      <h1>Hi, {user.name.split(' ')[0]}</h1>
      <p className="sub">{user.email}</p>

      <div className="account-block">
        <h2>Your Details</h2>
        <div className="account-info">
          <div className="account-info-row">
            <span>Full name</span>
            <span>{user.name}</span>
          </div>
          <div className="account-info-row">
            <span>Birthday</span>
            <span>{new Date(user.birthday).toLocaleDateString('en-MY', { day: 'numeric', month: 'long' })}</span>
          </div>
          <div className="account-info-row">
            <span>Orders placed</span>
            <span>{user.hasOrdered ? 'Yes' : 'None yet'}</span>
          </div>
        </div>
      </div>

      <div className="account-block">
        <h2>Your Vouchers</h2>
        {vouchers.length > 0 ? (
          <div className="voucher-list">
            {vouchers.map((v) => (
              <div className="voucher-card" key={v.code}>
                <div>
                  <span className="voucher-card-label">{v.label}</span>
                  <span className="voucher-card-code">{v.code}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="voucher-empty">
            No vouchers right now — check back on your birthday month, or after your first order.
          </p>
        )}
      </div>

      <button className="logout-btn" type="button" onClick={handleLogOut}>
        Log Out
      </button>
    </section>
  );
}
