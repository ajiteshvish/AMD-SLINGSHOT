
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Navbar from '../components/Navbar';
import { useSeller, useTrustHistory } from '../hooks/useApi';
import './SellerDetails.css';

const SellerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: sellerData, loading, error } = useSeller(id);
  const { data: trustHistory } = useTrustHistory(id, 90);

  if (loading) {
    return (
      <div className="seller-details-page">
        <Navbar />
        <div className="container">
          <div className="loading-state">
            <h2>Loading seller details...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || !sellerData) {
    return (
      <div className="seller-details-page">
        <Navbar />
        <div className="container">
          <div className="error-state">
            <h2>Seller not found</h2>
            <p>{error?.message || 'Unable to load seller details'}</p>
            <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { seller, trust_score, latest_metrics, recent_reviews } = sellerData;
  
  // Format trust history for chart
  const chartData = trustHistory?.map(score => ({
    date: new Date(score.calculated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: score.overall_score
  })) || [];

  // Get trust level
  const getTrustLevel = (score: number) => {
    if (score >= 80) return { label: 'High Trust', class: 'high' };
    if (score >= 60) return { label: 'Medium Trust', class: 'medium' };
    return { label: 'Low Trust', class: 'low' };
  };

  const trustLevel = trust_score ? getTrustLevel(trust_score.overall_score) : null;

  // Get star rating
  const getStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="seller-details-page">
      <Navbar />
      
      <div className="container seller-details-content">
        {/* Header */}
        <div className="seller-header">
          <div>
            <h1>{seller.name}</h1>
            <p className="marketplace-info">
              {seller.marketplace_name} • {seller.marketplace_id}
            </p>
            <span className={`status-badge status-${seller.status}`}>
              {seller.status}
            </span>
          </div>
          {trust_score && (
            <div className="trust-score-display">
              <div className={`score-circle score-${trustLevel?.class}`}>
                <span className="score-value">{trust_score.overall_score}</span>
                <span className="score-max">/100</span>
              </div>
              <p className={`trust-label trust-${trustLevel?.class}`}>
                {trustLevel?.label}
              </p>
            </div>
          )}
        </div>

        {/* Trust Score Breakdown */}
        {trust_score && (
          <section className="trust-breakdown">
            <h2>Trust Score Breakdown</h2>
            <div className="breakdown-grid">
              <div className="breakdown-item">
                <label>Delivery Reliability</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${trust_score.delivery_reliability}%` }}
                  />
                </div>
                <span className="score-text">{trust_score.delivery_reliability}/100</span>
              </div>
              
              <div className="breakdown-item">
                <label>Review Authenticity</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${trust_score.review_authenticity}%` }}
                  />
                </div>
                <span className="score-text">{trust_score.review_authenticity}/100</span>
              </div>
              
              <div className="breakdown-item">
                <label>Customer Support</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${trust_score.customer_support}%` }}
                  />
                </div>
                <span className="score-text">{trust_score.customer_support}/100</span>
              </div>
              
              <div className="breakdown-item">
                <label>Refund Fairness</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${trust_score.refund_fairness}%` }}
                  />
                </div>
                <span className="score-text">{trust_score.refund_fairness}/100</span>
              </div>
              
              <div className="breakdown-item">
                <label>Behavioral Stability</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${trust_score.behavioral_stability}%` }}
                  />
                </div>
                <span className="score-text">{trust_score.behavioral_stability}/100</span>
              </div>
            </div>
          </section>
        )}

        {/* Trust Trend Chart */}
        {chartData.length > 0 && (
          <section className="trust-trend">
            <h2>Trust Score Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis domain={[0, 100]} stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1a1a2e', 
                    border: '1px solid #333',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>
        )}

        {/* Metrics */}
        {latest_metrics && (
          <section className="seller-metrics">
            <h2>Performance Metrics</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>{latest_metrics.total_orders}</h3>
                <p>Total Orders</p>
              </div>
              <div className="metric-card">
                <h3>{latest_metrics.completed_orders}</h3>
                <p>Completed</p>
              </div>
              <div className="metric-card">
                <h3>{latest_metrics.avg_delivery_days?.toFixed(1) || 'N/A'}</h3>
                <p>Avg Delivery (days)</p>
              </div>
              <div className="metric-card">
                <h3>{latest_metrics.avg_rating?.toFixed(1) || 'N/A'}/5.0</h3>
                <p>Avg Rating</p>
              </div>
              <div className="metric-card">
                <h3>{latest_metrics.response_time_hours?.toFixed(1) || 'N/A'}h</h3>
                <p>Response Time</p>
              </div>
              <div className="metric-card">
                <h3>{latest_metrics.refund_requests}</h3>
                <p>Refund Requests</p>
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="seller-reviews">
          <h2>Recent Reviews ({recent_reviews.length})</h2>
          <div className="reviews-list">
            {recent_reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="stars">{getStars(review.rating)}</span>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                {review.review_text && (
                  <p className="review-text">{review.review_text}</p>
                )}
                <div className="review-meta">
                  {review.sentiment_score !== null && review.sentiment_score !== undefined && (
                    <span className={`sentiment ${review.sentiment_score >= 0 ? 'positive' : 'negative'}`}>
                      Sentiment: {review.sentiment_score.toFixed(2)}
                    </span>
                  )}
                  {!review.authenticity_flag && (
                    <span className="authenticity-warning">⚠️ Flagged</span>
                  )}
                </div>
              </div>
            ))}
            {recent_reviews.length === 0 && (
              <p className="no-reviews">No reviews available</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SellerDetails;
