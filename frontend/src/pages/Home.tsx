import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, Database, Cpu, Eye, Radar, Bell, Fingerprint, LayoutDashboard, Lock } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { GlowButton } from '@/components/ui/pulse-beams';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import Pricing from '@/components/ui/pricing-component';
import { BlurFade } from '@/components/ui/blur-fade';
import { MacbookScroll } from '@/components/ui/macbook-scroll';
import { cn } from '@/lib/utils';
import Navbar from '../components/Navbar';
import './Home.css';

const reviewDekhoTimelineData = [
  {
    id: 1,
    title: "ONNX Runtime",
    date: "Core Engine",
    content: "The backbone of ReviewDekho's AI. ONNX Runtime executes our sentiment analysis and trust-scoring models with hardware-accelerated inference, delivering sub-20ms latency per review — fast enough for real-time seller evaluation.",
    category: "inference",
    icon: Cpu,
    relatedIds: [2, 3, 4],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "ROCm",
    date: "GPU Compute",
    content: "AMD's open-source GPU compute platform serves as the execution provider for ONNX Runtime. ROCm unlocks the full power of Radeon GPUs for parallel AI inference, dramatically speeding up batch review analysis.",
    category: "acceleration",
    icon: Radar,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "ZenDNN",
    date: "CPU Optimization",
    content: "AMD's deep neural network library optimized for Zen CPU architectures. When GPU isn't available, ZenDNN ensures our trust models still run at peak CPU performance — making ReviewDekho fast on any AMD machine.",
    category: "optimization",
    icon: ShieldCheck,
    relatedIds: [1, 2, 4],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "INT8 Quantization",
    date: "Model Compression",
    content: "Our sentiment and trust-scoring models are quantized to INT8 precision, reducing model size by 4× and boosting inference throughput — enabling edge deployment on resource-constrained AMD devices without sacrificing accuracy.",
    category: "quantization",
    icon: BarChart3,
    relatedIds: [1, 5, 6],
    status: "in-progress" as const,
    energy: 80,
  },
  {
    id: 5,
    title: "Ryzen AI",
    date: "On-Device AI",
    content: "Enables ReviewDekho to run entirely on AMD Ryzen laptops with dedicated AI accelerators. All seller data stays on-device — zero cloud dependency means complete privacy and offline-capable trust analysis.",
    category: "edge",
    icon: Eye,
    relatedIds: [4, 6],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 6,
    title: "Vitis AI",
    date: "FPGA Deploy",
    content: "AMD's development platform for deploying optimized AI models on FPGA and adaptive SoC accelerators. Vitis AI enables ultra-low-latency trust scoring for high-throughput marketplace environments.",
    category: "deployment",
    icon: Database,
    relatedIds: [4, 5],
    status: "pending" as const,
    energy: 65,
  },
];

