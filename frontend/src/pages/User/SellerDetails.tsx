
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useSeller, useAnalyzeSeller } from '../../hooks/useApi';
import { ArrowLeft, ShieldCheck, ShieldAlert, BarChart3, AlertCircle, ExternalLink, Activity, ArrowRightLeft, RefreshCw, Cpu } from 'lucide-react';
import './SellerDetails.css';

const SellerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, refetch } = useSeller(id);
  const { analyze, analyzing } = useAnalyzeSeller();

  const handleAiScan = async () => {
    if (!id) return;
    try {
      await analyze(id);
      refetch(); // Reload the UI with new scored metrics
    } catch (err) {
      console.error("AI Analysis failed", err);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex min-h-screen bg-reviewdekho-bg">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p>Loading seller trust profile...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const { seller, trust_score } = data;
  
  // Format the data to match the UI bindings
  const displayScore = trust_score?.overall_score || 0;
  const riskLevel = displayScore >= 80 ? 'Low' : displayScore >= 60 ? 'Medium' : 'High';
  const riskReason = displayScore >= 80 ? 'No significant risks detected in recent seller behavior.' 
    : displayScore >= 60 ? 'Moderate anomalies detected. Proceed with standard caution.' 
    : 'High risk flags triggered by AI behavior analysis.';

  return (
    <div className="flex min-h-screen bg-reviewdekho-bg">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Header / Nav */}
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
               <div>
                 <div className="flex items-center gap-3 mb-2">
                   <h1 className="text-3xl font-bold tracking-tight text-foreground">{seller.name}</h1>
                   <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-primary/20">
                     <ShieldCheck size={14} /> Verified Seller
                   </span>
                 </div>
                 <p className="text-muted-foreground">Marketplace: {seller.marketplace_name}</p>
               </div>
               
               {/* TRUST SCORE CARD */}
               <div className="bg-card border border-border shadow-sm p-5 rounded-2xl flex items-center gap-5">
                 <div className="relative">
                   <svg className="w-20 h-20 transform -rotate-90">
                     <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-muted/30" />
                     <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" 
                       strokeDasharray={2 * Math.PI * 36}
                       strokeDashoffset={2 * Math.PI * 36 * (1 - (displayScore / 100))}
                       className={displayScore >= 80 ? 'text-green-500' : displayScore >= 60 ? 'text-amber-500' : 'text-red-500'} 
                     />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center flex-col">
                     <span className="text-2xl font-bold text-foreground leading-none">{displayScore}</span>
                   </div>
                 </div>
                 <div>
                   <p className="text-sm text-muted-foreground font-medium mb-1">Trust Score</p>
                   <div className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                     riskLevel === 'Low' ? 'bg-green-500/10 text-green-500' : 
                     riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 
                     'bg-red-500/10 text-red-500'
                   }`}>
                     {riskLevel === 'Low' ? <ShieldCheck size={12}/> : <ShieldAlert size={12}/>}
                     {riskLevel} Risk
                   </div>
                   
                   <button 
                     onClick={handleAiScan}
                     disabled={analyzing}
                     className="mt-3 text-xs font-bold px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-md transition-colors flex items-center justify-center w-full disabled:opacity-50"
                   >
                     {analyzing ? (
                       <><RefreshCw size={12} className="mr-1.5 animate-spin" /> Analyzing...</>
                     ) : (
                       <><Cpu size={12} className="mr-1.5" /> AMD ONNX Rescan</>
                     )}
                   </button>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Column */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* TRUST BREAKDOWN SECTION */}
                <section className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <BarChart3 size={20} className="text-primary" /> Trust Score Breakdown
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-sm font-medium text-foreground">Delivery Reliability</label>
                        <span className="font-bold text-sm text-foreground">{trust_score?.delivery_reliability || 0}%</span>
                      </div>
                      <div className="w-full bg-input rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{width: `${trust_score?.delivery_reliability || 0}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                          Review Authenticity <span className="bg-primary/10 text-primary text-[10px] px-1.5 rounded font-bold border border-primary/20">AI Scored</span>
                        </label>
                        <span className="font-bold text-sm text-foreground">{trust_score?.review_authenticity || 0}%</span>
                      </div>
                      <div className="w-full bg-input rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{width: `${trust_score?.review_authenticity || 0}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-sm font-medium text-foreground">Refund Fairness</label>
                        <span className="font-bold text-sm text-foreground">{trust_score?.refund_fairness || 0}%</span>
                      </div>
                      <div className="w-full bg-input rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{width: `${trust_score?.refund_fairness || 0}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-sm font-medium text-foreground">Customer Support</label>
                        <span className="font-bold text-sm text-foreground">{trust_score?.customer_support || 0}%</span>
                      </div>
                      <div className="w-full bg-input rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{width: `${trust_score?.customer_support || 0}%`}}></div>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* HISTORICAL TRUST TREND */}
                <section className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                   <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                     <Activity size={20} className="text-primary" /> Trust Trend (30 Days)
                   </h2>
                   <div className="h-48 rounded-xl bg-input/20 border border-border/50 flex items-center justify-center flex-col relative overflow-hidden">
                     <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
                     <Activity className="text-primary/40 w-12 h-12 mb-2" />
                     <span className="text-sm font-medium text-green-500bg-green-500/10 px-3 py-1 rounded-full text-green-500 border border-green-500/20">Score Improved +3%</span>
                   </div>
                </section>
              </div>

              {/* Sidebar Column */}
              <div className="space-y-6">
                 {/* RISK EXPLANATION BOX */}
                 <div className={`p-6 rounded-2xl border ${
                   riskLevel === 'Low' ? 'bg-green-500/5 border-green-500/20' : 
                   riskLevel === 'Medium' ? 'bg-amber-500/5 border-amber-500/20' : 
                   'bg-red-500/5 border-red-500/20'
                 }`}>
                   <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                     riskLevel === 'Low' ? 'text-green-500' : 
                     riskLevel === 'Medium' ? 'text-amber-500' : 
                     'text-red-500'
                   }`}>
                     <AlertCircle size={20} /> Risk Assessment
                   </h3>
                   <p className="text-sm leading-relaxed text-muted-foreground">{riskReason}</p>
                 </div>
                 
                 {/* ACTIONS */}
                 <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-3">
                   <button className="w-full bg-accent/10 hover:bg-accent/20 text-accent font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                     <ArrowRightLeft size={18} /> Compare Seller
                   </button>
                   <button className="w-full border border-border hover:bg-muted text-foreground font-medium py-3 px-4 rounded-xl transition-colors">
                     Set Alert Notification
                   </button>
                   <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg shadow-primary/20">
                     Visit Store <ExternalLink size={18} />
                   </button>
                 </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDetails;
