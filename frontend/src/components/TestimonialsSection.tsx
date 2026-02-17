
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section container">
       <div className="features-intro">
        <div className="section-badge">Testimonials</div>
        <h2>Real Results from AI Implementation</h2>
        <p className="section-sub">
          Success stories from organizations that have embraced AI to transform
          their operations.
        </p>
      </div>

      <div className="testimonial-slider">
        <button className="nav-btn prev">‹</button>
        
        <div className="testimonial-card">
          <p className="quote">
            "Their AI solution was precisely tailored to our unique challenges, and their
            implementation support was exceptional. Within just three months, we saw
            dramatic improvements that directly impacted our bottom line."
          </p>
          
          <div className="client-info">
            <div className="client-avatar"></div>
            <div className="client-details">
              <h4>Michael Wickson</h4>
              <span>Sales Manager</span>
            </div>
            <div className="client-logo">Starshift</div>
          </div>
        </div>

        <button className="nav-btn next">›</button>
      </div>

      <div className="trusted-by">
        <p>Trusted By +120 Industry Leaders</p>
        <div className="logos-row">
           <span>contentful</span>
           <span>databricks</span>
           <span>exabeam</span>
           <span>Outreach</span>
           <span>loom</span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
