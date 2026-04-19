import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getById(id)
      .then(({ data }) => setProduct(data))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    const ok = await addToCart(product.id, quantity);
    if (ok) navigate('/cart');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return null;

  return (
    <div className="container">
      <div className="product-detail">
        <div className="product-detail-image">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name}
                 onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="font-size:6rem; display:flex; align-items:center; justify-content:center; height:100%">🛍️</span>'; }} />
          )}
        </div>

        <div>
          <div className="product-category">{product.category}</div>
          <h1 data-testid="product-detail-name">{product.name}</h1>
          <div className="price" data-testid="product-detail-price">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          <p className="description">{product.description}</p>

          <div className={`product-stock ${product.stock < 10 ? 'low' : ''} ${product.stock === 0 ? 'out' : ''}`} style={{ fontSize: '0.95rem' }}>
            {product.stock === 0 ? 'Out of stock' :
             product.stock < 10 ? `Only ${product.stock} left` :
             `✓ In stock (${product.stock} available)`}
          </div>

          <div className="qty-selector">
            <span>Quantity:</span>
            <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="qty-decrease">−</button>
            <span data-testid="qty-value" style={{ minWidth: 30, textAlign: 'center' }}>{quantity}</span>
            <button className="qty-btn" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    data-testid="qty-increase">+</button>
          </div>

          <button
            className="btn btn-primary btn-block"
            onClick={handleAdd}
            disabled={product.stock === 0}
            data-testid="add-to-cart-btn"
          >
            {product.stock === 0 ? 'Out of stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
