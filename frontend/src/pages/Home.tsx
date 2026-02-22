import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="dotted-pattern"></div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="badge">New Version Of Trustora Is Out!</div>
          <h1 className="hero-title">
            Unlock The Power Of <span className="gradient-text">Trust Intelligence</span> For Online Marketplaces
          </h1>
          <p className="hero-subtitle">
            Comprehensive AI solutions for seller verification and risk assessment, from machine learning 
            models to intelligent automation systems that revolutionize how you evaluate trust.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/dashboard" className="btn btn-secondary">
              View Dashboard
            </Link>
          </div>
          <div className="trust-rating">
            <div className="stars">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <span className="rating-text">4.8 /5.0 Based On 4,563 Reviews • GDPR Compliant</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="glass-card hero-card">
            <div className="card-icon">
              <div className="icon-circle">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 5L25 15L35 16.5L27.5 24L29.5 35L20 29.5L10.5 35L12.5 24L5 16.5L15 15L20 5Z" 
                        fill="currentColor" opacity="0.2"/>
                  <path d="M20 5L25 15L35 16.5L27.5 24L29.5 35L20 29.5L10.5 35L12.5 24L5 16.5L15 15L20 5Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h2>Verify Seller Trustworthiness</h2>
            <p>
              Discover how our AI technology is already transforming businesses across industries and 
              helping individuals achieve more with less effort.
            </p>
            <div className="card-actions">
              <Link to="/register" className="btn btn-primary">Get Started</Link>
              <Link to="/dashboard" className="btn btn-outline">Explore Platform</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features Grid */}
      <section className="trust-features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Features</span>
            <h2>Real Results from Trust Intelligence</h2>
            <p>
              Success stories from organizations that have embraced AI-powered trust verification to transform 
              their operations, increase efficiency, and achieve remarkable business outcomes.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon">🛡️</div>
              <h3>AI Trust Scoring</h3>
              <p>Multi-dimensional analysis of seller reliability with real-time risk assessment</p>
            </div>
            <div className="feature-card glass-card">
              <div className="feature-icon">📊</div>
              <h3>Live Monitoring</h3>
              <p>Track seller performance and detect anomalies instantly with automated alerts</p>
            </div>
            <div className="feature-card glass-card">
              <div className="feature-icon">⚠️</div>
              <h3>Fraud Detection</h3>
              <p>Get notified about suspicious behavior and fraud patterns before they escalate</p>
            </div>
            <div className="feature-card glass-card">
              <div className="feature-icon">🔍</div>
              <h3>Deep Analytics</h3>
              <p>Comprehensive insights into seller metrics, trends, and historical performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Get Free Trust Intelligence Workflow</h2>
            <p>In our weekly newsletter.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Trustora</h3>
              <p>AI-powered trust intelligence for online marketplaces</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/register">Get Started</Link>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <Link to="/">About</Link>
                <Link to="/">Contact</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Trustora. All Rights Reserved.</p>
            <div className="footer-legal">
              <Link to="/">Terms and conditions</Link>
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
