import { Bell, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const AdminTopBar = () => {
  const { user } = useAuth();
  
  return (
    <header className="h-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0 w-full">
      <div className="flex items-center justify-between h-full px-8">
        
        {/* Placeholder for symmetry / Breadcrumbs */}
        <div className="flex-1 max-w-xl flex items-center gap-2 text-sm text-muted-foreground">
           <span className="hidden md:inline-block">Admin Console /</span> <span className="text-foreground font-medium">Dashboard</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-8">
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-card">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-foreground leading-none mb-1">
                {user?.email?.split('@')[0] || 'Admin'}
              </p>
              <p className="text-xs text-primary leading-none font-bold">
                Platform Administrator
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;
