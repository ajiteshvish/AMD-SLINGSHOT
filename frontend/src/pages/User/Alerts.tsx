import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { ArrowLeft, Bell, BellRing, ShieldAlert } from 'lucide-react';

const Alerts = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-trustora-bg">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <div className="mb-8">
               <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                 <BellRing className="text-primary"/> Your Alerts
               </h1>
               <p className="text-muted-foreground mt-1">Review notifications for tracked sellers and risk indicators.</p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
                    <h2 className="font-semibold flex items-center gap-2"><ShieldAlert size={18} className="text-red-500"/> Critical Risk Alerts</h2>
                    <span className="text-xs bg-red-500/10 text-red-500 font-bold px-2.5 py-1 rounded-full">2 New</span>
                </div>
                <div className="divide-y divide-border">
                    <div className="p-6 hover:bg-muted/10 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-foreground">Score Drop Warning</h3>
                            <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Seller "ElectroWorld" has experienced a 15% drop in Trust Score over the last 48 hours.</p>
                        <button className="mt-3 text-sm text-primary font-medium hover:underline">View Seller Profile →</button>
                    </div>
                    <div className="p-6 hover:bg-muted/10 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-foreground">Manipulation Detected</h3>
                            <span className="text-xs text-muted-foreground">1 day ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">We detected a high volume of unusually positive reviews for "BargainBooks". Risk status elevated.</p>
                        <button className="mt-3 text-sm text-primary font-medium hover:underline">View Seller Profile →</button>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
                    <h2 className="font-semibold flex items-center gap-2"><Bell size={18} className="text-primary"/> Followed Sellers</h2>
                </div>
                <div className="p-12 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <Bell size={48} className="text-border mb-4"/>
                    <p>No recent activity for sellers you track.</p>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Alerts;
