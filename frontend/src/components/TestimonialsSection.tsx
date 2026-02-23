import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Their AI solution was precisely tailored to our unique challenges, and their implementation support was exceptional. Within just three months, we saw dramatic improvements that directly impacted our bottom line.",
    author: "Michael Wickson",
    role: "Sales Manager",
    company: "Starshift",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  },
  {
    quote: "Trustora has completely changed how we evaluate marketplace sellers. The reduction in fraudulent transactions and improved customer satisfaction has been remarkable.",
    author: "Sarah Jenkins",
    role: "Head of Trust & Safety",
    company: "GlobalTrade",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    quote: "The deep analytics provided by their platform gave us insights we never knew we needed. It's an indispensable tool for our operations team.",
    author: "David Chen",
    role: "Operations Director",
    company: "NexusRetail",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium tracking-wide inline-block mb-6"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Real Results from <br/>AI Implementation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            Success stories from organizations that have embraced AI to transform their operations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 relative group"
            >
              <div className="absolute top-8 left-8 text-4xl text-blue-500/40 font-serif leading-none">"</div>
              <p className="text-gray-300 mb-8 mt-6 relative z-10 leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.author}</h4>
                  <span className="text-sm text-gray-500">{testimonial.role}, <span className="text-gray-400">{testimonial.company}</span></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center border-t border-white/10 pt-16"
        >
          <p className="text-sm tracking-widest text-gray-500 uppercase font-semibold mb-8">Trusted by industry leaders worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Contentful', 'Databricks', 'Exabeam', 'Outreach', 'Loom'].map((logo, idx) => (
              <span key={idx} className="text-2xl font-bold text-white/80">{logo}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
