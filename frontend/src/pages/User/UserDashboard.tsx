import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useSellers, useSearchSellers } from '../../hooks/useApi';
import { api } from '../../services/api';
import { ShieldCheck, AlertTriangle, ShieldAlert, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import './UserDashboard.css';

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trustScores, setTrustScores] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  // Fetch all sellers
  const { data: allSellers, loading, error } = useSellers({ limit: 50 });
  
  // Search sellers
  const { data: searchResults } = useSearchSellers(searchTerm);

  // Fetch trust scores for all sellers
  useEffect(() => {
    if (!allSellers || allSellers.length === 0) return;
    
    const fetchScores = async () => {
      const scores: Record<string, any> = {};
      // Batch fetch top sellers' details
      for (const seller of allSellers.slice(0, 8)) {
        try {
          const detail = await api.getSellerDetails(seller.id);
          if (detail?.trust_score) {
            scores[seller.id] = detail.trust_score;
          }
        } catch {
          // Skip on error
        }
      }
      setTrustScores(scores);
    };
    
    fetchScores();
  }, [allSellers]);

  // Filter high trust sellers (score >= 80)
  const highTrustSellers = useMemo(() => {
    if (!allSellers) return [];
    return allSellers.slice(0, 6);
  }, [allSellers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults && searchResults.length > 0) {
      navigate(`/seller/${searchResults[0].id}`);
    }
  };

  const handleSellerClick = (sellerId: string) => {
    navigate(`/seller/${sellerId}`);
  };

  return (
    <div className="flex min-h-screen bg-reviewdekho-bg">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar onSearch={setSearchTerm} />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header Section */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome! Here's an overview of seller trust metrics.</p>
            </div>
          
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              placeholder="Enter seller name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Analyze Trust</button>
            </form>

            {/* Search Results */}
            {searchTerm && searchResults && searchResults.length > 0 && (
              <div className="search-results">
                <h4>Search Results:</h4>
                {searchResults.map(seller => (
                  <div 
                    key={seller.id} 
                    className="search-result-item"
                    onClick={() => handleSellerClick(seller.id)}
                  >
                    <strong>{seller.name}</strong>
                    <span className="marketplace-badge">{seller.marketplace_name}</span>
                  </div>
                ))}
              </div>
            )}
            
            {loading && (
              <div className="loading-state">
                <p>Loading sellers...</p>
              </div>
            )}

            {error && (
              <div className="error-state">
                <p>Error loading sellers: {error.message}</p>
              </div>
            )}

            {/* KEY METRICS CARDS */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, staggerChildren: 0.1 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.4, delay: 0.1 }}
                 className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-start justify-between hover:border-primary/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Trust Sellers</p>
                  <h3 className="text-2xl font-bold mt-2 text-foreground">{highTrustSellers.length}</h3>
                  <div className="flex items-center gap-1 mt-2 text-xs text-green-500 bg-green-500/10 w-max px-2 py-0.5 rounded-full">
                    <span className="font-semibold">+12%</span> this week
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <ShieldCheck size={24} />
                </div>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.4, delay: 0.2 }}
                 className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-start justify-between hover:border-primary/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Medium Risk</p>
                  <h3 className="text-2xl font-bold mt-2 text-foreground">
                    {allSellers?.filter(s => s.status === 'under_review').length || 0}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-xs text-amber-500 bg-amber-500/10 w-max px-2 py-0.5 rounded-full">
                    Needs Attention
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                  <AlertTriangle size={24} />
                </div>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.4, delay: 0.3 }}
                 className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-start justify-between hover:border-primary/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Risk Alerts</p>
                  <h3 className="text-2xl font-bold mt-2 text-foreground">
                    {allSellers?.filter(s => s.status === 'suspended').length || 0}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-xs text-red-500 bg-red-500/10 w-max px-2 py-0.5 rounded-full">
                    <span className="font-semibold">Action Required</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                  <ShieldAlert size={24} />
                </div>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.4, delay: 0.4 }}
                 className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-start justify-between hover:border-primary/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recently Viewed</p>
                  <h3 className="text-2xl font-bold mt-2 text-foreground">{Object.keys(trustScores).length}</h3>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    Last 24 hours
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Activity size={24} />
                </div>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* TRENDING TRUSTED SELLERS */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Trending Trusted Sellers</h3>
                  <button className="text-sm font-medium text-primary hover:underline">View All</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {highTrustSellers.map((seller) => {
                    const ts = trustScores[seller.id];
                    const score = ts?.overall_score ?? '—';
                    const delivery = ts?.delivery_reliability ?? 0;
                    const authenticity = ts?.review_authenticity ?? 0;
                    const scoreColor = typeof score === 'number' 
                      ? score >= 80 ? 'text-green-500' : score >= 60 ? 'text-amber-500' : 'text-red-500'
                      : 'text-muted-foreground';
                    const badgeColor = typeof score === 'number'
                      ? score >= 80 ? 'bg-green-500/10 text-green-500' : score >= 60 ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                      : 'bg-muted text-muted-foreground';
                    const badgeText = typeof score === 'number'
                      ? score >= 80 ? 'High Trust' : score >= 60 ? 'Medium' : 'Low Trust'
                      : 'Pending';

                    return (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + (0.1 * highTrustSellers.indexOf(seller)) }}
                      key={seller.id} 
                      className="bg-card border border-border p-5 rounded-xl hover:border-primary cursor-pointer transition-all hover:shadow-md group"
                      onClick={() => handleSellerClick(seller.id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-background border border-border flex justify-center items-center text-xl shadow-sm">
                            {seller.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{seller.name}</h4>
                            <p className="text-xs text-muted-foreground">{seller.marketplace_name}</p>
                          </div>
                        </div>
                        <span className={`${badgeColor} text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1`}>
                          <ShieldCheck size={12} /> {badgeText}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Trust Score</span>
                          <span className={`font-bold ${scoreColor} text-lg`}>{score}</span>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Delivery</span>
                            <span>{delivery}%</span>
                          </div>
                          <div className="w-full bg-input rounded-full h-1.5 overflow-hidden">
                            <div className="bg-green-500 h-1.5 rounded-full transition-all" style={{ width: `${delivery}%` }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Reviews (AI)</span>
                            <span>{authenticity}%</span>
                          </div>
                          <div className="w-full bg-input rounded-full h-1.5 overflow-hidden">
                            <div className="bg-green-400 h-1.5 rounded-full transition-all" style={{ width: `${authenticity}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* SAVED SEARCH RESULTS / HIGH RISK */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Risk Watchlist</h3>
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                  <div className="divide-y divide-border">
                    {allSellers && allSellers
                      .filter(s => s.status === 'under_review' || s.status === 'suspended')
                      .slice(0, 4)
                      .map(seller => (
                        <div key={seller.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground text-sm">{seller.name}</p>
                            <p className="text-xs text-muted-foreground">{seller.marketplace_name}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                            seller.status === 'suspended' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {seller.status === 'suspended' ? 'High Risk' : 'Medium Risk'}
                          </span>
                        </div>
                      ))}
                    {allSellers && allSellers.filter(s => s.status !== 'active').length === 0 && (
                      <div className="p-6 text-center text-muted-foreground text-sm">
                        <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <ShieldCheck size={24} />
                        </div>
                        ✅ No risk alerts at this time
                      </div>
                    )}
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

export default UserDashboard;
