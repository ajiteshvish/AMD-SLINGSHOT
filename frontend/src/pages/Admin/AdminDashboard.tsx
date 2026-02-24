
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import AdminSidebar from './components/AdminSidebar';
import AdminTopBar from './components/AdminTopBar';
import { useAdminDashboard, useHighRiskSellers } from '../../hooks/useApi';
import { ShieldAlert, TrendingUp, Users, Activity, AlertTriangle } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { data: dashboardData, loading, error, refetch } = useAdminDashboard();
  const { data: highRiskSellers } = useHighRiskSellers();

  // Prepare chart data
  const chartData = dashboardData ? [
    { name: 'High Trust (80-100)', value: dashboardData.score_distribution.high, color: '#22c55e' },
    { name: 'Medium Trust (60-79)', value: dashboardData.score_distribution.medium, color: '#f59e0b' },
    { name: 'Low Trust (0-59)', value: dashboardData.score_distribution.low, color: '#ef4444' },
  ] : [];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-reviewdekho-bg">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <AdminTopBar />
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p>Loading analytics data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex min-h-screen bg-reviewdekho-bg">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <AdminTopBar />
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl max-w-md w-full shadow-sm">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">Failed to load dashboard</h2>
              <p className="text-muted-foreground mb-6">{error?.message || "Unknown error occurred"}</p>
              <button onClick={refetch} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-xl transition-colors">
                Retry Connection
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-reviewdekho-bg">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <AdminTopBar />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Platform Overview</h1>
                <p className="text-muted-foreground mt-1">High-level insights into marketplace trust and risk metrics.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-xl transition-colors text-sm border border-border">Settings ⚙️</button>
                <button onClick={refetch} className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-colors text-sm shadow-sm flex items-center gap-2">
                  <Activity size={16}/> Refresh Data
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Users size={20} />
                    </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground">{dashboardData.total_sellers}</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Total Active Sellers</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-red-500"></div>
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                      <ShieldAlert size={20} />
                    </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-red-500">{dashboardData.high_risk_sellers}</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">High Risk Profiles</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                      <TrendingUp size={20} />
                    </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground">{dashboardData.avg_trust_score.toFixed(1)}</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Avg Trust Score</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <Activity size={20} />
                    </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground">{dashboardData.total_reviews.toLocaleString()}</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Total Analyzed Reviews</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Chart */}
               <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                  <h3 className="text-lg font-bold text-foreground mb-6">Trust Score Distribution</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${(name || '').split(' ')[0]}: ${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={100}
                          innerRadius={60}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Legend verticalAlign="bottom" height={36}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               {/* Risk Log */}
               <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-500"/> Priority Risk Alerts
                    </h3>
                    <button className="text-sm text-primary font-medium hover:underline">View All</button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {highRiskSellers && highRiskSellers.length > 0 ? (
                        <div className="space-y-3">
                            {highRiskSellers.slice(0, 5).map(seller => (
                            <div key={seller.id} className="border border-border rounded-xl p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                                <div>
                                    <h4 className="font-medium text-foreground text-sm">{seller.name}</h4>
                                    <p className="text-xs text-muted-foreground">{seller.marketplace_name} • <span className="text-red-500 capitalize">{seller.status.replace('_', ' ')}</span></p>
                                </div>
                                <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium rounded border border-border transition-colors">
                                    Review Flag
                                </button>
                            </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/5 border border-dashed border-border rounded-xl">
                            <ShieldAlert size={32} className="text-green-500 mb-3 opacity-50 block" />
                            <p className="text-sm font-medium">No high-risk sellers detected</p>
                            <p className="text-xs mt-1">Platform is currently stable</p>
                        </div>
                    )}
                  </div>
               </div>
            </div>

            {/* Platform Stats Summary */}
            <div className="bg-card border border-border p-0 rounded-2xl shadow-sm overflow-hidden">
               <div className="p-6 border-b border-border bg-muted/10">
                   <h3 className="text-lg font-bold text-foreground">Ecosystem Health Summary</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="p-8 text-center flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                          <span className="text-green-500 font-bold text-xl">A</span>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">High Trust Segment</p>
                      <h4 className="text-2xl font-bold text-foreground mb-2">{dashboardData.score_distribution.high} Sellers</h4>
                      <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full">
                        {((dashboardData.score_distribution.high / dashboardData.total_sellers) * 100).toFixed(1)}% of Platform
                      </span>
                  </div>
                  
                  <div className="p-8 text-center flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                          <span className="text-amber-500 font-bold text-xl">B</span>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Medium Trust Segment</p>
                      <h4 className="text-2xl font-bold text-foreground mb-2">{dashboardData.score_distribution.medium} Sellers</h4>
                      <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
                        {((dashboardData.score_distribution.medium / dashboardData.total_sellers) * 100).toFixed(1)}% of Platform
                      </span>
                  </div>

                  <div className="p-8 text-center flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                          <span className="text-red-500 font-bold text-xl">C</span>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Low Trust Segment</p>
                      <h4 className="text-2xl font-bold text-foreground mb-2">{dashboardData.score_distribution.low} Sellers</h4>
                      <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full">
                        {((dashboardData.score_distribution.low / dashboardData.total_sellers) * 100).toFixed(1)}% of Platform
                      </span>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
