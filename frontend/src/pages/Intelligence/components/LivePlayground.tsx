import React, { useState } from 'react';
import { api } from '../../../services/api';
import { Activity, Cpu } from 'lucide-react';
import '../Intelligence.css';

const LivePlayground: React.FC = () => {
    const [reviewText, setReviewText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!reviewText.trim()) return;
        
        setIsAnalyzing(true);
        setError(null);
        
        try {
            // Send the single review wrapped in an array as expected by the backend
            const response = await api.analyzeCustomText([reviewText]);
            if (response && response.results && response.results.length > 0) {
                 setResult({
                     metrics: response.execution_metrics,
                     analysis: response.results[0]
                 });
            }
        } catch (err: any) {
            console.error("Analysis Failed", err);
            setError(err.message || 'Failed to connect to AMD Inference Engine');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="intelligence-panel mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="panel-title flex items-center gap-2 m-0">
                    Live AI Playground
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full animate-pulse font-normal tracking-wide">
                        Live Demo
                    </span>
                </h2>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-input/20 border border-border px-3 py-1.5 rounded-full">
                    <Cpu size={14} className="text-primary"/> 
                    Powered by AMD ONNX Runtime
                </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
                Paste any e-commerce review below. Our edge AI models will instantly calculate its sentiment and authenticity using local AMD hardware acceleration.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="flex flex-col gap-4">
                    <textarea 
                        className="w-full h-48 bg-background border border-border rounded-xl p-4 text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all shadow-inner"
                        placeholder="Paste a suspicious or authentic review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        disabled={isAnalyzing}
                    />
                    
                    <button 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !reviewText.trim()}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            isAnalyzing || !reviewText.trim() 
                            ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                            : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/20'
                        }`}
                    >
                        {isAnalyzing ? (
                            <>
                                <Activity className="animate-spin" size={18} />
                                Running AMD Inference...
                            </>
                        ) : (
                            <>
                                <Cpu size={18} />
                                Analyze via AMD AI
                            </>
                        )}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                {/* Output/Telemetry Section */}
                <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden shadow-sm">
                    {/* Background subtle styling */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                    
                    {!result ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                            <Cpu size={48} className="mb-4 text-border" />
                            <p>Awaiting input for edge inference...</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-border pb-2">
                                Analysis Results
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {/* Authenticity Score */}
                                <div className="bg-background border border-border p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Authenticity</p>
                                    <div className="text-3xl font-black flex items-center gap-2 mb-1">
                                        {Math.round(result.analysis.authenticity_score * 100)}%
                                    </div>
                                    <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                        result.analysis.authenticity_score >= 0.7 
                                        ? 'bg-green-500/10 text-green-500' 
                                        : 'bg-red-500/10 text-red-500'
                                    }`}>
                                        {result.analysis.authenticity_score >= 0.7 ? 'Likely Real' : 'Likely Fake'}
                                    </div>
                                </div>
                                
                                {/* Sentiment Score */}
                                <div className="bg-background border border-border p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Sentiment</p>
                                    <div className="text-3xl font-black mb-1">
                                        {result.analysis.sentiment_score > 0 ? '+' : ''}{Math.round(result.analysis.sentiment_score * 100)}%
                                    </div>
                                    <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                        result.analysis.sentiment_score > 0.2
                                        ? 'bg-green-500/10 text-green-500' 
                                        : result.analysis.sentiment_score < -0.2
                                        ? 'bg-red-500/10 text-red-500'
                                        : 'bg-yellow-500/10 text-yellow-500'
                                    }`}>
                                        {result.analysis.sentiment_score > 0.2 ? 'Positive' : result.analysis.sentiment_score < -0.2 ? 'Negative' : 'Neutral'}
                                    </div>
                                </div>
                            </div>

                            {/* AMD Telemetry Dashboard */}
                            <div className="mt-auto bg-black/5 dark:bg-black/20 border border-primary/20 rounded-xl p-4 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                                <h4 className="text-xs uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-2 mb-3">
                                    <Activity size={12}/> AMD Hardware Telemetry
                                </h4>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                                        <span className="text-muted-foreground">Execution Provider</span>
                                        <span className="font-mono text-primary font-bold text-right max-w-[150px] truncate" title={result.metrics.provider}>
                                            {result.metrics.provider}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Inference Latency</span>
                                        <span className="font-mono font-bold text-foreground bg-background px-2 py-0.5 rounded border border-border shadow-sm">
                                            {result.metrics.ms_per_item} ms
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LivePlayground;
