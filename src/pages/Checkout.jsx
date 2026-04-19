import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, refresh } = useCart();
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const shipping = cartTotal > 5000 ? 0 : 150;
  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + shipping + tax;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error('Please enter shipping address');
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await orderAPI.checkout({ shippingAddress: address });
      await refresh();
      toast.success(`Order #${data.id} placed successfully!`);
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add items before checking out.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2>Checkout</h2>
        <p>Review your order and confirm delivery details.</p>
      </div>

      <div className="cart-layout">
        <form onSubmit={handleCheckout}>
          <div className="cart-summary" style={{ position: 'static' }}>
            <h3 style={{ marginBottom: '1rem' }}>Shipping Address</h3>
            <div className="form-group">
              <label>Full address</label>
              <textarea
                rows="4"
                placeholder="Street, City, State, Pincode"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                data-testid="address-input"
              />
            </div>
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Payment Method</h3>
            <div style={{ padding: '1rem', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
              💵 Cash on Delivery (Demo - no real payment)
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ marginTop: '1.5rem' }}
              disabled={submitting}
              data-testid="place-order-btn"
            >
              {submitting ? 'Placing order...' : `Place Order · ₹${total.toLocaleString('en-IN')}`}
            </button>
          </div>
        </form>

        <div className="cart-summary">
          <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
          {items.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontSize: '0.9rem' }}>
              <span>{i.product.name} × {i.quantity}</span>
              <span>₹{(i.product.price * i.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', margin: '0.5rem 0', paddingTop: '0.5rem' }}>
            <div className="cart-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
            <div className="cart-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            <div className="cart-row"><span>GST</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
            <div className="cart-row total">
              <span>Total</span>
              <span data-testid="checkout-total">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
