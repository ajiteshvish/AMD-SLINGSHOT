
import './DashboardPreview.css';

const DashboardPreview = () => {
  return (
    <div className="dashboard-container container">
      <div className="dashboard-header">
        <div className="user-profile">
          <div className="avatar">AK</div>
          <span>Alicia Koch</span>
        </div>
        <nav className="dash-nav">
          <a href="#" className="active">Overview</a>
          <a href="#">Customers</a>
          <a href="#">Products</a>
          <a href="#">Settings</a>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dash-title-row">
          <h2>Dashboard</h2>
          <div className="date-filter">
            <span>Jan 20, 2023 - Feb 09, 2023</span>
            <button className="btn-download">Download</button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Revenue</h3>
              <span className="sc-icon">$</span>
            </div>
            <div className="stat-value">$45,231.89</div>
            <div className="stat-trend">+20.1% from last month</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Subscriptions</h3>
              <span className="sc-icon">👥</span>
            </div>
            <div className="stat-value">+2350</div>
            <div className="stat-trend">+180.1% from last month</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Sales</h3>
              <span className="sc-icon">💳</span>
            </div>
            <div className="stat-value">+12,234</div>
            <div className="stat-trend">+19% from last month</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Active Now</h3>
              <span className="sc-icon">📈</span>
            </div>
            <div className="stat-value">+573</div>
            <div className="stat-trend">+201 since last hour</div>
          </div>
        </div>

        <div className="dash-content-grid">
          <div className="chart-card">
            <h3>Overview</h3>
            <div className="bar-chart-placeholder">
              {/* Simple CSS bars for visual replication */}
              {[40, 70, 50, 90, 60, 80, 40, 100, 50, 60, 70, 80].map((h, i) => (
                <div key={i} className="chart-bar" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
          <div className="recent-sales-card">
            <h3>Recent Sales</h3>
            <p className="sub-text">You made 265 sales this month.</p>
            <div className="sales-list">
              {[
                { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
                { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
                { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
                { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
                { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' }
              ].map((sale, i) => (
                <div key={i} className="sale-item">
                  <div className="sale-avatar"></div>
                  <div className="sale-info">
                    <div className="sale-name">{sale.name}</div>
                    <div className="sale-email">{sale.email}</div>
                  </div>
                  <div className="sale-amount">{sale.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
