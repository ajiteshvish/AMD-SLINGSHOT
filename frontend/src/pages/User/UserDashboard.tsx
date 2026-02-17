import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './UserDashboard.css';

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate search - in real app, query Supabase
    if (searchTerm) {
      // For demo, just go to a dummy seller page or search results
      navigate('/seller/1'); 
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="container dashboard-content">
        <section className="search-section">
          <h1>Find Trusted Sellers</h1>
          <p>Search by seller name or product link to check their Trust Score.</p>
          
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              placeholder="Enter seller name or product URL..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Analyze Trust</button>
          </form>
        </section>

        <div className="dashboard-grid">
          <div className="dashboard-column">
            <h3>Risk Alerts ⚠️</h3>
            <div className="alert-card danger">
              <div className="alert-header">
                <strong>TechHaven Electronics</strong>
                <span className="badge-risk">High Risk</span>
              </div>
              <p>Recent spike in refund requests and fake reviews detected.</p>
            </div>
            <div className="alert-card warning">
              <div className="alert-header">
                <strong>GadgetWorld</strong>
                <span className="badge-warning">Medium Risk</span>
              </div>
              <p>Delivery delays reported in the last 7 days.</p>
            </div>
          </div>

          <div className="dashboard-column">
            <h3>High Trust Sellers 🛡️</h3>
            <div className="seller-list-item" onClick={() => navigate('/seller/2')}>
              <div className="seller-rank">#1</div>
              <div className="seller-info">
                <strong>Prime Digital</strong>
                <span className="trust-score score-high">98/100</span>
              </div>
            </div>
            <div className="seller-list-item" onClick={() => navigate('/seller/3')}>
              <div className="seller-rank">#2</div>
              <div className="seller-info">
                <strong>Alpha Retailers</strong>
                <span className="trust-score score-high">95/100</span>
              </div>
            </div>
            <div className="seller-list-item" onClick={() => navigate('/seller/4')}>
              <div className="seller-rank">#3</div>
              <div className="seller-info">
                <strong>Global Mart</strong>
                <span className="trust-score score-good">88/100</span>
              </div>
            </div>
          </div>
        </div>
        
        <section className="recent-section">
          <h3>Recently Viewed</h3>
          <div className="recent-grid">
             {/* Placeholders */}
             <div className="recent-card">Seller A</div>
             <div className="recent-card">Seller B</div>
             <div className="recent-card">Seller C</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
