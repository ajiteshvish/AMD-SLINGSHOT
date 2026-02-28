import { useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: isAnnual ? "Free" : "Free",
      description: "For individual buyers exploring seller trust",
      features: [
        "5 seller lookups per day",
        "Basic trust scores",
        "Email support",
        "Access to community forums"
      ],
      cta: "Get Started Free",
      highlighted: false,
      onClick: () => navigate('/login')
    },
    {
      name: "Pro",
      price: isAnnual ? "$249/yr" : "$29/mo",
      description: "For power users & small teams",
      features: [
        "Unlimited seller lookups",
        "Advanced AI trust scores",
        "Compare sellers side-by-side",
        "Real-time fraud alerts",
        "Priority support",
        "Detailed trust reports"
      ],
      cta: "Start 14-day Free Trial",
      highlighted: true,
      onClick: () => alert('14-day free trial is coming soon! Stay tuned.')
    }
  ];

  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Plans and Pricing
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 mb-6">
            Receive unlimited credits when you pay yearly, and save on your plan.
          </p>

          <div className="inline-flex items-center bg-white/[0.03] rounded-full p-1">
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${!isAnnual
                  ? 'bg-white/[0.1] text-white'
                  : 'text-zinc-400 hover:text-white'
                }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${isAnnual
                  ? 'bg-white/[0.1] text-white'
                  : 'text-zinc-400 hover:text-white'
                }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual
            </button>
          </div>
        </div>

        {/* Changed to grid-cols-2 since we removed the 3rd plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${plan.highlighted
                  ? 'border-white/20 bg-white/[0.02] scale-[1.02] shadow-xl'
                  : 'border-white/[0.08] hover:border-white/10'
                } p-6 transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-[2px]" />
                    <div className="relative px-4 py-1.5 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block w-1 h-1 rounded-full bg-white/60 animate-pulse" />
                        <span className="text-xs font-medium text-white/80">Most Popular</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== "Custom" && plan.price !== "Free" && (
                    <span className="text-sm text-zinc-400">
                      per user
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400 mt-4">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-white/30" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex-grow"></div>
              
              <button
                onClick={plan.onClick}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-colors mt-auto ${plan.highlighted
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'border border-white/10 text-white hover:bg-white/[0.03]'
                  }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
