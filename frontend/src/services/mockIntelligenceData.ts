
export interface SentimentData {
  source: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  score: number;
  trend: 'up' | 'down' | 'stable';
  details: string;
}

export interface CompetitorData {
  name: string;
  marketShare: number;
  sentimentScore: number;
  socialGrowth: number;
  recentActivity: string;
}

export interface RiskAlert {
  id: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  type: string;
  description: string;
  timestamp: string;
  status: 'New' | 'Investigating' | 'Resolved';
}

export const mockSentimentData: SentimentData[] = [
  { source: 'Twitter (X)', sentiment: 'Negative', score: 35, trend: 'down', details: 'High volume of complaints regarding recent UI update.' },
  { source: 'App Store', sentiment: 'Positive', score: 88, trend: 'up', details: 'Users praising the new speed improvements.' },
  { source: 'LinkedIn', sentiment: 'Neutral', score: 60, trend: 'stable', details: 'Mixed reactions to corporate announcement.' },
  { source: 'Trustpilot', sentiment: 'Negative', score: 42, trend: 'down', details: 'Recurring issues with customer support response times.' },
    { source: 'Instagram', sentiment: 'Positive', score: 75, trend: 'up', details: 'Influencer campaign generating positive engagement.' },
];

export const mockCompetitorData: CompetitorData[] = [
  { name: 'Your Brand', marketShare: 25, sentimentScore: 65, socialGrowth: 12, recentActivity: 'Product Launch' },
  { name: 'Competitor A', marketShare: 35, sentimentScore: 72, socialGrowth: 15, recentActivity: 'Price Drop' },
  { name: 'Competitor B', marketShare: 15, sentimentScore: 55, socialGrowth: 5, recentActivity: 'CEO Scandal' },
];

export const mockRiskAlerts: RiskAlert[] = [
  { id: '1', severity: 'Critical', type: 'Fraud Detection', description: 'Possible credit card testing attack detected from IP block 192.168.x.x', timestamp: '2023-10-27 14:30', status: 'New' },
  { id: '2', severity: 'High', type: 'Brand Impersonation', description: 'Fake social media account impersonating support detected.', timestamp: '2023-10-27 10:15', status: 'Investigating' },
  { id: '3', severity: 'Medium', type: 'Negative Viral Post', description: 'Viral tweet with >10k retweets mentioning product defect.', timestamp: '2023-10-26 18:00', status: 'Resolved' },
];

export const getIntelligenceSummary = () => {
    return {
        overallSentiment: 60,
        pendingRisks: 2,
        competitorGap: -7 // lagging by 7 points in sentiment
    }
}
