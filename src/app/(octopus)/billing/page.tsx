'use client';

import { useState } from 'react';
import OctopusLayout from '@/components/layout/OctopusLayout';

type BillingCycle = 'monthly' | 'yearly';
type PlanType = 'explore' | 'launch' | 'grow' | 'enterprise';

interface Plan {
  id: PlanType;
  name: string;
  tagline: string;
  icon: string;
  price: {
    monthly: number;
    yearly: number;
  };
  badge?: string;
  badgeColor?: string;
  commission: string;
  aiCredits: string;
  liveSessions: string;
  chats: string;
  features: string[];
  cta: string;
  recommended?: boolean;
}

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [currentPlan] = useState<PlanType>('launch');
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);

  const plans: Plan[] = [
    {
      id: 'explore',
      name: 'Explore',
      tagline: 'Step into the world of knowledge.',
      icon: 'fa-compass',
      price: { monthly: 0, yearly: 0 },
      badge: 'Free Forever',
      badgeColor: 'blue',
      commission: 'N/A (Buyer only)',
      aiCredits: 'Basic AI recommendations',
      liveSessions: 'N/A',
      chats: '20/month',
      features: [
        'Interact with spaces & posts',
        'Share text & images (no video uploads)',
        'Basic AI recommendations',
        'Basic profile credibility',
        'Browse marketplace (+3% fee on purchases)',
        'Standard support'
      ],
      cta: 'Current Plan'
    },
    {
      id: 'launch',
      name: 'MUAB Launch',
      tagline: 'Start creating value and earning.',
      icon: 'fa-rocket',
      price: { monthly: 0, yearly: 0 },
      badge: 'Free 🔥 Limited Time',
      badgeColor: 'red',
      commission: '30% commission',
      aiCredits: '10 AI credits',
      liveSessions: 'Up to 2/month',
      chats: '100/month',
      features: [
        'Everything in Explore, plus:',
        'Unlimited posts (images, videos, shorts, text)',
        'Create unlimited digital products',
        'Access to Octopus System (AI Business Suite)',
        'AI Assistant + 10 AI credits',
        'Withdraw via bank, crypto, or PayPal',
        'Priority support'
      ],
      cta: 'Start Free',
      recommended: true
    },
    {
      id: 'grow',
      name: 'MUAB Grow',
      tagline: 'Boost your brand. Grow your knowledge business.',
      icon: 'fa-chart-line',
      price: { monthly: 59, yearly: 590 },
      commission: '15% commission',
      aiCredits: '50 AI credits',
      liveSessions: 'Unlimited',
      chats: '200/month',
      features: [
        'Everything in Launch, plus:',
        'AI Assistant + 50 AI credits',
        'Unlimited Live sessions',
        'Stronger visibility & recommendations',
        'Professional credibility badge',
        'Advanced video protection (anti-download)',
        'Priority support'
      ],
      cta: 'Upgrade'
    },
    {
      id: 'enterprise',
      name: 'MUAB Enterprise',
      tagline: 'Scale your knowledge business with dedicated support.',
      icon: 'fa-building',
      price: { monthly: -1, yearly: -1 },
      badge: 'Custom Pricing',
      badgeColor: 'purple',
      commission: '10% commission',
      aiCredits: '100 AI credits',
      liveSessions: 'Unlimited',
      chats: '500/month',
      features: [
        'Everything in Grow, plus:',
        'AI Assistant + 100 AI credits',
        'Top-tier recognition & premium recommendations',
        'Generate certificates for your products',
        'Team collaboration features',
        'Dedicated account manager',
        'Custom SLA'
      ],
      cta: 'Talk to Sales'
    }
  ];

  const usage = {
    products: 12,
    productsLimit: 'Unlimited',
    liveSessions: 1,
    liveSessionsLimit: 2,
    aiCredits: 3,
    aiCreditsLimit: 10,
    chats: 45,
    chatsLimit: 100
  };

  const getPlanPrice = (plan: Plan) => {
    if (plan.price.monthly === -1) return 'Custom';
    if (plan.price.monthly === 0) return 'Free';
    const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
    return `$${price}`;
  };

  const getSavings = (plan: Plan) => {
    if (plan.price.yearly === 0 || plan.price.monthly === 0 || plan.price.monthly === -1) return null;
    const yearlyCost = plan.price.monthly * 12;
    const savings = yearlyCost - plan.price.yearly;
    return savings;
  };

  return (
    <OctopusLayout accountType="professional">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing & Plans</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your subscription and explore upgrade options</p>
        </div>

        {/* Current Plan Card */}
        <div className="bg-linear-to-br from-purple-600 to-cyan-600 rounded-2xl p-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <i className="fas fa-rocket text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">MUAB Launch</h2>
                  <p className="text-white/90">Free Forever (Limited Time Offer)</p>
                </div>
              </div>
              <p className="text-white/90 mb-4">You're on the Launch plan with full access to the Octopus System</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-white/70 mb-1">Commission</p>
                  <p className="text-xl font-bold">30%</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-white/70 mb-1">AI Credits</p>
                  <p className="text-xl font-bold">10/mo</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-white/70 mb-1">Live Sessions</p>
                  <p className="text-xl font-bold">2/mo</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-white/70 mb-1">Chats</p>
                  <p className="text-xl font-bold">100/mo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/90">Live Sessions Used</span>
                <span className="text-sm font-semibold">{usage.liveSessions}/{usage.liveSessionsLimit}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${(usage.liveSessions / usage.liveSessionsLimit) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/90">AI Credits Used</span>
                <span className="text-sm font-semibold">{usage.aiCredits}/{usage.aiCreditsLimit}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${(usage.aiCredits / usage.aiCreditsLimit) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Yearly
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">Save 17%</span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = plan.id === currentPlan;
            const savings = getSavings(plan);

            return (
              <div
                key={plan.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all relative ${
                  plan.recommended
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-105'
                    : isCurrentPlan
                    ? 'border-green-500'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
                      Recommended
                    </span>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      Current
                    </span>
                  </div>
                )}

                {/* Plan Badge */}
                {plan.badge && (
                  <div className="mb-4">
                    <span className={`px-3 py-1 bg-${plan.badgeColor}-100 text-${plan.badgeColor}-700 dark:bg-${plan.badgeColor}-900/30 dark:text-${plan.badgeColor}-400 text-xs font-bold rounded-full`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-600 to-cyan-600 flex items-center justify-center mb-4">
                  <i className={`fas ${plan.icon} text-2xl text-white`}></i>
                </div>

                {/* Plan Info */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{plan.tagline}</p>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {getPlanPrice(plan)}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-600 dark:text-gray-400">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && savings && savings > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Save ${savings}/year (≈ 2 months free)
                    </p>
                  )}
                </div>

                {/* Key Metrics */}
                <div className="space-y-2 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Commission</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{plan.commission}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">AI Credits</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{plan.aiCredits}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Live Sessions</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{plan.liveSessions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Chats</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{plan.chats}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <i className="fas fa-check text-green-600 dark:text-green-400 mt-0.5 shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    if (plan.id === 'enterprise') {
                      setShowEnterpriseModal(true);
                    } else {
                      alert(`${plan.cta} - ${plan.name}`);
                    }
                  }}
                  disabled={isCurrentPlan}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    isCurrentPlan
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : plan.recommended
                      ? 'bg-linear-to-br from-purple-600 to-cyan-600 text-white hover:shadow-lg'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                  }`}
                >
                  {isCurrentPlan ? 'Current Plan' : plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detailed Feature Comparison</h2>
            <p className="text-gray-600 dark:text-gray-400">Compare all features across plans</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 text-sm font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center p-4 text-sm font-semibold text-gray-900 dark:text-white">Explore</th>
                  <th className="text-center p-4 text-sm font-semibold text-gray-900 dark:text-white">Launch</th>
                  <th className="text-center p-4 text-sm font-semibold text-gray-900 dark:text-white">Grow</th>
                  <th className="text-center p-4 text-sm font-semibold text-gray-900 dark:text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Digital Product Creation', values: ['—', 'Unlimited', 'Unlimited', 'Unlimited + Team'] },
                  { name: 'Octopus System Access', values: ['—', '✓', '✓', '✓'] },
                  { name: 'Video Protection', values: ['—', '—', 'Advanced', 'Advanced'] },
                  { name: 'Live Sessions/Month', values: ['—', '2', 'Unlimited', 'Unlimited'] },
                  { name: 'AI Credits/Month', values: ['Basic', '10', '50', '100'] },
                  { name: 'Commission Rate', values: ['N/A', '30%', '15%', '10%'] },
                  { name: 'Chats/Month', values: ['20', '100', '200', '500'] },
                  { name: 'Credibility Badge', values: ['Basic', '✓', 'Professional', 'Enterprise'] },
                  { name: 'Certificate Generation', values: ['—', '—', '—', '✓'] },
                  { name: 'Team Collaboration', values: ['—', '—', '—', '✓'] },
                  { name: 'Dedicated Manager', values: ['—', '—', '—', '✓'] },
                  { name: 'Support', values: ['Standard', 'Priority', 'Priority', 'Dedicated'] }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="p-4 text-sm text-gray-900 dark:text-white font-medium">{row.name}</td>
                    {row.values.map((value, vIdx) => (
                      <td key={vIdx} className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        {value === '✓' ? (
                          <i className="fas fa-check text-green-600 dark:text-green-400"></i>
                        ) : value === '—' ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Can I change my plan anytime?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">What's the commission rate?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Launch: 30%, Grow: 15%, Enterprise: 10%. This is the fee MUAB takes from your sales.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">How does the yearly billing work?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yearly plans save you approximately 2 months of cost. You pay upfront for the year and get all the benefits immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Modal */}
        {showEnterpriseModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Talk to Sales</h2>
                <button
                  onClick={() => setShowEnterpriseModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
                >
                  <i className="fas fa-times text-gray-600 dark:text-gray-400"></i>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <input
                  type="email"
                  placeholder="Work Email *"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <input
                  type="text"
                  placeholder="Company / Institution *"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all">
                  <option>Role *</option>
                  <option>Founder</option>
                  <option>Instructor</option>
                  <option>Manager</option>
                  <option>Other</option>
                </select>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all">
                  <option>Audience Size *</option>
                  <option>&lt;500</option>
                  <option>500–5k</option>
                  <option>5k–20k</option>
                  <option>20k+</option>
                </select>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all">
                  <option>Main Goal *</option>
                  <option>Sell & monetise digital products</option>
                  <option>Scale training & education programs</option>
                  <option>Build a strong brand in the knowledge network</option>
                  <option>Internal learning & staff development</option>
                </select>
                <input
                  type="text"
                  placeholder="Features You Need Most (e.g., Certificates, Advanced payouts)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all">
                  <option>When Do You Plan to Start? *</option>
                  <option>Now</option>
                  <option>1–3 months</option>
                  <option>Exploring</option>
                </select>
                <button className="w-full py-3 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Submit Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
