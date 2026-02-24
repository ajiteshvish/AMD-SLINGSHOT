import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-6 lg:px-12 pt-32 pb-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-400 mb-12">Last updated: February 24, 2025</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>ReviewDekho ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our AI-powered trust intelligence platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li><strong className="text-gray-300">Account Information:</strong> email address, name, and authentication credentials</li>
              <li><strong className="text-gray-300">Usage Data:</strong> pages visited, features used, and interaction patterns</li>
              <li><strong className="text-gray-300">Seller Data:</strong> publicly available marketplace information submitted for trust analysis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Privacy-First AI Processing</h2>
            <p>ReviewDekho is designed with a <strong className="text-white">privacy-first architecture</strong>. All AI inference — including sentiment analysis and trust scoring — runs <strong className="text-white">locally on AMD hardware</strong> using ONNX Runtime. No review text, seller data, or analysis results are transmitted to external cloud AI services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>To provide and maintain the trust intelligence service</li>
              <li>To generate trust scores and risk assessments</li>
              <li>To improve our AI models and platform functionality</li>
              <li>To communicate important service updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Storage &amp; Security</h2>
            <p>Account and metadata are stored securely in Supabase with encryption at rest and in transit. AI model weights and inference outputs remain on the local deployment environment and are never uploaded to third-party servers.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Sharing</h2>
            <p>We do not sell, rent, or share your personal information with third parties for marketing purposes. We may share aggregated, anonymized data for research or improvement purposes only.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
            <p>ReviewDekho uses essential cookies for authentication and session management. We do not use third-party advertising or tracking cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page with a revised date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@reviewdekho.ai" className="text-blue-400 hover:underline">privacy@reviewdekho.ai</a>.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
