'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';
import { useCartStore } from '@/store/cartStore';

type ProductType = 'course' | 'ebook' | 'template' | 'video' | 'webinar' | 'coaching' | 'membership';

interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  favorites: number;
  thumbnail: string;
  creatorName: string;
  creatorAvatar: string;
  type: ProductType;
  duration?: string;
  lessons?: number;
  downloads?: number;
  students?: number;
  createdAt: string;
  hasLiveSessions?: boolean;
  hasCertificate?: boolean;
  isCompanyProduct?: boolean;
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<ProductType | 'all'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high'>('newest');
  
  const { addItem } = useCartStore();

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'fa-th' },
    { id: 'business', name: 'Business', icon: 'fa-briefcase' },
    { id: 'design', name: 'Design', icon: 'fa-palette' },
    { id: 'development', name: 'Development', icon: 'fa-code' },
    { id: 'marketing', name: 'Marketing', icon: 'fa-bullhorn' },
    { id: 'lifestyle', name: 'Lifestyle', icon: 'fa-heart' },
    { id: 'productivity', name: 'Productivity', icon: 'fa-chart-line' }
  ];

  const products: Product[] = [
    {
      id: '1',
      title: 'كتاب عالم الطحالب',
      price: 75.00,
      rating: 0,
      reviewCount: 3,
      favorites: 4,
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      creatorName: 'Dr. Moahmmed Alsunaidi',
      creatorAvatar: 'https://ui-avatars.com/api/?name=Dr+Moahmmed&background=random&size=128',
      type: 'ebook',
      students: 1,
      createdAt: '2024-05-13',
      hasCertificate: true,
      isCompanyProduct: true
    },
    {
      id: '2',
      title: 'نموذج ورقة رقمية كاملة: "مقدمة في علم البيانات لطلاب المدارس',
      price: 1.00,
      rating: 0,
      reviewCount: 3,
      favorites: 3,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      creatorName: 'Template Center',
      creatorAvatar: 'https://ui-avatars.com/api/?name=Template+Center&background=random&size=128',
      type: 'template',
      lessons: 2,
      downloads: 1,
      students: 3,
      duration: '0:09',
      createdAt: '2024-05-13'
    },
    {
      id: '3',
      title: 'بودكاست فى: "تحول" رحلة بناء العادات التي تبقى',
      price: 10.00,
      rating: 0,
      reviewCount: 3,
      favorites: 2,
      thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
      creatorName: 'Template Center',
      creatorAvatar: 'https://ui-avatars.com/api/?name=Template+Center&background=random&size=128',
      type: 'video',
      students: 6,
      duration: '1h 14m',
      createdAt: '2024-05-13',
      hasLiveSessions: true
    },
    {
      id: '4',
      title: 'دليلك الشامل للعمل الحر من المنزل',
      price: 10.00,
      rating: 0,
      reviewCount: 3,
      favorites: 2,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
      creatorName: 'Template Center',
      creatorAvatar: 'https://ui-avatars.com/api/?name=Template+Center&background=random&size=128',
      type: 'ebook',
      students: 2,
      createdAt: '2024-05-13'
    },
    {
      id: '5',
      title: 'دراسة حالة: ربوبوت دردشة بالذكاء الاصطناعي لتقليل ضغط خدمة',
      price: 50.00,
      rating: 0,
      reviewCount: 1,
      favorites: 1,
      thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400',
      creatorName: 'Template Center',
      creatorAvatar: 'https://ui-avatars.com/api/?name=Template+Center&background=random&size=128',
      type: 'course',
      lessons: 3,
      students: 7,
      duration: '0:09',
      createdAt: '2024-05-13',
      hasLiveSessions: true,
      hasCertificate: true,
      isCompanyProduct: true
    },
    {
      id: '6',
      title: 'محاكاة سريرية: تقديم حالة مريض يعاني من ضيق التنفس',
      price: 50.00,
      rating: 0,
      reviewCount: 3,
      favorites: 1,
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
      creatorName: 'Template Center',
      creatorAvatar: 'https://ui-avatars.io/api/?name=Template+Center',
      type: 'webinar',
      lessons: 1,
      students: 2,
      duration: '5m',
      createdAt: '2024-05-13'
    },
    {
      id: '7',
      title: 'مكتبة الموارد الشاملة للمعلمين',
      price: 25.00,
      rating: 0,
      reviewCount: 3,
      favorites: 1,
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      creatorName: 'Template Center',
      creatorAvatar: 'https://ui-avatars.io/api/?name=Template+Center',
      type: 'template',
      lessons: 1,
      students: 1,
      downloads: 3,
      createdAt: '2024-05-13'
    },
    {
      id: '8',
      title: 'اتخاذ القرار الذكي: كيف يحدث الذكاء الاصطناعي ثورة في طريقة تفكيرنا؟',
      price: 30.00,
      rating: 0,
      reviewCount: 3,
      favorites: 0,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      creatorName: 'Template Center',
      creatorAvatar: 'https://ui-avatars.io/api/?name=Template+Center',
      type: 'course',
      lessons: 2,
      students: 2,
      duration: '2h',
      createdAt: '2024-05-13'
    }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter (mock - would need category field in real app)
    if (selectedCategory !== 'all') {
      // filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    // Price filter
    if (priceRange === 'free') {
      filtered = filtered.filter(p => p.price === 0);
    } else if (priceRange === 'paid') {
      filtered = filtered.filter(p => p.price > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered = [...filtered].sort((a, b) => (b.students || 0) - (a.students || 0));
        break;
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedType, priceRange, sortBy, products]);

  const getTypeIcon = (type: ProductType) => {
    switch (type) {
      case 'course': return 'fa-graduation-cap';
      case 'ebook': return 'fa-book';
      case 'template': return 'fa-file-alt';
      case 'video': return 'fa-play-circle';
      case 'webinar': return 'fa-presentation';
      case 'coaching': return 'fa-user-tie';
      case 'membership': return 'fa-crown';
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      creatorName: product.creatorName,
      creatorAvatar: product.creatorAvatar,
      type: product.type
    });
  };

  return (
    <OctopusLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Marketplace</h1>
            <p className="text-gray-600 dark:text-gray-400">Discover and purchase digital products from creators</p>
          </div>
          <Link
            href="/cart"
            className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all flex items-center gap-2"
          >
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, creators..."
                className="w-full pl-11 pr-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <i className={`fas ${category.icon}`}></i>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ProductType | 'all')}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="all">All Types</option>
              <option value="course">Courses</option>
              <option value="ebook">E-books</option>
              <option value="template">Templates</option>
              <option value="video">Videos</option>
              <option value="webinar">Webinars</option>
              <option value="coaching">Coaching</option>
              <option value="membership">Memberships</option>
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as 'all' | 'free' | 'paid')}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredProducts.length} products found
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/marketplace/${product.id}`}
              className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-sm transition-all group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {product.duration && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {product.duration}
                  </span>
                )}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Creator */}
                <div className="flex items-center gap-2">
                  <img
                    src={product.creatorAvatar}
                    alt={product.creatorName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{product.creatorName}</span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-12">
                  {product.title}
                </h3>

                {/* Feature Badges */}
                {(product.hasLiveSessions || product.hasCertificate) && (
                  <div className="flex gap-2">
                    {product.hasLiveSessions && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md text-xs font-semibold">
                        <i className="fas fa-video"></i>
                        Live
                      </span>
                    )}
                    {product.hasCertificate && product.isCompanyProduct && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs font-semibold">
                        <i className="fas fa-certificate"></i>
                        Cert
                      </span>
                    )}
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  {product.lessons && (
                    <span className="flex items-center gap-1">
                      <i className="fas fa-video"></i>
                      {product.lessons}
                    </span>
                  )}
                  {product.downloads && (
                    <span className="flex items-center gap-1">
                      <i className="fas fa-download"></i>
                      {product.downloads}
                    </span>
                  )}
                  {product.students && (
                    <span className="flex items-center gap-1">
                      <i className="fas fa-users"></i>
                      {product.students}
                    </span>
                  )}
                </div>

                {/* Rating & Stats */}
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <i className="fas fa-star text-yellow-500"></i>
                    <span className="font-semibold text-gray-900 dark:text-white">{product.rating}/3</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    <i className="fas fa-heart"></i> {product.favorites}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    <i className="fas fa-comment"></i> {product.reviewCount}
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all"
                  >
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-md p-12 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-search text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedType('all');
                setPriceRange('all');
              }}
              className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
