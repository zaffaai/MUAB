'use client';

import { useState } from 'react';
import Link from 'next/link';

type AccountType = 'professional' | 'institution' | 'company' | 'enterprise' | null;

export default function BusinessSignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>(null);

  // Step 2 states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Step 3 states
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [handle, setHandle] = useState('');
  const [headline, setHeadline] = useState('');
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);

  // Password strength
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '', checks: [] };
    
    const checks = [
      { valid: password.length >= 8, label: 'At least 8 characters' },
      { valid: /[A-Z]/.test(password), label: 'One uppercase letter' },
      { valid: /[0-9]/.test(password), label: 'One number' },
      { valid: /[^A-Za-z0-9]/.test(password), label: 'One special character' }
    ];
    
    const validCount = checks.filter(c => c.valid).length;
    let strength = 0;
    let label = '';
    
    if (validCount === 1) { strength = 25; label = 'Weak'; }
    else if (validCount === 2) { strength = 50; label = 'Fair'; }
    else if (validCount === 3) { strength = 75; label = 'Good'; }
    else if (validCount === 4) { strength = 100; label = 'Strong'; }
    
    return { strength, label, checks };
  };

  const passwordStrength = getPasswordStrength();

  const accountTypes = [
    {
      id: 'professional',
      name: 'Professional',
      icon: 'fa-user-tie',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      for: 'Individual creators, freelancers, consultants',
      features: [
        'Personal brand space',
        'Course creation tools',
        'Payment processing',
        'Basic analytics'
      ]
    },
    {
      id: 'institution',
      name: 'Institution',
      icon: 'fa-graduation-cap',
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      for: 'Schools, training centers, educational organizations',
      features: [
        'Multi-instructor support',
        'Certificate management',
        'Student analytics',
        'Course bundles'
      ]
    },
    {
      id: 'company',
      name: 'Company',
      icon: 'fa-building',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      for: 'Businesses offering professional training',
      features: [
        'Team collaboration',
        'Advanced branding',
        'Enterprise features',
        'Custom workflows'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: 'fa-crown',
      iconBg: 'bg-gradient-to-br from-purple-500 to-cyan-500',
      iconColor: 'text-white',
      for: 'Custom domain with white-label solutions',
      features: [
        'Dedicated domain',
        'SSO integration',
        'Priority support',
        'Custom development'
      ],
      premium: true
    }
  ];

  const handleStep1Next = () => {
    if (!accountType) {
      alert('Please select an account type');
      return;
    }
    if (accountType === 'enterprise') {
      window.location.href = '/enterprise';
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (passwordStrength.strength < 100) {
      alert('Please create a stronger password');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the Terms and Privacy Policy');
      return;
    }
    setCurrentStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Business signup complete:', {
      accountType,
      fullName,
      email,
      businessName,
      handle,
      headline
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
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

      <div className="max-w-5xl mx-auto">
        {/* Logo & Progress */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-linear-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              MUAB
            </span>
          </h1>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep === step
                    ? 'bg-linear-to-br from-purple-600 to-cyan-600 text-white scale-110'
                    : currentStep > step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {currentStep > step ? <i className="fas fa-check"></i> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-1 rounded ${
                    currentStep > step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            {currentStep === 1 && 'Choose your account type'}
            {currentStep === 2 && 'Create your credentials'}
            {currentStep === 3 && 'Business information'}
          </p>
        </div>

        {/* Step 1: Choose Account Type */}
        {currentStep === 1 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {accountTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setAccountType(type.id as AccountType)}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all text-left hover:shadow-lg ${
                    accountType === type.id
                      ? 'border-purple-500 dark:border-purple-400 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700'
                  } ${type.premium ? 'overflow-hidden' : ''}`}
                >
                  {type.premium && (
                    <div className="absolute top-0 right-0 px-4 py-1 bg-linear-to-r from-purple-600 to-cyan-600 text-white text-xs font-bold rounded-bl-xl">
                      PREMIUM
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl ${type.iconBg} flex items-center justify-center shrink-0`}>
                      <i className={`fas ${type.icon} text-2xl ${type.iconColor}`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {type.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {type.for}
                      </p>
                    </div>
                    {accountType === type.id && (
                      <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <i className="fas fa-check text-green-600 text-xs"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {type.premium && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                        Contact sales for custom pricing →
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Link href="/signup" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
                <i className="fas fa-arrow-left"></i>
                <span>Personal Account</span>
              </Link>
              <button
                onClick={handleStep1Next}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Continue</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Credentials */}
        {currentStep === 2 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 max-w-2xl mx-auto">
            <form onSubmit={handleStep2Next} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Password with Strength Meter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                
                {password && (
                  <div className="mt-3 space-y-2">
                    {/* Strength Bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordStrength.strength === 25 ? 'bg-red-500 w-1/4' :
                            passwordStrength.strength === 50 ? 'bg-orange-500 w-2/4' :
                            passwordStrength.strength === 75 ? 'bg-yellow-500 w-3/4' :
                            passwordStrength.strength === 100 ? 'bg-green-500 w-full' : 'w-0'
                          }`}
                        ></div>
                      </div>
                      <span className={`text-xs font-semibold ${
                        passwordStrength.strength === 25 ? 'text-red-600' :
                        passwordStrength.strength === 50 ? 'text-orange-600' :
                        passwordStrength.strength === 75 ? 'text-yellow-600' :
                        passwordStrength.strength === 100 ? 'text-green-600' : ''
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    
                    {/* Requirements */}
                    <div className="grid grid-cols-2 gap-2">
                      {passwordStrength.checks.map((check, index) => (
                        <div key={index} className={`flex items-center gap-2 text-xs ${
                          check.valid ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          <i className={`fas ${check.valid ? 'fa-check-circle' : 'fa-circle'} text-xs`}></i>
                          <span>{check.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-1"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{' '}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i>
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-linear-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Business Information */}
        {currentStep === 3 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 max-w-2xl mx-auto">
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {profilePicture ? (
                      <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <i className="fas fa-user text-3xl text-gray-400"></i>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="profile-pic"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-pic"
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all inline-block"
                    >
                      Upload Photo
                    </label>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 5MB.</p>
                  </div>
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {accountType === 'professional' ? 'Your Name' : 'Business/Company Name'} *
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={accountType === 'professional' ? 'John Doe' : 'Acme Corporation'}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Handle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Handle *
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl font-medium">
                    @
                  </span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="your_business"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                {handle && (
                  <p className="text-xs text-gray-500 mt-1">
                    Your profile: <span className="text-purple-600 font-medium">muab.com/@{handle}</span>
                  </p>
                )}
              </div>

              {/* Headline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Headline *
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="A brief tagline about your business"
                  maxLength={120}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
                <p className="text-xs text-gray-500 mt-1 text-right">{headline.length}/120</p>
              </div>

              {/* Company Logo (for Company/Enterprise) */}
              {(accountType === 'company' || accountType === 'enterprise') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Company Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                      {companyLogo ? (
                        <img src={URL.createObjectURL(companyLogo)} alt="Logo" className="w-full h-full object-contain p-2" />
                      ) : (
                        <i className="fas fa-image text-2xl text-gray-400"></i>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        id="company-logo"
                        accept="image/png"
                        onChange={(e) => setCompanyLogo(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label
                        htmlFor="company-logo"
                        className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg font-medium cursor-pointer hover:bg-cyan-200 dark:hover:bg-cyan-900/50 transition-all inline-block"
                      >
                        Upload Logo
                      </label>
                      <p className="text-xs text-gray-500 mt-1">500x500px recommended. Transparent PNG.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i>
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-linear-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <i className="fas fa-check"></i>
                  <span>Create Account</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

