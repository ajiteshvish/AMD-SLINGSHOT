import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const TopBar = ({ onSearch }: { onSearch?: (term: string) => void }) => {
  const { user } = useAuth();
  
  return (
    <header className="h-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0 w-full">
      <div className="flex items-center justify-between h-full px-8">
        {/* Global Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search for a seller..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full bg-input/50 border border-border rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
            />
          </div>
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
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-muted-foreground leading-none">
                Consumer Profile
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
