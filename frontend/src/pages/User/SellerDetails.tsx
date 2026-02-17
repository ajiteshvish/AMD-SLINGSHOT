
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './SellerDetails.css';

const SellerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data based on ID
  const seller = {
    id,
    name: 'TechHaven Electronics',
    trustScore: 85,
    riskLevel: 'Low',
    breakdown: {
      delivery: 90,
      authenticity: 85,
      support: 80,
      refund: 85
    },
    riskReason: 'Slight delay in support response times.',
    history: [
        { date: '30 days ago', score: 82 },
        { date: 'Now', score: 85 }
    ]
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="container details-content">
        <button onClick={() => navigate(-1)} className="back-btn">← Back to Dashboard</button>
        
        <div className="seller-header">
           <div className="seller-title">
             <h1>{seller.name}</h1>
             <span className="badge-verified">Verified Seller</span>
           </div>
           <div className="trust-badge-large">
             <div className="score-circle">{seller.trustScore}</div>
             <span>Trust Score</span>
           </div>
        </div>

        <div className="details-grid">
          <div className="details-main">
            <section className="breakdown-section">
              <h2>Trust Score Breakdown</h2>
              <div className="breakdown-bars">
                <div className="breakdown-item">
                  <label>Delivery Reliability</label>
                  <div className="progress-bar"><div className="fill" style={{width: `${seller.breakdown.delivery}%`}}></div></div>
                  <span>{seller.breakdown.delivery}%</span>
                </div>
                <div className="breakdown-item">
                  <label>Review Authenticity</label>
                  <div className="progress-bar"><div className="fill" style={{width: `${seller.breakdown.authenticity}%`}}></div></div>
                  <span>{seller.breakdown.authenticity}%</span>
                </div>
                <div className="breakdown-item">
                  <label>Refund Fairness</label>
                  <div className="progress-bar"><div className="fill" style={{width: `${seller.breakdown.refund}%`}}></div></div>
                  <span>{seller.breakdown.refund}%</span>
                </div>
                <div className="breakdown-item">
                  <label>Customer Support</label>
                  <div className="progress-bar"><div className="fill" style={{width: `${seller.breakdown.support}%`}}></div></div>
                  <span>{seller.breakdown.support}%</span>
                </div>
              </div>
            </section>
            
            <section className="history-section">
               <h2>Trust Trend (30 Days)</h2>
               <div className="graph-placeholder">
                 {/* Placeholder for chart */}
                 <div className="graph-line"></div>
                 <span>Score Improved +3%</span>
               </div>
            </section>
          </div>

          <div className="details-sidebar">
             <div className="risk-box">
               <h3>Risk & Warnings</h3>
               <p>{seller.riskReason}</p>
             </div>
             
             <div className="actions-box">
               <button className="btn btn-secondary full-width">Comparison View</button>
               <button className="btn btn-secondary full-width">Set Alert 🔔</button>
               <button className="btn btn-primary full-width">Visit Store ↗</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
