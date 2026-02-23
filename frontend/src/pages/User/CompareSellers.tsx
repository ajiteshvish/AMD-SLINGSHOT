import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useSellers } from '../../hooks/useApi';
import { ArrowLeft, ShieldCheck, ShieldAlert, BarChart3, Activity } from 'lucide-react';

const CompareSellers = () => {
  const navigate = useNavigate();

  // Try to find real seller data from hook
  const { data: sellers } = useSellers({ limit: 10 });
  
  // Create mock side-by-side comparison
  const sellerA = sellers?.[0] ? {
    ...sellers[0],
    trustScore: 94,
    riskLevel: 'Low',
    breakdown: { delivery: 98, authenticity: 91, support: 96, refund: 95 }
  } : null;

  const sellerB = sellers?.[1] ? {
    ...sellers[1],
    trustScore: 72,
    riskLevel: 'Medium',
    breakdown: { delivery: 82, authenticity: 65, support: 78, refund: 80 }
  } : null;

  return (
    <div className="flex min-h-screen bg-trustora-bg">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            
            <div className="mb-8">
               <h1 className="text-3xl font-bold tracking-tight text-foreground">Compare Sellers</h1>
               <p className="text-muted-foreground mt-1">Side-by-side trust analysis to help you make standard comparisons.</p>
            </div>

            {!sellerA || !sellerB ? (
                <div className="text-center py-12 text-muted-foreground bg-card border rounded-2xl">
                    Loading comparison subjects...
                </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* SELLER A */}
                <div className="bg-card border-none ring-2 ring-primary/20 shadow-lg shadow-primary/5 p-6 rounded-2xl flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-background border border-border flex justify-center items-center text-2xl shadow-sm mb-4">
                      {sellerA.name.charAt(0)}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-1 text-center">{sellerA.name}</h2>
                    <p className="text-muted-foreground text-sm mb-4">{sellerA.marketplace_name}</p>
                    
                    <div className="bg-background border border-border w-full rounded-2xl p-6 flex flex-col items-center mb-6">
                        <div className="relative mb-3">
                        <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/30" />
                            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" 
                            strokeDasharray={2 * Math.PI * 44}
                            strokeDashoffset={2 * Math.PI * 44 * (1 - (sellerA.trustScore / 100))}
                            className={sellerA.trustScore >= 80 ? 'text-green-500' : 'text-amber-500'} 
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-3xl font-bold text-foreground leading-none">{sellerA.trustScore}</span>
                        </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 bg-green-500/10 text-green-500`}>
                            <ShieldCheck size={12}/> High Trust
                        </span>
                    </div>

                    <div className="w-full space-y-5">
                       <h3 className="font-bold border-b border-border pb-2 flex items-center gap-2">
                           <BarChart3 size={16}/> Trust Breakdown
                       </h3>
                       {[
                           { label: 'Delivery', val: sellerA.breakdown.delivery },
                           { label: 'Authenticity', val: sellerA.breakdown.authenticity },
                           { label: 'Support', val: sellerA.breakdown.support },
                           { label: 'Refunds', val: sellerA.breakdown.refund },
                       ].map(metric => (
                           <div key={metric.label}>
                            <div className="flex justify-between items-end mb-1">
                                <label className="text-xs font-medium text-foreground">{metric.label}</label>
                                <span className="font-bold text-xs text-foreground">{metric.val}%</span>
                            </div>
                            <div className="w-full bg-input rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{width: `${metric.val}%`}}></div>
                            </div>
                           </div>
                       ))}
                    </div>

                    <div className="w-full mt-6 space-y-2">
                       <h3 className="font-bold border-b border-border pb-2 flex items-center gap-2">
                           <Activity size={16}/> Trend
                       </h3>
                       <div className="h-20 bg-input/20 border border-border/50 rounded flex items-center justify-center flex-col text-green-500 text-sm font-medium">
                           +4% Last Month
                       </div>
                    </div>
                </div>

                {/* SELLER B */}
                <div className="bg-card border border-border shadow-sm p-6 rounded-2xl flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-background border border-border flex justify-center items-center text-2xl shadow-sm mb-4">
                      {sellerB.name.charAt(0)}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-1 text-center">{sellerB.name}</h2>
                    <p className="text-muted-foreground text-sm mb-4">{sellerB.marketplace_name}</p>
                    
                    <div className="bg-background border border-border w-full rounded-2xl p-6 flex flex-col items-center mb-6">
                        <div className="relative mb-3">
                        <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/30" />
                            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" 
                            strokeDasharray={2 * Math.PI * 44}
                            strokeDashoffset={2 * Math.PI * 44 * (1 - (sellerB.trustScore / 100))}
                            className={sellerB.trustScore >= 80 ? 'text-green-500' : 'text-amber-500'} 
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-3xl font-bold text-foreground leading-none">{sellerB.trustScore}</span>
                        </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 bg-amber-500/10 text-amber-500`}>
                            <ShieldAlert size={12}/> Medium Risk
                        </span>
                    </div>

                    <div className="w-full space-y-5">
                       <h3 className="font-bold border-b border-border pb-2 flex items-center gap-2">
                           <BarChart3 size={16}/> Trust Breakdown
                       </h3>
                       {[
                           { label: 'Delivery', val: sellerB.breakdown.delivery },
                           { label: 'Authenticity', val: sellerB.breakdown.authenticity },
                           { label: 'Support', val: sellerB.breakdown.support },
                           { label: 'Refunds', val: sellerB.breakdown.refund },
                       ].map(metric => (
                           <div key={metric.label}>
                            <div className="flex justify-between items-end mb-1">
                                <label className="text-xs font-medium text-foreground">{metric.label}</label>
                                <span className="font-bold text-xs text-foreground">{metric.val}%</span>
                            </div>
                            <div className="w-full bg-input rounded-full h-2">
                                <div className="bg-amber-500 h-2 rounded-full" style={{width: `${metric.val}%`}}></div>
                            </div>
                           </div>
                       ))}
                    </div>

                    <div className="w-full mt-6 space-y-2">
                       <h3 className="font-bold border-b border-border pb-2 flex items-center gap-2">
                           <Activity size={16}/> Trend
                       </h3>
                       <div className="h-20 bg-input/20 border border-border/50 rounded flex items-center justify-center flex-col text-amber-500 text-sm font-medium">
                           -2% Last Month
                       </div>
                    </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompareSellers;
