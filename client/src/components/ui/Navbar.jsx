import { NavLink } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={20} />
          ResuméCraft
        </span>
      </NavLink>
      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/builder"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Builder
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Saved Resumes
        </NavLink>

        {user ? (
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              Hi, <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{user.username}</span>
            </span>
            <button
              onClick={logout}
              className="btn-ghost"
              style={{ padding: '6px 14px', fontSize: '13px' }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
            <NavLink
              to="/login"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              Get Started
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
