import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';

const statusBadge = (status) => {
  const map = {
    CONFIRMED: 'confirmed', PENDING: 'pending',
    SHIPPED: 'shipped', DELIVERED: 'confirmed', CANCELLED: 'pending'
  };
  return map[status] || 'pending';
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    orderAPI.getAll()
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="container">
        <div className="empty-state" data-testid="empty-orders">
          <h3>No orders yet</h3>
          <p>Your order history will appear here.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: 16 }}>Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2>Your Orders</h2>
        <p>{orders.length} {orders.length === 1 ? 'order' : 'orders'} placed</p>
      </div>

      <div style={{ paddingBottom: '4rem' }} data-testid="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card" data-testid={`order-${order.id}`}>
            <div className="order-header">
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>
                  Order #{order.id}
                </div>
                <div style={{ color: 'var(--ink-soft)', fontSize: '0.875rem' }}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span
                  className={`badge ${statusBadge(order.status)}`}
                  data-testid={`order-status-${order.id}`}
                >
                  {order.status}
                </span>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent)' }}
                     data-testid={`order-total-${order.id}`}>
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div style={{ color: 'var(--ink-soft)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              📍 {order.shippingAddress}
            </div>

            <button
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}
              data-testid={`order-expand-${order.id}`}
            >
              {expanded === order.id ? '▲ Hide items' : '▼ View items'}
            </button>

            {expanded === order.id && order.orderItems && (
              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}
                   data-testid={`order-items-${order.id}`}>
                {order.orderItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--bg-alt)' }}>
                    <div>
                      <span style={{ fontWeight: 500 }}>{item.product?.name || `Product #${item.product?.id}`}</span>
                      <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem', marginLeft: 8 }}>× {item.quantity}</span>
                    </div>
                    <div style={{ fontWeight: 600 }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem', fontWeight: 700 }}>
                  Total: ₹{order.totalAmount.toLocaleString('en-IN')}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
