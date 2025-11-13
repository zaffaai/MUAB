'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleGoogleLogin = () => {
    console.log('Google OAuth login');
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      alert('Invalid credentials. Try:\n• business@muab.info\n• personal@muab.info\n• company@muab.info\n• enterprise@muab.info\n• institute@muab.info\n\nPassword: test123!');
    }
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtpInput) {
      setShowOtpInput(true);
      console.log('Send OTP to:', phone);
    } else {
      console.log('Verify OTP:', { phone, otp });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Settings & Language - Top Left */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <button className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-md transition-all">
          <i className="fas fa-cog text-gray-600 dark:text-gray-400"></i>
        </button>
        <select className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:shadow-md transition-all">
          <option>English</option>
          <option>العربية</option>
          <option>Español</option>
        </select>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-linear-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              MUAB
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Please login to continue</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
                activeTab === 'email'
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-envelope mr-2"></i>
              Email Login
              {activeTab === 'email' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600 to-cyan-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('phone')}
              className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
                activeTab === 'phone'
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-mobile-alt mr-2"></i>
              Phone Login
              {activeTab === 'phone' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600 to-cyan-600"></div>
              )}
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Email Login */}
            {activeTab === 'email' && (
              <form onSubmit={handleEmailLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-linear-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  Sign In
                </button>
              </form>
            )}

            {/* Phone Login */}
            {activeTab === 'phone' && (
              <form onSubmit={handlePhoneLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select className="px-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>+1</option>
                      <option>+20</option>
                      <option>+44</option>
                      <option>+966</option>
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="123 456 7890"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {showOtpInput && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Enter OTP Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      maxLength={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-center text-2xl tracking-widest font-semibold"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                      Didn't receive code? <button type="button" className="text-purple-600 font-medium">Resend</button>
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-linear-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  {showOtpInput ? 'Verify & Sign In' : 'Send OTP'}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Google OAuth */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Enterprise Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Looking for Enterprise?{' '}
            <Link href="/enterprise" className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400">
              Contact Sales
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
