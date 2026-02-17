import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  // Use try-catch or safe access because useAuth might be used outside AuthProvider in some edge cases (though shouldn't happen in updated App)
  // But purely for safety during migration
  let authContext;
  try {
    authContext = useAuth();
  } catch (e) {
    authContext = { user: null, role: null, signOut: async () => {} };
  }
  
  const { user, role, signOut } = authContext;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (role === 'admin') navigate('/admin');
    else navigate('/dashboard');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <div className="brand-icon"></div>
        <span>Trustora</span>
      </Link>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="#features">Features</a>
        <a href="#testimonials">Testimonials</a>
      </div>
      
      <div className="nav-actions">
        {user ? (
          <>
             <button onClick={handleDashboardClick} className="btn-signin">Dashboard</button>
             <button onClick={() => navigate('/intelligence')} className="btn-signin ml-2 bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white hover:opacity-90 transition-opacity">
               Intelligence
             </button>
             <button onClick={handleSignOut} className="btn-signup">Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn-signin hover-scale">Sign In</button></Link>
            <Link to="/register"><button className="btn-signup hover-scale">Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
