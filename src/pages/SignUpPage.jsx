import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', birthday: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'At least 6 characters';
    if (!form.birthday) e.birthday = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    const result = signUp(form);
    if (result.error) {
      setFormError(result.error);
      return;
    }
    navigate('/account');
  };

  return (
    <section className="auth-page">
      <h1>Join Cotton Cloud</h1>
      <p className="sub">Sign up for early access, birthday treats, and a first-order discount.</p>

      {formError && <div className="auth-error">{formError}</div>}

      <form className="form-fields" onSubmit={handleSubmit} noValidate>
        <label>
          Full name
          <input type="text" value={form.name} onChange={update('name')} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>
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
        <label>
          Birthday
          <input type="date" value={form.birthday} onChange={update('birthday')} />
          {errors.birthday && <span className="field-error">{errors.birthday}</span>}
        </label>

        <button className="btn-primary auth-submit" type="submit">Create Account</button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </section>
  );
}
