'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';
import { useCartStore } from '@/store/cartStore';

interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  favorites: number;
  thumbnail: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  type: string;
  duration?: string;
  lessons?: number;
  downloads?: number;
  students?: number;
  description: string;
  keyBenefits: string[];
  whatsIncluded: {
    title: string;
    items: { name: string; duration: string; size: string }[];
  }[];
  tags: string[];
  hasLiveSessions?: boolean;
  hasCertificate?: boolean;
  isCompanyProduct?: boolean;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');

  // Mock product data - in real app, fetch from API using params.id
  const product: Product = {
    id: params.id as string,
    title: 'بودكاست فى: "تحول" رحلة بناء العادات التي تبقى',
    price: 10.00,
    rating: 0,
    reviewCount: 0,
    favorites: 2,
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
    creatorName: 'Template Center',
    creatorHandle: 'Template Center',
    creatorAvatar: 'https://ui-avatars.com/api/?name=Template+Center&background=random&size=128',
    type: 'video',
    students: 6,
    duration: '1h 14m',
    lessons: 0,
    downloads: 0,
    hasLiveSessions: true,
    hasCertificate: true,
    isCompanyProduct: true,
    description: 'في هذا البودكاست، نأخذك في رحلة ملهمة نحو بناء عادات قوية ومستدامة تغير حياتك إلى الأبد! من خلال قصص واقعية ونصائح عملية، تعلّم كيف تحوّل النوايا إلى أفعال، وكيف تستمر في العادات الإيجابية بسهولة',
    keyBenefits: [
      'نظام متطور يعتمد على علوم الأعصاب لتعزيز التعلّم',
      'طرق بسيطة لتكوين عادات مستدامة',
      'تمارين ونصائح عملية وقابلة للتطبيق الفوري'
    ],
    whatsIncluded: [
      {
        title: 'مقدمة الرحلة',
        items: [
          { name: 'ملف مقدمة الرحلة', duration: '1 audio', size: '34m 15s' }
        ]
      },
      {
        title: 'قيّم تقدم العملاء',
        items: [
          { name: 'ملف قيّم تقدم العملاء', duration: '1 audio', size: '15m 38s' }
        ]
      },
      {
        title: 'الورشة التفاعلية',
        items: [
          { name: 'دليل عملي مختصر لبناء عادة في 30 يومًا', duration: '1 audio', size: '9m 12s' }
        ]
      },
      {
        title: 'الإستراتيجية والتنفيذ',
        items: [
          { name: 'قائمة نماذج مخصصة لتنظيم العمليات الخاصة بك', duration: '1 audio', size: '7m 37s' }
        ]
      },
      {
        title: 'أدوات النجاح',
        items: [
          { name: 'أدوات لتتبع التقدم، اجعل العملاء يشعرون بما يحدث', duration: '1 audio', size: '5m 35s' }
        ]
      },
      {
        title: 'خطة التطبيق العملي',
        items: [
          { name: 'خطة - 7 خطوات بسيطة تبدأ فورًا', duration: '1 audio', size: '2m 3s' }
        ]
      }
    ],
    tags: ['البودكاست', 'التطوير', 'تطوير ذاتي', 'بناء عادات']
  };

  const relatedProducts = [
    {
      id: '1',
      title: 'كتاب عالم الطحالب',
      price: 75.00,
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      creatorName: 'Dr. Moahmmed Alsunaidi',
      type: 'Doc'
    },
    {
      id: '2',
      title: 'نموذج ورقة رقمية كاملة: "مقدمة في علم البيانات لطلاب المدارس',
      price: 1.00,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      creatorName: 'Template Center',
      type: 'Photo • Video • Doc'
    },
    {
      id: '4',
      title: 'دليلك الشامل للعمل الحر من المنزل',
      price: 10.00,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
      creatorName: 'Template Center',
      type: 'Doc'
    },
    {
      id: '5',
      title: 'دراسة حالة: ربوبوت دردشة بالذكاء الاصطناعي لتقليل ضغط خدمة العملاء',
      price: 50.00,
      thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400',
      creatorName: 'Template Center',
      type: 'Photo • Video • Doc'
    }
  ];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      creatorName: product.creatorName,
      creatorAvatar: product.creatorAvatar,
      type: product.type
    });
    router.push('/cart');
  };

  return (
    <OctopusLayout>
      <div className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/marketplace" className="hover:text-purple-600 dark:hover:text-purple-400">
            Marketplace
          </Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-gray-900 dark:text-white">{product.title}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Hero Image */}
            <div className="relative h-96 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
              {product.duration && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 text-white text-sm rounded-lg">
                  {product.duration}
                </span>
              )}
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Feature Badges */}
            {(product.hasLiveSessions || (product.hasCertificate && product.isCompanyProduct)) && (
              <div className="flex gap-2">
                {product.hasLiveSessions && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-lg">
                    <i className="fas fa-video"></i>
                    Live Sessions
                  </span>
                )}
                {product.hasCertificate && product.isCompanyProduct && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-lg">
                    <i className="fas fa-certificate"></i>
                    Certificate
                  </span>
                )}
              </div>
            )}

            {/* Creator Info */}
            <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={product.creatorAvatar}
                    alt={product.creatorName}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Created by:</h3>
                    <p className="text-gray-600 dark:text-gray-400">{product.creatorName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{product.creatorHandle}</p>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all">
                  Follow
                </button>
              </div>
            </div>

            {/* Title & Stats */}
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">{product.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <i className="fas fa-star text-yellow-500"></i>
                  <span className="font-semibold text-gray-900 dark:text-white">{product.rating}/3</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Based on {product.reviewCount} reviews
                  </span>
                </div>
                {product.students && (
                  <span className="text-gray-600 dark:text-gray-400">
                    <i className="fas fa-users"></i> {product.students} students
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-3.5 py-2 font-semibold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-b-2 border-purple-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 px-3.5 py-2 font-semibold transition-all ${
                    activeTab === 'reviews'
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-b-2 border-purple-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="p-4">
                {activeTab === 'overview' ? (
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Key Benefits */}
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Key Benefits:</h3>
                      <ul className="space-y-2">
                        {product.keyBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                            <i className="fas fa-check-circle text-green-500 mt-1"></i>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What's Included */}
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                        What's Included ({product.whatsIncluded.length})
                      </h3>
                      <div className="space-y-4">
                        {product.whatsIncluded.map((section, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                                <i className="fas fa-file-audio text-purple-600"></i>
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{section.title}</h4>
                            </div>
                            <div className="space-y-2 ml-13">
                              {section.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                                  <div className="flex items-center gap-4 text-gray-500">
                                    <span>{item.duration}</span>
                                    <span>•</span>
                                    <span>{item.size}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-star text-3xl text-gray-400"></i>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      {product.rating}/5
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Based on {product.reviewCount} reviews
                    </p>
                    <button className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 transition-all">
                      View all
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700 sticky top-5 space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  To unlock this content, please purchase
                </p>
                <div className="text-4xl font-semibold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 transition-all">
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full px-3.5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Add to Cart
                </button>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span>Instant access after purchase</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span>Lifetime access to content</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Related products</h2>
            <Link
              href="/marketplace"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/marketplace/${related.id}`}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group"
              >
                <img
                  src={related.thumbnail}
                  alt={related.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-purple-600">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    By: {related.creatorName}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <i className="fas fa-file"></i>
                    <span>{related.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    USD {related.price.toFixed(2)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </OctopusLayout>
  );
}
