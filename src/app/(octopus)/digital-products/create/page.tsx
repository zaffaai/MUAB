'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OctopusLayout from '@/components/layout/OctopusLayout';

type ProductType = 'course' | 'ebook' | 'template' | 'video' | 'webinar' | 'coaching' | 'membership';

export default function CreateProductPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Basic Info
  const [productType, setProductType] = useState<ProductType | ''>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  // Step 2: Pricing
  const [pricingModel, setPricingModel] = useState<'one-time' | 'subscription' | 'free'>('one-time');
  const [price, setPrice] = useState('');
  const [compareAtPrice, setCompareAtPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [subscriptionInterval, setSubscriptionInterval] = useState<'monthly' | 'yearly'>('monthly');

  // Step 3: Content
  const [contentFiles, setContentFiles] = useState<File[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadableFiles, setDownloadableFiles] = useState<File[]>([]);
  const [previewContent, setPreviewContent] = useState('');

  // Step 4: Settings
  const [enableComments, setEnableComments] = useState(true);
  const [enableReviews, setEnableReviews] = useState(true);
  const [enableCertificate, setEnableCertificate] = useState(false);
  const [maxStudents, setMaxStudents] = useState('');
  const [publishNow, setPublishNow] = useState(true);

  const productTypes = [
    {
      id: 'course',
      name: 'Online Course',
      icon: 'fa-graduation-cap',
      description: 'Video lessons, assignments, quizzes',
      color: 'purple'
    },
    {
      id: 'ebook',
      name: 'E-book',
      icon: 'fa-book',
      description: 'Digital book or guide',
      color: 'cyan'
    },
    {
      id: 'template',
      name: 'Template',
      icon: 'fa-file-alt',
      description: 'Design or document templates',
      color: 'blue'
    },
    {
      id: 'video',
      name: 'Video',
      icon: 'fa-play-circle',
      description: 'Single video or series',
      color: 'red'
    },
    {
      id: 'webinar',
      name: 'Webinar',
      icon: 'fa-presentation',
      description: 'Live or recorded webinar',
      color: 'green'
    },
    {
      id: 'coaching',
      name: 'Coaching',
      icon: 'fa-user-tie',
      description: '1-on-1 or group coaching',
      color: 'yellow'
    },
    {
      id: 'membership',
      name: 'Membership',
      icon: 'fa-crown',
      description: 'Recurring membership access',
      color: 'pink'
    }
  ];

  const handleStep1Next = () => {
    if (!productType || !title || !description) {
      alert('Please fill all required fields');
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (pricingModel !== 'free' && !price) {
      alert('Please set a price');
      return;
    }
    setCurrentStep(3);
  };

  const handleStep3Next = () => {
    setCurrentStep(4);
  };

  const handleSubmit = () => {
    console.log('Creating product...', {
      productType,
      title,
      description,
      pricingModel,
      price,
      publishNow
    });
    alert('Product created successfully!');
    router.push('/digital-products');
  };

  return (
    <OctopusLayout accountType="professional">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <i className="fas fa-arrow-left text-gray-600 dark:text-gray-400"></i>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Digital Product</h1>
            <p className="text-gray-600 dark:text-gray-400">Launch your new product in 4 easy steps</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'Basic Info', icon: 'fa-info-circle' },
              { step: 2, label: 'Pricing', icon: 'fa-dollar-sign' },
              { step: 3, label: 'Content', icon: 'fa-file-upload' },
              { step: 4, label: 'Settings', icon: 'fa-cog' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                    currentStep === item.step
                      ? 'bg-linear-to-br from-purple-600 to-cyan-600 text-white scale-110'
                      : currentStep > item.step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    <i className={`fas ${currentStep > item.step ? 'fa-check' : item.icon}`}></i>
                  </div>
                  <div className="hidden md:block">
                    <p className={`font-semibold ${
                      currentStep >= item.step ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                    }`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">Step {item.step}/4</p>
                  </div>
                </div>
                {index < 3 && (
                  <div className={`hidden md:block h-1 w-full mx-4 rounded ${
                    currentStep > item.step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Basic Information</h2>
              <p className="text-gray-600 dark:text-gray-400">Tell us about your digital product</p>
            </div>

            {/* Product Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Product Type *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {productTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProductType(type.id as ProductType)}
                    className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-lg ${
                      productType === type.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-${type.color}-100 dark:bg-${type.color}-900/30 flex items-center justify-center mb-3`}>
                      <i className={`fas ${type.icon} text-2xl text-${type.color}-600 dark:text-${type.color}-400`}></i>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{type.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Product Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Complete Web Development Course"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what students will learn and what makes your product unique..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-2">{description.length} characters</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="">Select a category</option>
                <option value="business">Business</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
                <option value="photography">Photography</option>
                <option value="health">Health & Fitness</option>
                <option value="music">Music</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Product Thumbnail
              </label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden">
                  {thumbnail ? (
                    <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    <i className="fas fa-image text-3xl text-gray-400"></i>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label
                    htmlFor="thumbnail"
                    className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all inline-block"
                  >
                    Upload Thumbnail
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 1200x800px, Max 2MB</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleStep1Next}
                className="px-6 py-3 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Continue to Pricing</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pricing */}
        {currentStep === 2 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pricing</h2>
              <p className="text-gray-600 dark:text-gray-400">Set how you want to charge for your product</p>
            </div>

            {/* Pricing Model */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Pricing Model *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPricingModel('one-time')}
                  className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg ${
                    pricingModel === 'one-time'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                    <i className="fas fa-dollar-sign text-2xl text-green-600"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">One-Time Payment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customer pays once for lifetime access</p>
                </button>

                <button
                  onClick={() => setPricingModel('subscription')}
                  className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg ${
                    pricingModel === 'subscription'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                    <i className="fas fa-sync-alt text-2xl text-blue-600"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Subscription</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Recurring monthly or yearly payments</p>
                </button>

                <button
                  onClick={() => setPricingModel('free')}
                  className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg ${
                    pricingModel === 'free'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                    <i className="fas fa-gift text-2xl text-purple-600"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Free</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Offer your product for free</p>
                </button>
              </div>
            </div>

            {pricingModel !== 'free' && (
              <>
                {/* Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Price *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-24 px-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="EGP">EGP</option>
                      </select>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Compare at Price <span className="text-gray-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="number"
                      value={compareAtPrice}
                      onChange={(e) => setCompareAtPrice(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-2">Show original price to highlight discount</p>
                  </div>
                </div>

                {/* Subscription Interval */}
                {pricingModel === 'subscription' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                      Billing Interval
                    </label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setSubscriptionInterval('monthly')}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                          subscriptionInterval === 'monthly'
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <div className="text-center">
                          <p className="font-bold text-gray-900 dark:text-white">Monthly</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Billed every month</p>
                        </div>
                      </button>
                      <button
                        onClick={() => setSubscriptionInterval('yearly')}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                          subscriptionInterval === 'yearly'
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <div className="text-center">
                          <p className="font-bold text-gray-900 dark:text-white">Yearly</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Billed every year</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Platform Fee Notice */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex gap-3">
                    <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-1"></i>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Platform Fee</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        MUAB charges a 5% platform fee on all sales. You will receive{' '}
                        <span className="font-bold">
                          {price ? `${currency} ${(parseFloat(price) * 0.95).toFixed(2)}` : `${currency} 0.00`}
                        </span>{' '}
                        per sale after fees.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
              >
                <i className="fas fa-arrow-left"></i>
                <span>Back</span>
              </button>
              <button
                onClick={handleStep2Next}
                className="px-6 py-3 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Continue to Content</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Content */}
        {currentStep === 3 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Content</h2>
              <p className="text-gray-600 dark:text-gray-400">Upload your product files and resources</p>
            </div>

            {/* Video Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Main Video/Preview
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or upload video"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">Add a YouTube URL or upload a video file</p>
            </div>

            {/* Content Files Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Course Files / Modules
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition-all">
                <input
                  type="file"
                  id="content-files"
                  multiple
                  onChange={(e) => setContentFiles(Array.from(e.target.files || []))}
                  className="hidden"
                />
                <label htmlFor="content-files" className="cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-cloud-upload-alt text-3xl text-purple-600"></i>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">PDF, MP4, ZIP files up to 500MB each</p>
                </label>
              </div>
              {contentFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {contentFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-file text-purple-600"></i>
                        <span className="text-sm text-gray-900 dark:text-white">{file.name}</span>
                      </div>
                      <button
                        onClick={() => setContentFiles(contentFiles.filter((_, i) => i !== idx))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Downloadable Resources */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Downloadable Resources <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-purple-500 transition-all">
                <input
                  type="file"
                  id="downloads"
                  multiple
                  onChange={(e) => setDownloadableFiles(Array.from(e.target.files || []))}
                  className="hidden"
                />
                <label htmlFor="downloads" className="cursor-pointer">
                  <i className="fas fa-download text-2xl text-purple-600 mb-2"></i>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add bonus materials, worksheets, templates</p>
                </label>
              </div>
              {downloadableFiles.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {downloadableFiles.map((file, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Preview Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Preview/Sample Content
              </label>
              <textarea
                value={previewContent}
                onChange={(e) => setPreviewContent(e.target.value)}
                placeholder="Provide a free preview or sample of your content to attract buyers..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
              >
                <i className="fas fa-arrow-left"></i>
                <span>Back</span>
              </button>
              <button
                onClick={handleStep3Next}
                className="px-6 py-3 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Continue to Settings</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Settings */}
        {currentStep === 4 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h2>
              <p className="text-gray-600 dark:text-gray-400">Configure additional options for your product</p>
            </div>

            {/* Feature Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <i className="fas fa-comments text-blue-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Enable Comments</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow students to comment on content</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableComments}
                    onChange={(e) => setEnableComments(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <i className="fas fa-star text-yellow-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Enable Reviews</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow students to rate and review</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableReviews}
                    onChange={(e) => setEnableReviews(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <i className="fas fa-certificate text-green-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Issue Certificate</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Provide completion certificate</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableCertificate}
                    onChange={(e) => setEnableCertificate(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>

            {/* Max Students */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Maximum Students <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                value={maxStudents}
                onChange={(e) => setMaxStudents(e.target.value)}
                placeholder="Leave empty for unlimited"
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">Limit enrollment to create exclusivity</p>
            </div>

            {/* Publish Option */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={publishNow}
                  onChange={(e) => setPublishNow(e.target.checked)}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <div>
                  <p className="font-semibold text-purple-900 dark:text-purple-100">Publish Immediately</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Make this product available to customers right away
                  </p>
                </div>
              </label>
              {!publishNow && (
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-3">
                  Product will be saved as draft. You can publish it later from your products list.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
              >
                <i className="fas fa-arrow-left"></i>
                <span>Back</span>
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <i className="fas fa-check"></i>
                <span>{publishNow ? 'Publish Product' : 'Save as Draft'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
