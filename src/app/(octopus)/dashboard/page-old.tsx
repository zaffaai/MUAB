'use client';

import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';

export default function OctopusDashboard() {
  // Mock data
  const stats = [
    {
      label: 'Total Revenue',
      value: '$12,450',
      change: '+18.2%',
      changePositive: true,
      icon: 'fa-dollar-sign',
    },
    {
      label: 'Active Products',
      value: '24',
      change: '+3',
      changePositive: true,
      icon: 'fa-box',
    },
    {
      label: 'Total Sales',
      value: '1,234',
      change: '+12.5%',
      changePositive: true,
      icon: 'fa-shopping-cart',
    },
    {
      label: 'Active Students',
      value: '8,492',
      change: '+24.3%',
      changePositive: true,
      icon: 'fa-users',
    }
  ];

  const recentProducts = [
    { id: 1, name: 'Premium Design Course', type: 'Course', sales: 234, revenue: 11680, status: 'active' },
    { id: 2, name: 'Marketing Ebook', type: 'Ebook', sales: 156, revenue: 4680, status: 'active' },
    { id: 3, name: 'Business Template Pack', type: 'Template', sales: 89, revenue: 2670, status: 'active' }
  ];

  const recentActivity = [
    { id: 1, text: 'New sale: Premium Design Course', time: '5 min ago', icon: 'fa-shopping-cart', variant: 'success' },
    { id: 2, text: '3 new students enrolled', time: '12 min ago', icon: 'fa-user-plus', variant: 'info' },
    { id: 3, text: 'Live event started', time: '1 hour ago', icon: 'fa-video', variant: 'warning' },
    { id: 4, text: 'Payment received: $450', time: '2 hours ago', icon: 'fa-dollar-sign', variant: 'success' }
  ];

  return (
    <OctopusLayout accountType="professional">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Welcome back, John
            </h1>
            <p className="text-sm text-gray-600">
              Here's what's happening with your business today
            </p>
          </div>
          <Link
            href="/digital-products/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
          >
            <i className="fas fa-plus text-xs"></i>
            <span>New Product</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                <i className={`fas ${stat.icon} text-gray-400 text-sm`}></i>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Recent Products */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
                <p className="text-sm text-gray-600 mt-0.5">Your latest digital products</p>
              </div>
              <Link
                href="/digital-products"
                className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-3">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-box text-purple-600 text-sm"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{product.type} · {product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                    <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-md mt-1">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
          {/* Activity Feed */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Activity Feed</h2>
              <p className="text-sm text-gray-600 mt-0.5">Recent updates</p>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-3 pb-4 ${
                    index < recentActivity.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <i className={`fas ${activity.icon} text-gray-600 text-xs`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 leading-relaxed">
                      {activity.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OctopusLayout>
  );
}
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                  <i className="fas fa-wallet"></i>
                </div>
                <p className="font-semibold text-gray-900 text-sm">View Payouts</p>
              </Link>

              <Link
                href="/marketplace"
                className="p-4 rounded-md bg-cyan-50 border border-cyan-200 hover:bg-cyan-50:bg-cyan-900/30 transition-all group"
              >
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                  <i className="fas fa-store"></i>
                </div>
                <p className="font-semibold text-gray-900 text-sm">Marketplace</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </OctopusLayout>
  );
}
