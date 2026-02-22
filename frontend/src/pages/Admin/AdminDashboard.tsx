
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Navbar from '../../components/Navbar';
import { useAdminDashboard, useHighRiskSellers } from '../../hooks/useApi';
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
      <div className="dashboard-page">
        <Navbar />
        <div className="container">
          <div className="loading-state">
            <h2>Loading dashboard...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="container">
          <div className="error-state">
            <h2>Failed to load dashboard</h2>
            <p>{error?.message}</p>
            <button onClick={refetch} className="btn btn-primary">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="container dashboard-content">
        <header className="admin-header">
           <h1>Admin / Marketplace Overview</h1>
           <div className="admin-actions">
             <button className="btn btn-secondary">Settings ⚙️</button>
             <button className="btn btn-primary" onClick={refetch}>Refresh Data ↻</button>
           </div>
        </header>

        <div className="admin-stats-row">
           <div className="stat-card">
              <h3>Total Sellers</h3>
              <div className="big-number">{dashboardData.total_sellers}</div>
              <span className="trend neutral">Active sellers</span>
           </div>
           <div className="stat-card">
              <h3>High Risk Sellers</h3>
              <div className="big-number risk">{dashboardData.high_risk_sellers}</div>
              <span className="trend negative">Score \u003c 50</span>
           </div>
           <div className="stat-card">
              <h3>Avg Trust Score</h3>
              <div className="big-number">{dashboardData.avg_trust_score}</div>
              <span className="trend positive">Platform average</span>
           </div>
           <div className="stat-card">
              <h3>Total Reviews</h3>
              <div className="big-number">{dashboardData.total_reviews}</div>
              <span className="trend neutral">All sellers</span>
           </div>
        </div>

        <div className="admin-grid">
           <section className="chart-section">
              <h3>Trust Score Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
           </section>

           <section className="risk-log-section">
              <h3>High Risk Sellers</h3>
              {highRiskSellers && highRiskSellers.length > 0 ? (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Seller</th>
                      <th>Marketplace</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highRiskSellers.slice(0, 10).map(seller => (
                      <tr key={seller.id}>
                        <td>{seller.name}</td>
                        <td>{seller.marketplace_name}</td>
                        <td>
                          <span className={`status-badge status-${seller.status}`}>
                            {seller.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-data">
                  <p>✅ No high-risk sellers detected</p>
                </div>
              )}
           </section>
        </div>

        <section className="stats-summary">
          <h3>Platform Statistics</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">High Trust Sellers</span>
              <span className="summary-value">{dashboardData.score_distribution.high}</span>
              <span className="summary-percent">
                {((dashboardData.score_distribution.high / dashboardData.total_sellers) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Medium Trust Sellers</span>
              <span className="summary-value">{dashboardData.score_distribution.medium}</span>
              <span className="summary-percent">
                {((dashboardData.score_distribution.medium / dashboardData.total_sellers) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Low Trust Sellers</span>
              <span className="summary-value">{dashboardData.score_distribution.low}</span>
              <span className="summary-percent">
                {((dashboardData.score_distribution.low / dashboardData.total_sellers) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
