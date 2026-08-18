import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    const result = logIn(form);
    if (result.error) {
      setFormError(result.error);
      return;
    }
    navigate(location.state?.from ?? '/account');
  };

  return (
    <section className="auth-page">
      <h1>Welcome Back</h1>
      <p className="sub">Log in to view your vouchers and account.</p>

      {formError && <div className="auth-error">{formError}</div>}

      <form className="form-fields" onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input type="email" value={form.email} onChange={update('email')} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={update('password')} />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </label>

        <button className="btn-primary auth-submit" type="submit">Log In</button>
      </form>

      <p className="auth-switch">
        New to Cotton Cloud? <Link to="/signup">Create an account</Link>
      </p>
    </section>
  );
}
