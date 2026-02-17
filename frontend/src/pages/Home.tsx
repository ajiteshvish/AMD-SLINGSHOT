
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import DashboardPreview from '../components/DashboardPreview';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ScrollReveal from '../components/ui/ScrollReveal';

const Home = () => {
  return (
    <div className="home-wrapper">
      <Navbar />
      <HeroSection />
      
      {/* Visual preview of dashboard for landing page */}
      <ScrollReveal>
        <DashboardPreview />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <FeaturesSection />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <TestimonialsSection />
      </ScrollReveal>
      
      <footer style={{ padding: '40px 0', textAlign: 'center', color: '#666', borderTop: '1px solid #222' }}>
        <div className="container">
          <p>© 2023 Trustora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
