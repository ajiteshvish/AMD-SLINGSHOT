
import React from 'react';
import { mockRiskAlerts } from '../../../services/mockIntelligenceData';
import '../Intelligence.css';

const RiskMonitoring: React.FC = () => {
    return (
        <div className="intelligence-panel" style={{ marginTop: '32px' }}>
            <h2 className="panel-title">
                Risk Monitoring
                <span style={{ marginLeft: '12px', fontSize: '0.75rem', backgroundColor: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '9999px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>Live</span>
            </h2>

            <div className="risk-list">
                {mockRiskAlerts.map((alert) => (
                    <div key={alert.id} className="risk-card">
                        <div style={{ flex: 1 }}>
                            <div className="risk-meta">
                                <span className={`severity-badge ${
                                    alert.severity === 'Critical' ? 'sev-critical' :
                                    alert.severity === 'High' ? 'sev-high' : 'sev-medium'
                                }`}>
                                    {alert.severity}
                                </span>
                                <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{alert.timestamp}</span>
                            </div>
                            <h3 className="risk-header">{alert.type}</h3>
                            <p className="risk-desc">{alert.description}</p>
                        </div>
                        
                        <div className="risk-actions">
                             <span className={`status-badge ${
                                 alert.status === 'New' ? 'status-new' :
                                 alert.status === 'Investigating' ? 'status-investigating' : 'status-resolved'
                             }`}>
                                 Status: {alert.status}
                             </span>
                             <button className="btn-resolve">
                                 Resolve
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RiskMonitoring;
