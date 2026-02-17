
import React from 'react';
import { mockSentimentData } from '../../../services/mockIntelligenceData';
import '../Intelligence.css';

const SentimentAnalysis: React.FC = () => {
  return (
    <div className="intelligence-panel">
      <h2 className="panel-title">Sentiment Analysis</h2>
      
      <div className="sentiment-grid">
        {mockSentimentData.map((data, index) => (
          <div key={index} className="sentiment-card">
            <div className="card-header">
              <h3 className="source-name">{data.source}</h3>
              <span className={`sentiment-badge ${
                data.sentiment === 'Positive' ? 'badge-positive' :
                data.sentiment === 'Negative' ? 'badge-negative' :
                'badge-neutral'
              }`}>
                {data.sentiment}
              </span>
            </div>
            
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4px' }}>
                <span className="score-text">{data.score}</span>
                <span className={`trend-text ${data.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                  {data.trend === 'up' ? '↑ Trending Up' : '↓ Trending Down'}
                </span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className={`progress-bar-fill ${
                    data.score > 70 ? 'fill-green' : data.score > 40 ? 'fill-yellow' : 'fill-red'
                  }`} 
                  style={{ width: `${data.score}%` }}
                ></div>
              </div>
            </div>
            
            <p className="card-details">"{data.details}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentimentAnalysis;
