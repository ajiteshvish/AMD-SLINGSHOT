import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GlowButton } from '@/components/ui/pulse-beams';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Home, Sparkles, CreditCard, Users } from 'lucide-react';
import './Navbar.css';

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Features', url: '#features', icon: Sparkles, isHash: true },
  { name: 'Pricing', url: '#pricing', icon: CreditCard, isHash: true },
  { name: 'Our Team', url: '/team', icon: Users },
];

interface NavbarProps {
  logoHeight?: number;
}

const Navbar = ({ logoHeight = 16 }: NavbarProps) => {
  let authContext;
  try {
    authContext = useAuth();
  } catch (e) {
    authContext = { user: null, role: null, signOut: async () => {} };
  }
  
  const { user, role, signOut } = authContext;
  const navigate = useNavigate();
  
  // Responsive logo height scaling - Restored for Impact
  const desktopLogoHeight = logoHeight; // Use the full user-defined height (60)
  const mobileLogoHeight = 25; // Bold and clear on mobile
  
  const currentLogoHeight = typeof window !== 'undefined' && window.innerWidth < 640 ? mobileLogoHeight : desktopLogoHeight;
  const currentPadding = 'pt-8 pl-6 sm:pl-10'; // Keep the breathable padding

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (role === 'admin') navigate('/admin');
    else navigate('/dashboard');
  };

  return (
    <>
      {/* Logo - absolute top left */}
      <Link 
        to="/" 
        className={`absolute top-0 left-0 z-[100] transition-all duration-500 ease-in-out ${currentPadding}`}
      >
        <img 
          src="/logo.png" 
          alt="ReviewDekho" 
          style={{ height: `${currentLogoHeight * 4}px` }} 
          className="w-auto drop-shadow-xl transition-all duration-500 ease-in-out" 
        />
      </Link>

      {/* Tubelight NavBar - centered */}
      <NavBar items={navItems} />

      {/* Auth actions - absolute top right, hidden on mobile */}
      <div className="absolute top-0 right-0 z-[100] transition-all duration-500 ease-in-out hidden sm:flex items-center gap-2 md:gap-3 pt-8 pr-6 sm:pr-10">
        {user ? (
          <>
             <GlowButton onClick={handleDashboardClick} className="text-sm">
               Dashboard
             </GlowButton>
             <GlowButton onClick={() => navigate('/intelligence')} className="text-sm">
               Intelligence
             </GlowButton>
             <GlowButton onClick={handleSignOut} className="text-sm">
               Sign Out
             </GlowButton>
          </>
        ) : (
          <>
            <Link to="/login">
              <GlowButton className="text-sm">
                Sign In
              </GlowButton>
            </Link>
            <Link to="/register">
              <GlowButton className="text-sm">
                Sign Up
              </GlowButton>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;

