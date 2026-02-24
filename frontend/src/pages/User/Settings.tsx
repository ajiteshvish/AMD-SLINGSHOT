import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { ArrowLeft, Settings as SettingsIcon, Bell, Shield } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-reviewdekho-bg">
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
                 <SettingsIcon className="text-primary"/> Account Settings
               </h1>
               <p className="text-muted-foreground mt-1">Manage your ReviewDekho preferences and security.</p>
            </div>

            <div className="space-y-6">
                {/* Profile Settings */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Shield size={18} className="text-primary"/> Privacy Controls</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground text-sm">Anonymous Trust Reporting</p>
                                <p className="text-xs text-muted-foreground">Submit seller risk flags anonymously.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Bell size={18} className="text-primary"/> Notification Preferences</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground text-sm">Critical Risk Emails</p>
                                <p className="text-xs text-muted-foreground">Receive emails when tracked sellers drop in score.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&quot;&quot;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground text-sm">Weekly Digest</p>
                                <p className="text-xs text-muted-foreground">Get a weekly summary of marketplace trends.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&quot;&quot;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
