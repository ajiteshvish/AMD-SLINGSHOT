import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  BrainCircuit,
  Settings,
  Key,
  LogOut
} from 'lucide-react';

const AdminSidebar = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Seller Monitoring', path: '/admin/monitoring', icon: <Users size={20} /> },
    { name: 'Risk Alerts', path: '/admin/alerts', icon: <AlertTriangle size={20} /> },
    { name: 'AI Monitoring', path: '/admin/ai', icon: <BrainCircuit size={20} /> },
    { name: 'Model Settings', path: '/admin/model', icon: <Settings size={20} /> },
    { name: 'API Configuration', path: '/admin/api', icon: <Key size={20} /> },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col pt-6 pb-4">
      <div className="px-6 mb-8 flex items-center gap-2">
        <span className="text-primary text-2xl">🛡️</span>
        <h1 className="text-xl font-bold tracking-tight text-white">TRUSTORA <span className="text-accent text-sm">ADMIN</span></h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card-foreground/5'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
