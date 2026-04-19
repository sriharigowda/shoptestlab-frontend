import { useNavigate } from 'react-router-dom';

const emojiMap = {
  'Electronics': '📱', 'Footwear': '👟', 'Clothing': '👕', 'Books': '📚'
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const stockLabel = () => {
    if (product.stock === 0) return { label: 'Out of stock', cls: 'out' };
    if (product.stock < 10) return { label: `Only ${product.stock} left`, cls: 'low' };
    return { label: 'In stock', cls: '' };
  };
  const stock = stockLabel();

  return (
    <div
      className="product-card"
      data-testid={`product-${product.id}`}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="product-image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name}
               onError={(e) => e.target.style.display = 'none'} />
        ) : (
          <span>{emojiMap[product.category] || '🛍️'}</span>
        )}
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <div className="product-name" data-testid={`product-name-${product.id}`}>
          {product.name}
        </div>
        <div className="product-price" data-testid={`product-price-${product.id}`}>
          ₹{product.price.toLocaleString('en-IN')}
        </div>
        <div className={`product-stock ${stock.cls}`}>{stock.label}</div>
      </div>
    </div>
  );
}