const Home = () => {
  return (
    <div className="home-page">
      <div className="dotted-pattern pointer-events-none"></div>
      <Navbar logoHeight={60} /> {/* Increase this value to make logo bigger */}
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20 pb-12">
        
        {/* Animated Background Orbs - Simplified for performance */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]"></div>

        <div className="container relative z-20 mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center">


          <BlurFade delay={0.25} inView>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-tight max-w-5xl">
              Unlock The Power Of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Trust Intelligence
              </span>
            </h1>
          </BlurFade>



          <BlurFade delay={0.25 * 2} inView>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-light px-4 sm:px-0 tracking-tighter">
              Comprehensive AI solutions for seller verification and risk assessment. Revolutionize how you evaluate trust in online marketplaces without compromising privacy.
            </p>
          </BlurFade>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/register">
              <GlowButton className="text-lg">
                Get Started
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="features" className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <BlurFade delay={0.2} inView>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 mb-6 tracking-tight">
                Everything You Need to<br/>Verify Sellers Instantly
              </h2>
            </BlurFade>
            <BlurFade delay={0.35} inView>
              <p className="text-lg md:text-xl text-gray-400">
                Powerful tools that help you make smarter, safer decisions when buying from online sellers.
              </p>
            </BlurFade>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <GridItem
                icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />}
                title="AI Trust Scores"
                description="Get an instant trust score for any seller — powered by AI that analyzes reviews, ratings, and delivery history in seconds."
              />
              <GridItem
                icon={<BarChart3 className="h-4 w-4 text-blue-400" />}
                title="Compare Sellers"
                description="Put sellers side by side and see who's truly reliable. Visual comparisons make the right choice obvious."
              />
              <GridItem
                icon={<Bell className="h-4 w-4 text-amber-400" />}
                title="Real-Time Alerts"
                description="Get notified instantly when a seller's trust score drops or suspicious activity is detected — stay protected 24/7."
              />
              <GridItem
                icon={<Fingerprint className="h-4 w-4 text-red-400" />}
                title="Fraud Detection"
                description="Our AI flags fake reviews, suspicious patterns, and scam indicators so you never fall for a dishonest seller."
              />
              <GridItem
                icon={<LayoutDashboard className="h-4 w-4 text-indigo-400" />}
                title="Smart Dashboard"
                description="See all your tracked sellers, trending risks, and trust insights in one beautiful, easy-to-read dashboard."
              />
              <GridItem
                icon={<Lock className="h-4 w-4 text-purple-400" />}
                title="100% Private"
                description="All analysis runs locally on your device — your data never leaves your machine. Zero cloud dependency."
              />
            </ul>
        </div>
      </section>

      {/* Radial Orbital Timeline */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="text-center pt-24 pb-6 relative z-10 pointer-events-none">
          <BlurFade delay={0.2} inView>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 mb-4 tracking-tight">
              The Trust Analysis Pipeline
            </h2>
          </BlurFade>
          <BlurFade delay={0.35} inView>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Tap any node to explore the AMD tools powering ReviewDekho's real-time seller intelligence.
            </p>
          </BlurFade>
        </div>
        <div className="relative z-50">
          <RadialOrbitalTimeline timelineData={reviewDekhoTimelineData} />
        </div>
      </section>

      {/* Macbook Scroll Section */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="w-full overflow-hidden bg-black">
          <MacbookScroll
            title={
              <span className="text-white">
                See ReviewDekho In Action <br />
                <span className="text-gray-400 text-xl font-normal">Real-time seller intelligence, right on your screen.</span>
              </span>
            }
            src="/dashboard-preview.png"
            showGradient={false}
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <Pricing />
      </section>


      {/* Footer */}
      <footer className="border-t border-white/10 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="col-span-2 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo.png" 
                  alt="ReviewDekho Logo" 
                  style={{ height: '64px' }} /* Adjust this value to change footer logo size */
                  className="w-auto drop-shadow-lg" 
                />
                <h3 className="text-3xl font-bold text-white tracking-tight">ReviewDekho</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-powered trust intelligence for online marketplaces. Built on AMD hardware for privacy-first, real-time seller verification.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">Dashboard</Link></li>
                <li><Link to="/intelligence" className="text-gray-400 hover:text-white transition-colors text-sm">Intelligence</Link></li>
                <li><Link to="/compare" className="text-gray-400 hover:text-white transition-colors text-sm">Compare Sellers</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors text-sm">Get Started</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="https://onnxruntime.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">ONNX Runtime</a></li>
                <li><a href="https://www.amd.com/en/products/software/rocm.html" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">AMD ROCm</a></li>
                <li><a href="https://www.amd.com/en/developer/zendnn.html" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">ZenDNN</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms &amp; Conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2026 ReviewDekho. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">Terms</Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

interface GridItemProps {
  area?: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/5 bg-[#0a0a0a] p-6 shadow-sm md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-white/10 bg-white/5 p-2 text-white">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                {title}
              </h3>
              <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
