
import React, { useState } from 'react';
import SentimentAnalysis from './components/SentimentAnalysis';
import CompetitorIntelligence from './components/CompetitorIntelligence';
import RiskMonitoring from './components/RiskMonitoring';
import LivePlayground from './components/LivePlayground';
import './Intelligence.css';

const IntelligenceDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'sentiment' | 'competitors' | 'risk' | 'playground'>('sentiment');

    return (
        <div className="intelligence-dashboard">
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1 className="dashboard-title">
                        Intelligence Dashboard
                    </h1>
                    <p className="dashboard-subtitle">AI-Powered insights for your brand.</p>
                </header>

                <div className="tabs-container">
                    <button
                        onClick={() => setActiveTab('sentiment')}
                        className={`tab-button ${activeTab === 'sentiment' ? 'active-sentiment' : 'inactive'}`}
                    >
                        Sentiment Analysis
                        {activeTab === 'sentiment' && <div className="tab-indicator bg-blue"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('competitors')}
                        className={`tab-button ${activeTab === 'competitors' ? 'active-competitors' : 'inactive'}`}
                    >
                        Competitor Intelligence
                        {activeTab === 'competitors' && <div className="tab-indicator bg-blue"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('risk')}
                        className={`tab-button ${activeTab === 'risk' ? 'active-risk' : 'inactive'}`}
                    >
                        Risk Monitoring
                         {activeTab === 'risk' && <div className="tab-indicator bg-red"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('playground')}
                        className={`tab-button ${activeTab === 'playground' ? 'text-primary border-b-2 border-primary' : 'inactive'}`}
                    >
                        Live AI Playground
                        {activeTab === 'playground' && <div className="tab-indicator bg-primary"></div>}
                    </button>
                </div>

                <div className="animate-fade-in">
                    {activeTab === 'sentiment' && <SentimentAnalysis />}
                    {activeTab === 'competitors' && <CompetitorIntelligence />}
                    {activeTab === 'risk' && <RiskMonitoring />}
                    {activeTab === 'playground' && <LivePlayground />}
                </div>
            </div>
        </div>
    );
};

export default IntelligenceDashboard;
