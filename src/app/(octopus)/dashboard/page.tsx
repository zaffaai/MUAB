'use client';

import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';

export default function OctopusDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$12,450', change: '+18.2%', trend: 'up' },
    { label: 'Active Products', value: '24', change: '+3 this month', trend: 'up' },
    { label: 'Total Sales', value: '1,234', change: '+12.5%', trend: 'up' },
    { label: 'Active Students', value: '8,492', change: '+24.3%', trend: 'up' }
  ];

  const recentProducts = [
    { id: 1, name: 'Premium Design Course', type: 'Course', sales: 234, revenue: 11680 },
    { id: 2, name: 'Marketing Ebook', type: 'Ebook', sales: 156, revenue: 4680 },
    { id: 3, name: 'Business Template Pack', type: 'Template', sales: 89, revenue: 2670 }
  ];

  const recentActivity = [
    { id: 1, text: 'New sale: Premium Design Course', time: '5 min ago', icon: 'fa-shopping-cart' },
    { id: 2, text: '3 new students enrolled', time: '12 min ago', icon: 'fa-user-plus' },
    { id: 3, text: 'Live event started', time: '1 hour ago', icon: 'fa-video' },
    { id: 4, text: 'Payment received: $450', time: '2 hours ago', icon: 'fa-dollar-sign' }
  ];

  return (
    <OctopusLayout accountType="professional">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Welcome back, John</h1>
            <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">Here's what's happening with your business today</p>
          </div>
          <Link
            href="/digital-products/create"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors shadow-sm"
          >
            <i className="fas fa-plus text-xs"></i>
            <span>New product</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-md p-4 hover:border-gray-300 transition-colors">
              <div className="text-sm font-medium text-gray-600 mb-2">{stat.label}</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-semibold text-gray-900 tracking-tight">{stat.value}</div>
              </div>
              <div className="text-xs text-gray-500 mt-1.5">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Products */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-md p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Recent products</h2>
                <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">Your latest digital products</p>
              </div>
              <Link href="/digital-products" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                View all →
              </Link>
            </div>
            <div className="space-y-2">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-md border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 bg-purple-50 rounded-md flex items-center justify-center shrink-0">
                    <i className="fas fa-box text-purple-600 text-sm"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{product.type} · {product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                    <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded mt-0.5">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white border border-gray-200 rounded-md p-5">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-gray-900">Activity</h2>
              <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">Recent updates</p>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-2.5 pb-3 ${
                    index < recentActivity.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                    <i className={`fas ${activity.icon} text-gray-600 text-xs`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 leading-relaxed">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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
