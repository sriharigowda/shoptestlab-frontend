import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo" data-testid="logo">
          ShopTestLab<span className="dot">.</span>
        </Link>

        <div className="nav-links">
          <Link to="/products" data-testid="nav-products">Shop</Link>
          {user && <Link to="/orders" data-testid="nav-orders">Orders</Link>}
          <Link to="/cart" data-testid="nav-cart">
            Cart
            {cartCount > 0 && <span className="cart-badge" data-testid="cart-count">{cartCount}</span>}
          </Link>

          {user ? (
            <>
              <span style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }} data-testid="user-greeting">
                Hi, {user.username}
              </span>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }} data-testid="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" data-testid="nav-login">Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }} data-testid="nav-register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
