import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(formData);
      navigate('/builder');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 flex items-center justify-center bg-transparent px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl p-16 md:p-24 rounded-[3.5rem] backdrop-blur-3xl border shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        style={{ 
          background: 'rgba(18, 18, 18, 0.98)', 
          borderColor: 'rgba(255, 255, 255, 0.08)',
          minHeight: '750px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center" style={{ color: 'var(--text-primary)', letterSpacing: '-0.05em' }}>
            Join ResuméCraft
          </h2>
          <p className="text-center mb-12 text-lg opacity-70" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            Start building your professional future today.
          </p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '24px', padding: '0 8px' }}>
              <label style={{ fontSize: '13px', marginBottom: '12px' }}>Username</label>
              <input
                type="text"
                required
                style={{ padding: '16px 20px', borderRadius: '12px', fontSize: '15px' }}
                placeholder="johndoe"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '24px', padding: '0 8px' }}>
              <label style={{ fontSize: '13px', marginBottom: '12px' }}>Email Address</label>
              <input
                type="email"
                required
                style={{ padding: '16px 20px', borderRadius: '12px', fontSize: '15px' }}
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '40px', padding: '0 8px' }}>
              <label style={{ fontSize: '13px', marginBottom: '12px' }}>Password</label>
              <input
                type="password"
                required
                style={{ padding: '16px 20px', borderRadius: '12px', fontSize: '15px' }}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div style={{ padding: '0 8px' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-5"
                style={{ fontSize: '18px', borderRadius: '12px' }}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-8 text-center text-base" style={{ color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '700' }}>Log In</Link>
        </p>
      </motion.div>
    </div>
  );
}
