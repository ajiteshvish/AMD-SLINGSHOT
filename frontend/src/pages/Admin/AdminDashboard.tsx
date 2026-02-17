
import Navbar from '../../components/Navbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="container dashboard-content">
        <header className="admin-header">
           <h1>Admin / Marketplace Overview</h1>
           <div className="admin-actions">
             <button className="btn btn-secondary">Settings ⚙️</button>
             <button className="btn btn-primary">Refresh Data ↻</button>
           </div>
        </header>

        <div className="admin-stats-row">
           <div className="stat-card">
              <h3>Total Sellers</h3>
              <div className="big-number">1,245</div>
              <span className="trend positive">+12 this week</span>
           </div>
           <div className="stat-card">
              <h3>High Risk Sellers</h3>
              <div className="big-number risk">42</div>
              <span className="trend negative">+3 new alerts</span>
           </div>
           <div className="stat-card">
              <h3>Avg Trust Score</h3>
              <div className="big-number">78.5</div>
              <span className="trend neutral">stable</span>
           </div>
           <div className="stat-card">
              <h3>AI Latency (AMD)</h3>
              <div className="big-number">45ms</div>
              <span className="trend positive">optimized</span>
           </div>
        </div>

        <div className="admin-grid">
           <section className="risk-log-section">
              <h3>Recent Manipulation Alerts</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Seller</th>
                    <th>Issue Type</th>
                    <th>Confidence</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GadgetWorld</td>
                    <td>Fake Reviews Spike</td>
                    <td>98%</td>
                    <td><button className="btn-small">Review</button></td>
                  </tr>
                  <tr>
                    <td>FashionHub</td>
                    <td>Refund Fraud</td>
                    <td>85%</td>
                    <td><button className="btn-small">Review</button></td>
                  </tr>
                  <tr>
                    <td>RapidShip</td>
                    <td>Rating Manipulation</td>
                    <td>92%</td>
                    <td><button className="btn-small">Review</button></td>
                  </tr>
                </tbody>
              </table>
           </section>

           <section className="ai-monitor-section">
              <h3>AI Model Performance</h3>
              <div className="monitor-card">
                <h4>Sentiment Analysis Model</h4>
                <div className="monitor-stat">
                  <span>Accuracy</span>
                  <div className="bar"><div style={{width: '94%'}}></div></div>
                  <span>94%</span>
                </div>
              </div>
              <div className="monitor-card">
                <h4>Fake Review Detection</h4>
                <div className="monitor-stat">
                  <span>Recall</span>
                  <div className="bar"><div style={{width: '89%'}}></div></div>
                  <span>89%</span>
                </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
