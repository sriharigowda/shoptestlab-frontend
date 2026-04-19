import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await login(username, password);
    setSubmitting(false);
    if (result.success) navigate('/');
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2>Welcome back</h2>
        <p className="subtitle">Sign in to continue shopping</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              data-testid="login-username"
              placeholder="testuser"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="login-password"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
            data-testid="login-submit"
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-creds">
          <strong>🧪 Demo credentials:</strong>
          User: <code>testuser</code> / <code>test123</code><br />
          Admin: <code>admin</code> / <code>admin123</code>
        </div>

        <div className="form-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
