import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', fullName: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (form.username.length < 3) e.username = 'Username must be at least 3 characters';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const result = await register(form);
    setSubmitting(false);
    if (result.success) navigate('/');
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2>Create account</h2>
        <p className="subtitle">Join ShopTestLab today</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={set('fullName')}
              placeholder="Srihari Gowda"
              data-testid="reg-fullname"
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={set('username')}
              placeholder="srihari123"
              data-testid="reg-username"
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="srihari@example.com"
              data-testid="reg-email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="••••••••"
              data-testid="reg-password"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
            data-testid="reg-submit"
          >
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="form-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
