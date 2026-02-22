import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useSellers, useSearchSellers } from '../../hooks/useApi';
import './UserDashboard.css';

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch all sellers
  const { data: allSellers, loading, error } = useSellers({ limit: 50 });
  
  // Search sellers
  const { data: searchResults } = useSearchSellers(searchTerm);

  // Filter high trust sellers (score >= 80)
  const highTrustSellers = useMemo(() => {
    if (!allSellers) return [];
    // For now, we'll show top sellers by name
    // In a real implementation, we'd fetch with trust scores
    return allSellers.slice(0, 5);
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
    <div className="dashboard-page">
      <Navbar />
      
      <div className="container dashboard-content">
        <section className="search-section">
          <h1>Find Trusted Sellers</h1>
          <p>Search by seller name to check their Trust Score.</p>
          
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
        </section>

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

        {!loading && !error && allSellers && (
          <>
            <div className="dashboard-grid">
              <div className="dashboard-column">
                <h3>Risk Alerts ⚠️</h3>
                {allSellers
                  .filter(s => s.status === 'under_review' || s.status === 'suspended')
                  .slice(0, 3)
                  .map(seller => (
                    <div key={seller.id} className="alert-card danger">
                      <div className="alert-header">
                        <strong>{seller.name}</strong>
                        <span className="badge-risk">
                          {seller.status === 'suspended' ? 'High Risk' : 'Under Review'}
                        </span>
                      </div>
                      <p>Status: {seller.status}</p>
                    </div>
                  ))}
                {allSellers.filter(s => s.status !== 'active').length === 0 && (
                  <div className="alert-card success">
                    <p>✅ No risk alerts at this time</p>
                  </div>
                )}
              </div>

              <div className="dashboard-column">
                <h3>Top Sellers 🛡️</h3>
                {highTrustSellers.map((seller, index) => (
                  <div 
                    key={seller.id} 
                    className="seller-list-item" 
                    onClick={() => handleSellerClick(seller.id)}
                  >
                    <div className="seller-rank">#{index + 1}</div>
                    <div className="seller-info">
                      <strong>{seller.name}</strong>
                      <span className="marketplace-tag">{seller.marketplace_name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <section className="recent-section">
              <h3>All Sellers</h3>
              <div className="sellers-grid">
                {allSellers.slice(0, 12).map(seller => (
                  <div 
                    key={seller.id} 
                    className="seller-card"
                    onClick={() => handleSellerClick(seller.id)}
                  >
                    <h4>{seller.name}</h4>
                    <p className="marketplace">{seller.marketplace_name}</p>
                    <span className={`status-badge status-${seller.status}`}>
                      {seller.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
