import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, cartTotal, updateQty, removeItem, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="loading">Loading cart...</div>;

  if (!user) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Please login to view your cart</h3>
          <Link to="/login" className="btn btn-primary" style={{ marginTop: 16 }}>Login</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-state" data-testid="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add some products to get started.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Products</Link>
        </div>
      </div>
    );
  }

  const shipping = cartTotal > 5000 ? 0 : 150;
  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + shipping + tax;

  return (
    <div className="container">
      <div className="page-header">
        <h2>Your Cart</h2>
        <p>{items.length} {items.length === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="cart-layout">
        <div data-testid="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item" data-testid={`cart-item-${item.id}`}>
              <div className="cart-item-image">
                {item.product.imageUrl && <img src={item.product.imageUrl} alt="" />}
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.product.name}</div>
                <div style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', marginBottom: 8 }}>
                  ₹{item.product.price.toLocaleString('en-IN')} each
                </div>
                <div className="qty-selector" style={{ margin: 0 }}>
                  <button className="qty-btn" onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                          data-testid={`qty-dec-${item.id}`}>−</button>
                  <span data-testid={`qty-${item.id}`} style={{ minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity + 1)}
                          data-testid={`qty-inc-${item.id}`}>+</button>
                  <button onClick={() => removeItem(item.id)} className="btn btn-danger"
                          style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem', marginLeft: '0.5rem' }}
                          data-testid={`remove-${item.id}`}>
                    Remove
                  </button>
                </div>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }} data-testid={`subtotal-${item.id}`}>
                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
          <div className="cart-row">
            <span>Subtotal</span>
            <span data-testid="summary-subtotal">₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="cart-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
          </div>
          <div className="cart-row">
            <span>GST (18%)</span>
            <span>₹{tax.toLocaleString('en-IN')}</span>
          </div>
          <div className="cart-row total">
            <span>Total</span>
            <span data-testid="summary-total">₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: '1.5rem' }}
            onClick={() => navigate('/checkout')}
            data-testid="checkout-btn"
          >
            Proceed to Checkout →
          </button>
          {cartTotal < 5000 && (
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginTop: '0.75rem', textAlign: 'center' }}>
              Add ₹{(5000 - cartTotal).toLocaleString('en-IN')} more for FREE shipping!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
