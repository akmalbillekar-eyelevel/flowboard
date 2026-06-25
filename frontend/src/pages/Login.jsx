import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F5F5F5',
    }}>
      <div style={{ width: '100%', maxWidth: 360, padding: '0 16px' }}>

        {/* Brand mark */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, background: '#111111',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: '-0.5px', marginBottom: 14,
          }}>
            FB
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 3, letterSpacing: '-0.5px' }}>
            FlowBoard
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, margin: '0 0 6px', letterSpacing: '-0.1px' }}>
            by EyeLevel Growth Studio
          </p>
          <p style={{ color: '#ADADAD', fontSize: 12, margin: 0, lineHeight: 1.5 }}>
            Client social media management — plan, schedule, and approve content across all platforms.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          padding: '32px 28px',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <Label style={{ fontSize: 13, color: 'var(--text)', letterSpacing: '-0.15px' }}>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@eyelevelstudio.in"
                required
                style={{ borderRadius: 10, fontSize: 15 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <Label style={{ fontSize: 13, color: 'var(--text)', letterSpacing: '-0.15px' }}>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ borderRadius: 10, fontSize: 15 }}
              />
            </div>

            {error && (
              <p style={{
                color: 'var(--text)',
                fontSize: 13,
                margin: 0,
                padding: '9px 12px',
                background: '#F0F0F0',
                borderRadius: 8,
                letterSpacing: '-0.15px',
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="primary-button"
              style={{ width: '100%', justifyContent: 'center', marginTop: 6, fontSize: 15, padding: '11px 21px' }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--muted-2)', fontSize: 12, marginTop: 18, letterSpacing: '-0.1px' }}>
          EyeLevel Growth Studio
        </p>
      </div>
    </div>
  );
}
