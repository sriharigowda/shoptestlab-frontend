import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    productAPI.getAll().then(({ data }) => setFeatured(data.slice(0, 4)));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>
            Curated goods,<br />
            <em>honestly priced.</em>
          </h1>
          <p>
            A thoughtful selection of electronics, fashion, and books —
            delivered fast, tested thoroughly. Your QA learning playground, live.
          </p>
          <Link to="/products" className="btn btn-primary" data-testid="hero-shop-btn">
            Browse Collection →
          </Link>
        </div>
      </section>

      <div className="container">
        <div className="page-header">
          <h2>Featured this week</h2>
          <p>Four picks from our shelves.</p>
        </div>

        <div className="product-grid" data-testid="featured-grid">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}
