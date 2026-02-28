import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';
import Navbar from '../components/Navbar';

const teamMembers = [
  {
    name: 'Sejal Choudhary',
    role: 'Backend & AI Integration',
    bio: 'Handles backend architecture, API development, database management, and integration of AI models. Responsible for implementing sentiment analysis, fake review detection, trust score computation, and ensuring scalable and secure data processing.',
    image: '/team/team-sejal.jpeg',
    linkedin: 'https://www.linkedin.com/in/sejal-choudhary-910301348/',
    github: '#',
  },
  {
    name: 'Ajitesh Vishwakarma',
    role: 'AMD Integration & Optimization Lead',
    bio: 'Optimizes AI model performance using AMD technologies such as ONNX Runtime, ROCm, ZenDNN, and INT8 quantization. Ensures efficient inference, reduced latency, hardware acceleration, and scalable deployment aligned with AMD ecosystem requirements.',
    image: '/team/team-ajitesh.jpeg',
    linkedin: 'https://www.linkedin.com/in/ajiteshvish',
    github: '#',
  },
  {
    name: 'Nandita Rai',
    role: 'Frontend & UI/UX',
    bio: 'Responsible for designing and developing the user interface of ReviewDekho, ensuring an intuitive, responsive, and visually appealing experience. Focuses on dashboard design, seller comparison views, trust score visualization, and seamless user interaction using modern SaaS UI principles.',
    image: '/team/team-nandita.jpeg',
    linkedin: 'https://www.linkedin.com/in/nandita-rai-510bb82aa/',
    github: '#',
  },
];

const OurTeam = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <BlurFade delay={0.2} inView>
            <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-4">Meet The Team</p>
          </BlurFade>
          <BlurFade delay={0.3} inView>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6">
              The People Behind{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                ReviewDekho
              </span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
              A passionate team of engineers building trust intelligence for online marketplaces — powered by AMD technology.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Team Cards */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.1)]"
            >
              {/* Full Image */}
              <div className="relative w-full aspect-[2/3] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0 pointer-events-none" />
              </div>

              {/* HeroUI-style Blurred Footer */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <div className="backdrop-blur-xl bg-black/40 border border-white/20 rounded-xl p-5 shadow-lg min-h-[170px] h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-0.5">{member.name}</h3>
                        <p className="text-blue-400 text-[11px] font-bold uppercase tracking-widest">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{member.bio}</p>
                  </div>
                  <div className="mt-auto">
                    <a
                      href={member.linkedin}
                      className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={16} className="text-[#0A66C2] group-hover:text-[#0A66C2] transition-colors" /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">© 2026 ReviewDekho. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default OurTeam;
