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

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
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
    <>


      {/* Tubelight NavBar - centered */}
      <NavBar items={navItems} />

      {/* Auth actions */}
      <div className="absolute top-[80px] sm:top-0 left-1/2 sm:left-auto sm:right-0 -translate-x-1/2 sm:translate-x-0 z-[100] transition-all duration-500 ease-in-out flex items-center gap-2 md:gap-3 sm:pt-8 sm:pr-6 md:pr-10 w-max">
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

