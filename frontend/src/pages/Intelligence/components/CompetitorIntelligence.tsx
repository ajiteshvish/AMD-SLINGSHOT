
import React from 'react';
import { mockCompetitorData } from '../../../services/mockIntelligenceData';
import '../Intelligence.css';

const CompetitorIntelligence: React.FC = () => {
  return (
    <div className="intelligence-panel" style={{ marginTop: '32px' }}>
      <h2 className="panel-title">Competitor Intelligence</h2>
      
      <div className="table-container">
        <table className="competitor-table">
          <thead>
            <tr>
              <th>Competitor</th>
              <th>Market Share</th>
              <th>Sentiment Score</th>
              <th>Social Growth</th>
              <th>Recent Activity</th>
            </tr>
          </thead>
          <tbody>
            {mockCompetitorData.map((competitor, index) => (
              <tr key={index} className={competitor.name === 'Your Brand' ? 'row-highlight' : ''}>
                <td style={{ fontWeight: 600, color: 'white' }}>
                  {competitor.name}
                  {competitor.name === 'Your Brand' && <span style={{ marginLeft: '8px', fontSize: '0.75rem', backgroundColor: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '9999px' }}>YOU</span>}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '32px' }}>{competitor.marketShare}%</span>
                    <div style={{ width: '100px', backgroundColor: '#374151', borderRadius: '9999px', height: '6px', marginLeft: '12px' }}>
                      <div style={{ backgroundColor: '#3b82f6', height: '100%', borderRadius: '9999px', width: `${competitor.marketShare}%` }}></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ color: competitor.sentimentScore > 70 ? '#4ade80' : '#facc15' }}>
                    {competitor.sentimentScore}/100
                  </span>
                </td>
                <td style={{ color: '#4ade80' }}>+{competitor.socialGrowth}%</td>
                <td>
                  <span style={{ backgroundColor: '#374151', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.875rem' }}>
                    {competitor.recentActivity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'rgba(120, 53, 15, 0.2)', border: '1px solid rgba(161, 98, 7, 0.5)', borderRadius: '8px', display: 'flex', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>⚠️</span>
        <div>
          <h4 style={{ fontWeight: 'bold', color: '#eab308', margin: 0 }}>Competitive Gap Alert</h4>
          <p style={{ color: 'rgba(254, 240, 138, 0.8)', fontSize: '0.875rem', marginTop: '4px' }}>
            Competitor A is outperforming in Market Share by 10%. Their recent "Price Drop" strategy is gaining traction. 
            <button style={{ color: '#facc15', textDecoration: 'underline', marginLeft: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>View Recommendations</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompetitorIntelligence;
