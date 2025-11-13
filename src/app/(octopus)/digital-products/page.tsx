'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';

type ProductType = 'all' | 'course' | 'ebook' | 'template' | 'video' | 'webinar' | 'coaching' | 'membership';
type ProductStatus = 'all' | 'active' | 'draft' | 'archived';

interface Product {
  id: number;
  title: string;
  type: string;
  price: number;
  sales: number;
  revenue: number;
  status: 'active' | 'draft' | 'archived';
  thumbnail: string;
  createdAt: string;
}

export default function DigitalProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ProductType>('all');
  const [filterStatus, setFilterStatus] = useState<ProductStatus>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'sales' | 'revenue'>('newest');

  // Mock products data
  const allProducts: Product[] = [
    {
      id: 1,
      title: 'Complete Web Development Course',
      type: 'course',
      price: 49.99,
      sales: 234,
      revenue: 11697.66,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      createdAt: '2025-11-01'
    },
    {
      id: 2,
      title: 'Digital Marketing Ebook',
      type: 'ebook',
      price: 29.99,
      sales: 156,
      revenue: 4678.44,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      createdAt: '2025-10-28'
    },
    {
      id: 3,
      title: 'Business Presentation Templates',
      type: 'template',
      price: 19.99,
      sales: 89,
      revenue: 1779.11,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      createdAt: '2025-10-15'
    },
    {
      id: 4,
      title: 'Photography Masterclass',
      type: 'video',
      price: 79.99,
      sales: 67,
      revenue: 5359.33,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1606244864456-8bee63fce472?w=400&h=300&fit=crop',
      createdAt: '2025-10-10'
    },
    {
      id: 5,
      title: 'SEO Optimization Webinar',
      type: 'webinar',
      price: 99.00,
      sales: 45,
      revenue: 4455.00,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop',
      createdAt: '2025-09-25'
    },
    {
      id: 6,
      title: 'Personal Coaching Program',
      type: 'coaching',
      price: 299.00,
      sales: 12,
      revenue: 3588.00,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
      createdAt: '2025-09-20'
    },
    {
      id: 7,
      title: 'Premium Membership',
      type: 'membership',
      price: 49.00,
      sales: 178,
      revenue: 8722.00,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
      createdAt: '2025-09-15'
    },
    {
      id: 8,
      title: 'New Product Draft',
      type: 'course',
      price: 59.99,
      sales: 0,
      revenue: 0,
      status: 'draft',
      thumbnail: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=400&h=300&fit=crop',
      createdAt: '2025-11-10'
    }
  ];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(p => p.type === filterType);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status === filterStatus);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'sales':
          return b.sales - a.sales;
        case 'revenue':
          return b.revenue - a.revenue;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filterType, filterStatus, sortBy]);

  // Stats
  const stats = {
    total: allProducts.length,
    active: allProducts.filter(p => p.status === 'active').length,
    drafts: allProducts.filter(p => p.status === 'draft').length,
    totalRevenue: allProducts.reduce((sum, p) => sum + p.revenue, 0)
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      course: 'fa-graduation-cap',
      ebook: 'fa-book',
      template: 'fa-file-alt',
      video: 'fa-play-circle',
      webinar: 'fa-presentation',
      coaching: 'fa-user-tie',
      membership: 'fa-crown'
    };
    return icons[type] || 'fa-box';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      draft: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400',
      archived: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
    };
    return colors[status] || colors.draft;
  };

  return (
    <OctopusLayout accountType="professional">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Digital Products</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage and create your digital products</p>
          </div>
          <Link
            href="/digital-products/create"
            className="flex items-center gap-2 px-5 py-3 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            <i className="fas fa-plus"></i>
            <span>Create Product</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <i className="fas fa-box text-purple-600 dark:text-purple-400"></i>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <i className="fas fa-check-circle text-green-600 dark:text-green-400"></i>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <i className="fas fa-file-alt text-gray-600 dark:text-gray-400"></i>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.drafts}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                <i className="fas fa-dollar-sign text-cyan-600 dark:text-cyan-400"></i>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as ProductType)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="all">All Types</option>
              <option value="course">Courses</option>
              <option value="ebook">Ebooks</option>
              <option value="template">Templates</option>
              <option value="video">Videos</option>
              <option value="webinar">Webinars</option>
              <option value="coaching">Coaching</option>
              <option value="membership">Memberships</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ProductStatus)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="sales">Most Sales</option>
              <option value="revenue">Highest Revenue</option>
            </select>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <i className="fas fa-th"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all ${
                  viewMode === 'list'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-16 border-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-box-open text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your filters or create a new product</p>
            <Link
              href="/digital-products/create"
              className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <i className="fas fa-plus"></i>
              <span>Create Product</span>
            </Link>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-purple-400 dark:hover:border-purple-500 transition-all group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Thumbnail */}
                <div className={`relative ${viewMode === 'list' ? 'w-48' : 'h-48'} bg-gray-100 dark:bg-gray-900 overflow-hidden`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-purple-600 text-white rounded-lg text-xs font-semibold">
                      <i className={`fas ${getTypeIcon(product.type)} mr-1`}></i>
                      {product.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {product.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</p>
                    </div>
                    <div className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-shopping-cart"></i>
                        <span>{product.sales} sales</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="fas fa-dollar-sign"></i>
                        <span>${product.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/digital-products/${product.id}/edit`}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium text-center"
                    >
                      <i className="fas fa-edit mr-2"></i>
                      Edit
                    </Link>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <i className="fas fa-chart-line"></i>
                    </button>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
