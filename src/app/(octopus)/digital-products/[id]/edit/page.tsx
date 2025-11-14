'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import OctopusLayout from '@/components/layout/OctopusLayout';

type ProductType = 'course' | 'ebook' | 'template' | 'video' | 'webinar' | 'coaching' | 'membership';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  const [currentStep, setCurrentStep] = useState(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // AI Assistant State
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiExpanded, setAiExpanded] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm here to help you edit your digital product. What would you like to update?",
      timestamp: new Date()
    }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Form State - Prefilled with existing product data
  const [productType, setProductType] = useState<ProductType>('course');
  const [title, setTitle] = useState('Digital Marketing Masterclass');
  const [description, setDescription] = useState('A comprehensive course on digital marketing strategies and techniques.');
  const [category, setCategory] = useState('business');
  const [price, setPrice] = useState(97);
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState(['marketing', 'digital', 'business']);
  const [newTag, setNewTag] = useState('');

  const productTypes = [
    {
      id: 'course',
      name: 'Online Course',
      icon: 'fa-graduation-cap',
      color: 'purple',
      description: 'Video lessons & resources'
    },
    {
      id: 'ebook',
      name: 'E-Book',
      icon: 'fa-book',
      color: 'blue',
      description: 'Digital book or guide'
    },
    {
      id: 'template',
      name: 'Template',
      icon: 'fa-file-alt',
      color: 'cyan',
      description: 'Editable template files'
    },
    {
      id: 'video',
      name: 'Video Content',
      icon: 'fa-play-circle',
      color: 'red',
      description: 'Single or series videos'
    },
    {
      id: 'webinar',
      name: 'Webinar',
      icon: 'fa-presentation',
      color: 'orange',
      description: 'Live or recorded webinar'
    },
    {
      id: 'coaching',
      name: 'Coaching',
      icon: 'fa-user-tie',
      color: 'green',
      description: '1-on-1 or group coaching'
    },
    {
      id: 'membership',
      name: 'Membership',
      icon: 'fa-crown',
      color: 'yellow',
      description: 'Recurring membership access'
    }
  ];

  const categories = [
    { id: 'business', name: 'Business', icon: 'fa-briefcase' },
    { id: 'design', name: 'Design', icon: 'fa-palette' },
    { id: 'development', name: 'Development', icon: 'fa-code' },
    { id: 'marketing', name: 'Marketing', icon: 'fa-bullhorn' },
    { id: 'photography', name: 'Photography', icon: 'fa-camera' },
    { id: 'music', name: 'Music', icon: 'fa-music' },
    { id: 'fitness', name: 'Fitness', icon: 'fa-dumbbell' },
    { id: 'lifestyle', name: 'Lifestyle', icon: 'fa-heart' }
  ];

  const generateAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('title') || lowerMessage.includes('name')) {
      return "Great question! When editing your product title, keep it clear and descriptive. Your current title seems good, but consider:\n\n• Include the main benefit\n• Keep it under 60 characters\n• Use keywords your audience searches for\n\nWould you like suggestions for improving it?";
    }
    
    if (lowerMessage.includes('description')) {
      return "For your description, focus on:\n\n• What problem does it solve?\n• Who is it for?\n• What will they learn/get?\n• Why you're qualified to teach this\n\nKeep it scannable with bullet points and clear sections!";
    }
    
    if (lowerMessage.includes('price')) {
      return "Note: The price is locked for this product as it already has sales. This protects existing customers. If you need to change pricing, consider creating a new version or offering discounts instead.";
    }
    
    return "I'm here to help you improve your product! You can update the title, description, thumbnail, and content. Just let me know what you'd like to work on.";
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setUserMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(userMessage),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const quickActions = [
    { label: 'Update Title', action: () => setUserMessage('Help me improve my product title') },
    { label: 'Enhance Description', action: () => setUserMessage('How can I make my description better?') },
    { label: 'Add Content Section', action: () => setUserMessage('I want to add a new content section') }
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    // In real app, submit to API
    console.log('Updating product:', {
      id: productId,
      productType,
      title,
      description,
      category,
      price, // Note: price is not editable
      tags
    });
    router.push('/digital-products');
  };

  const steps = [
    { step: 1, label: 'Basic Info', icon: 'fa-info-circle' },
    { step: 2, label: 'Pricing', icon: 'fa-dollar-sign' },
    { step: 3, label: 'Content', icon: 'fa-file-alt' },
    { step: 4, label: 'Review', icon: 'fa-check-circle' }
  ];

  return (
    <OctopusLayout>
      <div className="space-y-4 pb-20">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <button onClick={() => router.push('/digital-products')} className="hover:text-purple-600">
              Digital Products
            </button>
            <i className="fas fa-chevron-right text-xs"></i>
            <span className="text-gray-900 dark:text-white">Edit Product</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Edit Product</h1>
              <p className="text-gray-600 dark:text-gray-400">Update your digital product details</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className={`px-4 py-2 rounded-md font-semibold transition-all flex items-center gap-2 ${
                  showAIAssistant
                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <i className="fas fa-robot"></i>
                <span>AI Assistant</span>
              </button>
              <button
                onClick={() => router.push('/digital-products')}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {steps.map((item, index) => (
              <div key={item.step} className="flex items-center flex-1">
                <div 
                  onClick={() => setCurrentStep(item.step)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep === item.step
                      ? 'bg-purple-600 text-white shadow-sm scale-110'
                      : currentStep > item.step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      currentStep === item.step 
                        ? 'text-purple-700 dark:text-purple-300' 
                        : 'text-gray-600 dark:text-gray-400'
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
          <div className="bg-white dark:bg-gray-800 rounded-md p-8 border border-gray-200 dark:border-gray-700 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Basic Information</h2>
              <p className="text-gray-600 dark:text-gray-400">Update your product's basic details</p>
            </div>

            {/* Product Type - Display Only */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Product Type <span className="text-gray-400 text-xs">(Cannot be changed)</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {productTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 rounded-md border-2 transition-all text-left ${
                      productType === type.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 opacity-60'
                        : 'border-gray-200 dark:border-gray-700 opacity-40'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-${type.color}-100 dark:bg-${type.color}-900/30 flex items-center justify-center mb-3`}>
                      <i className={`fas ${type.icon} text-xl text-${type.color}-600 dark:text-${type.color}-400`}></i>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{type.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Product Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Digital Marketing Masterclass"
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what your product offers and who it's for..."
                rows={6}
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">{description.length}/1000 characters</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 rounded-md border-2 transition-all ${
                      category === cat.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <i className={`fas ${cat.icon} text-xl mb-2 ${
                      category === cat.id ? 'text-purple-600' : 'text-gray-400'
                    }`}></i>
                    <p className={`text-sm font-semibold ${
                      category === cat.id ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {cat.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Tags (for search & discovery)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Add a tag..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <button
                  onClick={handleAddTag}
                  className="px-6 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-purple-900 dark:hover:text-purple-100"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
              >
                Next: Pricing <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pricing - LOCKED */}
        {currentStep === 2 && (
          <div className="bg-white dark:bg-gray-800 rounded-md p-8 border border-gray-200 dark:border-gray-700 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Pricing</h2>
              <p className="text-gray-600 dark:text-gray-400">Your product pricing details</p>
            </div>

            {/* Price Locked Notice */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-md p-5 border-2 border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0">
                  <i className="fas fa-lock text-yellow-600 dark:text-yellow-400 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Price Editing Locked</h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                    The price cannot be changed for products that already have sales. This protects your existing customers and maintains pricing integrity.
                  </p>
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <p className="font-semibold mb-1">Alternative options:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Create discount coupons for promotional pricing</li>
                      <li>Offer special bundles with other products</li>
                      <li>Create a new version if significant changes are made</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Price Display */}
            <div className="bg-linear-to-br from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-md p-8 border border-purple-200 dark:border-purple-800">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Current Price</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-semibold text-gray-900 dark:text-white">${price}</span>
                  <span className="text-2xl text-gray-600 dark:text-gray-400">USD</span>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-center gap-8 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Platform Fee (5%)</p>
                      <p className="font-semibold text-gray-900 dark:text-white">${(price * 0.05).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">You Earn</p>
                      <p className="font-semibold text-green-600 dark:text-green-400">${(price * 0.95).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                <i className="fas fa-arrow-left mr-2"></i> Previous
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
              >
                Next: Content <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Content */}
        {currentStep === 3 && (
          <div className="bg-white dark:bg-gray-800 rounded-md p-8 border border-gray-200 dark:border-gray-700 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Product Content</h2>
              <p className="text-gray-600 dark:text-gray-400">Update files, lessons, or resources</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
              <i className="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Product Files</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Upload videos, PDFs, templates, or other files for your product
              </p>
              <button className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all">
                <i className="fas fa-upload mr-2"></i>
                Choose Files
              </button>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                <i className="fas fa-arrow-left mr-2"></i> Previous
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-8 py-3 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
              >
                Next: Review <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="bg-white dark:bg-gray-800 rounded-md p-8 border border-gray-200 dark:border-gray-700 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Review Changes</h2>
              <p className="text-gray-600 dark:text-gray-400">Verify your updates before saving</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Type</p>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">{productType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Category</p>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">{category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Title</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Price</p>
                    <p className="font-semibold text-gray-900 dark:text-white">${price}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
              </div>

              {tags.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                <i className="fas fa-arrow-left mr-2"></i> Previous
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
              >
                <i className="fas fa-save mr-2"></i> Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Floating Button */}
      {showAIAssistant && !aiExpanded && (
        <button
          onClick={() => setAiExpanded(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center z-50 hover:scale-110"
        >
          <i className="fas fa-robot text-2xl"></i>
        </button>
      )}

      {/* AI Assistant Expanded Chat */}
      {showAIAssistant && aiExpanded && (
        <div className="fixed bottom-6 right-6 w-96 bg-white dark:bg-gray-800 rounded-md shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col max-h-[600px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-purple-600 rounded-t-2xl">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <h3 className="font-bold">AI Assistant</h3>
                <p className="text-xs opacity-90">Here to help you edit</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAiExpanded(false)}
                className="w-8 h-8 bg-white/20 rounded-lg hover:bg-white/30 transition-all flex items-center justify-center text-white"
              >
                <i className="fas fa-minus"></i>
              </button>
              <button
                onClick={() => {
                  setAiExpanded(false);
                  setShowAIAssistant(false);
                }}
                className="w-8 h-8 bg-white/20 rounded-lg hover:bg-white/30 transition-all flex items-center justify-center text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shrink-0">
                    <i className="fas fa-robot text-white text-sm"></i>
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-md ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                    <i className="fas fa-user text-gray-600 dark:text-gray-400 text-sm"></i>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-robot text-white text-sm"></i>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all whitespace-nowrap"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </OctopusLayout>
  );
}
