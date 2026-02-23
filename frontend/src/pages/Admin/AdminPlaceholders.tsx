import { useState, useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminTopBar from './components/AdminTopBar';
import { 
  Activity, Cpu, Zap, ShieldCheck, Database, Brain, 
  AlertTriangle, ShieldAlert, Eye, RefreshCw, Search,
  Settings, Sliders, Key, Webhook, Copy, CheckCircle2,
  ArrowUpRight, XCircle, Clock
} from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

// ─────────────────────────────────────────────────────
// SELLER MONITORING PANEL
// ─────────────────────────────────────────────────────
export const SellerMonitoring = () => {
  const [sellers, setSellers] = useState<any[]>([]);
  const [scores, setScores] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [batchResult, setBatchResult] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/sellers?limit=50`);
        const data = await res.json();
        setSellers(data || []);

        // Fetch scores for each seller
        const scoreMap: Record<string, any> = {};
        for (const s of (data || []).slice(0, 20)) {
          try {
            const detail = await fetch(`${API_BASE}/sellers/${s.id}`);
            const d = await detail.json();
            if (d?.trust_score) scoreMap[s.id] = d.trust_score;
          } catch {}
        }
        setScores(scoreMap);
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAnalyzeAll = async () => {
    setAnalyzing(true);
    setBatchResult(null);
    try {
      const res = await fetch(`${API_BASE}/sellers/analyze-all`, { method: 'POST' });
      const data = await res.json();
      setBatchResult(data);
      // Refresh scores
      window.location.reload();
    } catch (err) {
      setBatchResult({ message: 'Batch analysis failed', processed: 0, failed: 0 });
    }
    setAnalyzing(false);
  };

  const filteredSellers = sellers.filter(s => {
    const matchesFilter = filter === 'all' || s.status === filter;
    const matchesSearch = !searchTerm || s.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-trustora-bg">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <AdminTopBar />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                  <Eye className="text-primary" size={28} /> Seller Monitoring
                </h1>
                <p className="text-muted-foreground mt-1">Track, analyze, and manage all marketplace sellers.</p>
              </div>
              <button 
                onClick={handleAnalyzeAll}
                disabled={analyzing}
                className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20"
              >
                {analyzing ? <><RefreshCw size={16} className="animate-spin"/> Analyzing All...</> : <><Cpu size={16} /> Analyze All Sellers</>}
              </button>
            </div>

            {batchResult && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-sm font-medium">
                ✅ {batchResult.message}
              </div>
            )}

            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search sellers..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
              {['all', 'active', 'under_review', 'suspended'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${filter === f ? 'bg-primary text-white' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}
                >
                  {f === 'all' ? 'All' : f === 'under_review' ? 'Under Review' : f.charAt(0).toUpperCase() + f.slice(1)} 
                  {f === 'all' ? ` (${sellers.length})` : ` (${sellers.filter(s => s.status === f).length})`}
                </button>
              ))}
            </div>

            {/* Seller Table */}
            {loading ? (
              <div className="bg-card border border-border p-12 rounded-2xl flex items-center justify-center text-muted-foreground">
                <Activity className="animate-spin mr-3 text-primary" /> Loading sellers...
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Seller</th>
                      <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Marketplace</th>
                      <th className="text-center p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Trust Score</th>
                      <th className="text-center p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-center p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSellers.map(seller => {
                      const ts = scores[seller.id];
                      const score = ts?.overall_score;
                      return (
                        <tr key={seller.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors cursor-pointer" onClick={() => window.location.href = `/seller/${seller.id}`}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                                {seller.name?.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-foreground text-sm">{seller.name}</p>
                                <p className="text-xs text-muted-foreground">{seller.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{seller.marketplace_name}</td>
                          <td className="p-4 text-center">
                            {score !== undefined ? (
                              <span className={`text-sm font-bold ${score >= 80 ? 'text-green-500' : score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{score}</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                              seller.status === 'active' ? 'bg-green-500/10 text-green-500' :
                              seller.status === 'under_review' ? 'bg-amber-500/10 text-amber-500' :
                              'bg-red-500/10 text-red-500'
                            }`}>
                              {seller.status === 'active' ? 'Active' : seller.status === 'under_review' ? 'Under Review' : 'Suspended'}
                            </span>
                          </td>
                          <td className="p-4 text-center text-xs text-muted-foreground">
                            {seller.created_at ? new Date(seller.created_at).toLocaleDateString() : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredSellers.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground text-sm">No sellers match this filter.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};


// ─────────────────────────────────────────────────────
// RISK ALERTS PANEL
// ─────────────────────────────────────────────────────
export const RiskAlerts = () => {
  const [highRiskSellers, setHighRiskSellers] = useState<any[]>([]);
  const [allScores, setAllScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [riskyRes, sellersRes] = await Promise.all([
          fetch(`${API_BASE}/admin/high-risk-sellers`),
          fetch(`${API_BASE}/sellers?limit=50`)
        ]);
        const risky = await riskyRes.json();
        const sellers = await sellersRes.json();
        setHighRiskSellers(risky || []);
        
        // Get score details for risk sellers
        const scoreData: any[] = [];
        for (const s of (sellers || [])) {
          try {
            const detail = await fetch(`${API_BASE}/sellers/${s.id}`);
            const d = await detail.json();
            if (d?.trust_score && d.trust_score.overall_score < 70) {
              scoreData.push({ ...s, trust_score: d.trust_score });
            }
          } catch {}
        }
        setAllScores(scoreData);
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-trustora-bg">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <AdminTopBar />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                <ShieldAlert className="text-red-500" size={28} /> Risk Alerts
              </h1>
              <p className="text-muted-foreground mt-1">Centralized view of high-risk seller flags requiring attention.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-red-500/20 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="text-red-500" size={18} />
                  <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
                </div>
                <h3 className="text-3xl font-bold text-red-500">{highRiskSellers.length}</h3>
                <p className="text-xs text-muted-foreground mt-1">Score below 50</p>
              </div>
              <div className="bg-card border border-amber-500/20 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-amber-500" size={18} />
                  <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                </div>
                <h3 className="text-3xl font-bold text-amber-500">{allScores.filter(s => s.trust_score?.overall_score >= 50 && s.trust_score?.overall_score < 70).length}</h3>
                <p className="text-xs text-muted-foreground mt-1">Score 50-70</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="text-primary" size={18} />
                  <p className="text-sm font-medium text-muted-foreground">Last Scan</p>
                </div>
                <h3 className="text-2xl font-bold text-foreground">Just Now</h3>
                <p className="text-xs text-muted-foreground mt-1">AMD ONNX Runtime</p>
              </div>
            </div>

            {/* Risk List */}
            {loading ? (
              <div className="bg-card border border-border p-12 rounded-2xl flex items-center justify-center text-muted-foreground">
                <Activity className="animate-spin mr-3 text-primary" /> Scanning for risks...
              </div>
            ) : (
              <div className="space-y-3">
                {allScores.length === 0 && highRiskSellers.length === 0 ? (
                  <div className="bg-card border border-green-500/20 p-8 rounded-2xl text-center">
                    <ShieldCheck className="text-green-500 mx-auto mb-3" size={32} />
                    <p className="text-foreground font-bold">All Clear!</p>
                    <p className="text-sm text-muted-foreground mt-1">No critical risk alerts at this time.</p>
                  </div>
                ) : (
                  allScores.map(seller => {
                    const score = seller.trust_score?.overall_score || 0;
                    const isCritical = score < 50;
                    return (
                      <div 
                        key={seller.id} 
                        className={`bg-card border rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-all cursor-pointer ${isCritical ? 'border-red-500/30' : 'border-amber-500/20'}`}
                        onClick={() => window.location.href = `/seller/${seller.id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCritical ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                            {isCritical ? <XCircle size={20} /> : <AlertTriangle size={20} />}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{seller.name}</p>
                            <p className="text-xs text-muted-foreground">{seller.marketplace_name} • Trust Score: <strong>{score}</strong></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            isCritical ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {isCritical ? 'CRITICAL' : 'WARNING'}
                          </span>
                          <ArrowUpRight size={16} className="text-muted-foreground" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};


// ─────────────────────────────────────────────────────
// AI MONITORING PANEL
// ─────────────────────────────────────────────────────
export const AIMonitoring = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/admin/ai-metrics`)
      .then(res => res.json())
      .then(data => { setMetrics(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-trustora-bg">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <AdminTopBar />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                <Cpu className="text-primary" size={28} /> AI Engine Monitoring
              </h1>
              <p className="text-muted-foreground mt-1">Real-time performance metrics for the AMD ONNX Runtime inference pipeline.</p>
            </div>

            {loading ? (
              <div className="bg-card border border-border p-12 rounded-2xl flex items-center justify-center">
                <Activity className="animate-spin text-primary mr-3" /> Loading AI metrics...
              </div>
            ) : metrics ? (
              <>
                {/* Provider Status Bar */}
                <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-bold text-foreground">{metrics.provider}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium border border-primary/20">
                      {metrics.models_loaded?.mode === 'simulation' ? '🔬 Simulation Mode' : '🚀 Production'}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{metrics.coverage?.model_version}</span>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="text-amber-500" size={18} />
                      <p className="text-sm font-medium text-muted-foreground">Avg Latency</p>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">{metrics.performance?.avg_inference_ms}ms</h3>
                    <p className="text-xs text-green-500 mt-1">per review</p>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="text-primary" size={18} />
                      <p className="text-sm font-medium text-muted-foreground">Throughput</p>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">{metrics.performance?.batch_throughput}</h3>
                    <p className="text-xs text-muted-foreground mt-1">batch: {metrics.performance?.last_batch_size} reviews</p>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldCheck className="text-green-500" size={18} />
                      <p className="text-sm font-medium text-muted-foreground">Sellers Scored</p>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">{metrics.coverage?.sellers_analyzed_v2}</h3>
                    <p className="text-xs text-muted-foreground mt-1">AMD ONNX processed</p>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="text-accent" size={18} />
                      <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">{metrics.coverage?.total_reviews_in_db?.toLocaleString()}</h3>
                    <p className="text-xs text-muted-foreground mt-1">in PostgreSQL</p>
                  </div>
                </div>

                {/* Hardware & Models */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                      <Cpu size={18} className="text-primary" /> Hardware Configuration
                    </h3>
                    <div className="space-y-4">
                      {[
                        ['Accelerator', metrics.hardware?.accelerator],
                        ['Runtime', metrics.hardware?.runtime],
                        ['Quantization', metrics.hardware?.quantization],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between items-center border-b border-border/50 pb-3">
                          <span className="text-sm text-muted-foreground">{label}</span>
                          <span className="text-sm font-semibold text-foreground bg-muted/30 px-3 py-1 rounded-md">{value}</span>
                        </div>
                      ))}
                      <div className="pt-2">
                        <p className="text-xs text-muted-foreground mb-2">Execution Providers (priority order):</p>
                        <div className="flex flex-wrap gap-2">
                          {metrics.hardware?.execution_providers?.map((ep: string) => (
                            <span key={ep} className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full font-medium">{ep}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                      <Brain size={18} className="text-accent" /> Model Status
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-border/50 pb-3">
                        <span className="text-sm text-muted-foreground">Sentiment Analysis</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${metrics.models_loaded?.sentiment ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          {metrics.models_loaded?.sentiment ? '✅ Loaded' : '🔬 Simulated'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-border/50 pb-3">
                        <span className="text-sm text-muted-foreground">Fake Review Detection</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${metrics.models_loaded?.fake_review ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          {metrics.models_loaded?.fake_review ? '✅ Loaded' : '🔬 Simulated'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-1">
                        <span className="text-sm text-muted-foreground">Engine Mode</span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {metrics.models_loaded?.mode === 'simulation' ? 'Hardware Simulation' : 'Full Production'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-card border border-border p-12 rounded-2xl text-center">
                <p className="text-muted-foreground">Failed to load AI metrics. Is the backend running?</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};


// ─────────────────────────────────────────────────────
// MODEL SETTINGS PANEL
// ─────────────────────────────────────────────────────
export const ModelSettings = () => {
  const [weights, setWeights] = useState({
    sentiment: 30,
    authenticity: 25,
    delivery: 25,
    support: 20
  });
  const [threshold, setThreshold] = useState(50);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <div className="flex min-h-screen bg-trustora-bg">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <AdminTopBar />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                <Sliders className="text-primary" size={28} /> Model Settings
              </h1>
              <p className="text-muted-foreground mt-1">Configure weights, thresholds, and operational parameters for trust score calculation.</p>
            </div>

            {/* Score Weights */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Settings size={18} className="text-primary" /> Trust Score Weights
              </h3>
              <p className="text-xs text-muted-foreground mb-6">Adjust how much each factor contributes to the overall trust score. Total must equal 100%.</p>
              
              <div className="space-y-6">
                {Object.entries(weights).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-foreground capitalize flex items-center gap-2">
                        {key === 'authenticity' && <span className="bg-primary/10 text-primary text-[10px] px-1.5 rounded font-bold border border-primary/20">AI</span>}
                        {key} Weight
                      </label>
                      <span className="text-sm font-bold text-primary">{value}%</span>
                    </div>
                    <input 
                      type="range" 
                      min={5} max={50} value={value} 
                      onChange={(e) => setWeights({...weights, [key]: parseInt(e.target.value)})}
                      className="w-full h-2 bg-input rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                ))}
              </div>
              
              <div className={`mt-4 text-sm font-bold flex items-center gap-2 ${total === 100 ? 'text-green-500' : 'text-red-500'}`}>
                {total === 100 ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                Total: {total}% {total !== 100 && `(must be 100%)`}
              </div>
            </div>

            {/* Risk Threshold */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <ShieldAlert size={18} className="text-red-500" /> High-Risk Threshold
              </h3>
              <p className="text-xs text-muted-foreground mb-6">Sellers below this score will be flagged as high-risk.</p>
              
              <div className="flex items-center gap-6">
                <input 
                  type="range" 
                  min={20} max={80} value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-input rounded-full appearance-none cursor-pointer accent-red-500"
                />
                <span className="text-2xl font-bold text-red-500 w-16 text-center">{threshold}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Currently: Sellers with score &lt; {threshold} are flagged.</p>
            </div>

            {/* Save */}
            <div className="flex justify-end">
              <button 
                onClick={handleSave}
                disabled={total !== 100}
                className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20"
              >
                {saved ? <><CheckCircle2 size={16} /> Saved!</> : <><Settings size={16} /> Save Configuration</>}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


// ─────────────────────────────────────────────────────
// API CONFIGURATION PANEL
// ─────────────────────────────────────────────────────
export const APIConfiguration = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const endpoints = [
    { method: 'GET', path: '/api/sellers', desc: 'List all sellers with pagination' },
    { method: 'GET', path: '/api/sellers/:id', desc: 'Get seller details with trust breakdown' },
    { method: 'POST', path: '/api/sellers/:id/analyze', desc: 'Trigger AMD ONNX AI analysis for one seller' },
    { method: 'POST', path: '/api/sellers/analyze-all', desc: 'Batch-analyze all sellers' },
    { method: 'GET', path: '/api/sellers/search?q=query', desc: 'Search sellers by name' },
    { method: 'GET', path: '/api/sellers/compare', desc: 'Compare trust scores of 2+ sellers' },
    { method: 'GET', path: '/api/admin/dashboard', desc: 'Admin overview statistics' },
    { method: 'GET', path: '/api/admin/high-risk-sellers', desc: 'List high-risk (score <50) sellers' },
    { method: 'GET', path: '/api/admin/ai-metrics', desc: 'AMD ONNX Runtime engine metrics' },
    { method: 'GET', path: '/api/health', desc: 'API health check' },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(`http://localhost:8000${text}`);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="flex min-h-screen bg-trustora-bg">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <AdminTopBar />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                <Webhook className="text-primary" size={28} /> API Configuration
              </h1>
              <p className="text-muted-foreground mt-1">API endpoints, credentials, and integration documentation.</p>
            </div>

            {/* Base URL */}
            <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
              <p className="text-xs text-muted-foreground font-medium mb-2">Base URL</p>
              <div className="flex items-center gap-3">
                <code className="text-lg font-mono font-bold text-foreground">http://localhost:8000</code>
                <button onClick={() => handleCopy('')} className="text-primary hover:text-primary/80">
                  {copied === '' ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* API Keys */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Key size={18} className="text-amber-500" /> Authentication
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border/50 pb-3">
                  <span className="text-sm text-muted-foreground">Auth Mode</span>
                  <span className="text-sm font-semibold text-foreground bg-green-500/10 text-green-500 px-3 py-1 rounded-md">Open (Demo Mode)</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-sm text-muted-foreground">CORS Policy</span>
                  <span className="text-sm font-semibold text-foreground bg-muted/30 px-3 py-1 rounded-md">Allow All Origins</span>
                </div>
              </div>
            </div>

            {/* Endpoints Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-border">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Webhook size={18} className="text-primary" /> Available Endpoints
                </h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase">Method</th>
                    <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase">Path</th>
                    <th className="text-left p-4 text-xs font-bold text-muted-foreground uppercase">Description</th>
                    <th className="text-center p-4 text-xs font-bold text-muted-foreground uppercase">Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((ep) => (
                    <tr key={ep.path} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                          ep.method === 'GET' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>{ep.method}</span>
                      </td>
                      <td className="p-4">
                        <code className="text-sm font-mono text-foreground">{ep.path}</code>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{ep.desc}</td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleCopy(ep.path)} className="text-muted-foreground hover:text-primary transition-colors">
                          {copied === ep.path ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
