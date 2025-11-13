'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, getItemCount, clearCart } = useCartStore();
  
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [processing, setProcessing] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const totalPrice = getTotalPrice();
  const itemCount = getItemCount();

  // Redirect if cart is empty
  if (itemCount === 0) {
    router.push('/cart');
    return null;
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && country) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert('Please fill in all payment details');
      return;
    }

    setProcessing(true);
    
    // Simulate Stripe payment processing
    setTimeout(() => {
      // In real app, integrate with Stripe API here
      alert('Payment successful! You now have access to all purchased products.');
      clearCart();
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <OctopusLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
            <p className="text-gray-600 dark:text-gray-400">Complete your purchase securely</p>
          </div>
          <Link
            href="/cart"
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Cart
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'info' ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step === 'info' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                1
              </div>
              <span className="font-semibold">Contact Info</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step === 'payment' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                2
              </div>
              <span className="font-semibold">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 'info' ? (
              <form onSubmit={handleInfoSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">Receipt and access details will be sent here</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Country/Region *
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                      >
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="EG">Egypt</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Details</h2>
                    <div className="flex items-center gap-2">
                      <i className="fab fa-cc-visa text-3xl text-blue-600"></i>
                      <i className="fab fa-cc-mastercard text-3xl text-red-600"></i>
                      <i className="fab fa-cc-amex text-3xl text-blue-500"></i>
                      <i className="fab fa-cc-stripe text-3xl text-purple-600"></i>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        required
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5))}
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substr(0, 4))}
                          required
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Save card for future purchases
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <i className="fas fa-shield-alt text-blue-600"></i>
                  <p className="text-sm text-blue-900 dark:text-blue-200">
                    Your payment is secured with 256-bit SSL encryption via Stripe
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('info')}
                    className="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 px-6 py-4 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock mr-2"></i>
                        Pay ${totalPrice.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.creatorName}</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 py-4 border-y border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xl font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span>Instant access to all content</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span>Lifetime updates included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OctopusLayout>
  );
}
