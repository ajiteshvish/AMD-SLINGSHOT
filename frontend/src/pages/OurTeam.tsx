import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';
import Navbar from '../components/Navbar';

const teamMembers = [
  {
    name: 'Sejal Choudhary',
    role: 'AI/ML Engineer',
    bio: 'Specializes in building intelligent systems with deep expertise in NLP and sentiment analysis. Drives the core trust-scoring engine behind ReviewDekho.',
    image: '/team/team-sejal.jpeg',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Nandita Rai',
    role: 'Full Stack Developer',
    bio: 'Passionate about crafting beautiful, performant web applications. Architects the frontend experience and backend API integrations that power ReviewDekho.',
    image: '/team/team-nandita.jpeg',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Ajitesh Vishwakarma',
    role: 'Backend & AMD Integration Lead',
    bio: 'Expert in AMD hardware optimization and backend architecture. Ensures ReviewDekho runs at peak performance using ROCm, ZenDNN, and ONNX Runtime.',
    image: '/team/team-ajitesh.jpeg',
    linkedin: '#',
    github: '#',
  },
];

const OurTeam = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar logoHeight={60} />

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
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
              <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* HeroUI-style Blurred Footer */}
              <div className="absolute bottom-2 left-2 right-2 z-10">
                <div className="backdrop-blur-xl bg-black/30 border border-white/20 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                      <p className="text-blue-300 text-xs font-medium uppercase tracking-wider">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed mb-3">{member.bio}</p>
                  <div className="flex gap-2">
                    <a
                      href={member.linkedin}
                      className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center gap-1.5 text-xs"
                    >
                      <Linkedin size={12} /> LinkedIn
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
