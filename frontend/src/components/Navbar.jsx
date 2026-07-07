import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, BookOpen, User, Shield } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav style={styles.nav} className="glass-panel animate-fade-in">
      <div style={styles.brand} onClick={() => navigate('/')}>
        <div style={styles.logoContainer}>
          <BookOpen size={24} color="#6366f1" />
        </div>
        <span style={styles.title}>Study<span style={{ color: '#6366f1' }}>Buddy</span></span>
      </div>

      <div style={styles.navLinks}>
        {user.role === 'admin' && (
          <Link to="/admin" style={styles.link} className="glass-panel">
            <Shield size={16} />
            Admin Panel
          </Link>
        )}
        <div style={styles.profile} className="glass-panel">
          <User size={16} color="#10b981" />
          <span style={styles.name}>{user.name}</span>
          <span style={styles.roleBadge}>{user.role}</span>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary" style={styles.logoutBtn}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 2rem',
    margin: '1.5rem auto',
    maxWidth: '1200px',
    width: '95%',
    borderRadius: '16px',
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
  },
  logoContainer: {
    background: 'rgba(99, 102, 241, 0.15)',
    padding: '0.5rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(99, 102, 241, 0.25)',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    color: '#f3f4f6',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
  },
  name: {
    fontWeight: '500',
  },
  roleBadge: {
    fontSize: '0.7rem',
    background: 'rgba(255,255,255,0.08)',
    padding: '0.15rem 0.4rem',
    borderRadius: '6px',
    textTransform: 'uppercase',
    color: '#9ca3af',
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
  }
};

export default Navbar;
