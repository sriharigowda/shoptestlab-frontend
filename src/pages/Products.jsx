import { useEffect, useState } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Electronics', 'Footwear', 'Clothing', 'Books'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productAPI.getAll()
      .then(({ data }) => { setProducts(data); setFiltered(data); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = products;
    if (category !== 'All') result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [category, search, products]);

  return (
    <div className="container">
      <div className="page-header">
        <h2>All Products</h2>
        <p>{filtered.length} items</p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="search-input"
        />
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-pill ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
            data-testid={`category-${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="product-grid" data-testid="products-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
