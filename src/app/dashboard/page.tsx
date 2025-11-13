'use client';

import { useState } from 'react';
import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';

// Mock data
const topProducts = [
  { id: 1, name: 'Premium Design Course', sales: 342, revenue: 68397.58, trend: 'up', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=100&h=100&fit=crop' },
  { id: 2, name: 'JavaScript Fundamentals', sales: 423, revenue: 38054.77, trend: 'up', image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=100&h=100&fit=crop' },
  { id: 3, name: 'Marketing Masterclass', sales: 284, revenue: 42597.16, trend: 'down', image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=100&h=100&fit=crop' },
];

const recentActivity = [
  { id: 1, type: 'sale', message: 'New sale: Premium Design Course', time: '5 min ago', icon: 'fa-shopping-cart', color: 'text-green-600' },
  { id: 2, type: 'follower', message: '3 new followers', time: '12 min ago', icon: 'fa-user-plus', color: 'text-blue-600' },
  { id: 3, type: 'comment', message: 'New comment on JavaScript Course', time: '1 hour ago', icon: 'fa-comment', color: 'text-purple-600' },
  { id: 4, type: 'sale', message: 'New sale: Marketing Masterclass', time: '2 hours ago', icon: 'fa-shopping-cart', color: 'text-green-600' },
];

export default function DashboardPage() {
  const [goalTarget] = useState(10000);
  const [currentProgress] = useState(8340);
  const goalPercentage = (currentProgress / goalTarget) * 100;

  return (
    <OctopusLayout>
      <div className="space-y-6">
        {/* Header with Action */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your creator business</p>
          </div>
          <Link 
            href="/digital-products/create"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium"
          >
            <i className="fas fa-plus"></i>
            <span>New Product</span>
          </Link>
        </div>

        {/* Stats Overview - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Sales Card */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-shopping-cart text-xl text-purple-600 dark:text-purple-400"></i>
                </div>
                <span className="px-2.5 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold rounded-lg">
                  +12.5%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">1,234</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Sales</div>
            </div>
          </div>

          {/* Followers Card */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-users text-xl text-cyan-600 dark:text-cyan-400"></i>
                </div>
                <span className="px-2.5 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold rounded-lg">
                  +24.3%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">8,492</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
          </div>

          {/* Engagement Card */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/5 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-heart text-xl text-pink-600 dark:text-pink-400"></i>
                </div>
                <span className="px-2.5 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold rounded-lg">
                  +8.7%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">68.5%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</div>
            </div>
          </div>

          {/* Revenue Card - Highlighted */}
          <div className="relative bg-linear-to-br from-purple-600 via-purple-500 to-cyan-500 rounded-2xl p-6 shadow-lg overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <i className="fas fa-dollar-sign text-xl text-white"></i>
                </div>
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
                  This Month
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">$8,340</div>
              <div className="text-sm text-white/90">Monthly Revenue</div>
            </div>
          </div>
        </div>

        {/* Revenue Goal - Redesigned */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Goal</h2>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-semibold rounded-lg">
                  November 2025
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">You're ${(goalTarget - currentProgress).toLocaleString()} away from your monthly target</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold bg-linear-to-br from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                {goalPercentage.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
            </div>
          </div>
          
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-gray-900 dark:text-white">${currentProgress.toLocaleString()}</span>
            <span className="font-semibold text-gray-600 dark:text-gray-400">${goalTarget.toLocaleString()}</span>
          </div>
          
          <div className="relative h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-linear-to-r from-purple-600 via-purple-500 to-cyan-500 rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: `${goalPercentage}%` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Products - Redesigned */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Top Performing Products</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your best sellers this month</p>
              </div>
              <Link 
                href="/products" 
                className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm group"
              >
                <span>View All</span>
                <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
            
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all cursor-pointer group"
                >
                  <div className="relative shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 rounded-xl object-cover ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-purple-400 dark:group-hover:ring-purple-600 transition-all" 
                    />
                    <div className="absolute -top-2 -left-2 w-7 h-7 bg-linear-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{product.sales}</span> sales this month
                    </p>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      ${product.revenue.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg ${
                        product.trend === 'up' 
                          ? 'bg-green-50 dark:bg-green-900/20' 
                          : 'bg-red-50 dark:bg-red-900/20'
                      }`}>
                        <i className={`fas fa-arrow-${product.trend === 'up' ? 'up' : 'down'} text-xs ${
                          product.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}></i>
                        <span className={`text-xs font-semibold ${
                          product.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {product.trend === 'up' ? '+12%' : '-5%'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed - Redesigned */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Activity Feed</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recent updates</p>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className={`flex items-start gap-3 pb-4 ${
                    index < recentActivity.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    activity.type === 'sale' ? 'bg-green-100 dark:bg-green-900/30' :
                    activity.type === 'follower' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    <i className={`fas ${activity.icon} ${activity.color}`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1 leading-snug">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <i className="fas fa-clock text-[10px]"></i>
                      <span>{activity.time}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions - Redesigned */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/products/create" 
              className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-plus text-2xl text-purple-600 dark:text-purple-400"></i>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-lg">Create Product</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Launch a new digital product</p>
              </div>
            </Link>

            <Link 
              href="/live-events" 
              className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-red-400 dark:hover:border-red-500 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-video text-2xl text-red-600 dark:text-red-400"></i>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-lg">Go Live</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Start a live event or webinar</p>
              </div>
            </Link>

            <button className="group relative bg-linear-to-br from-purple-600 via-purple-500 to-cyan-500 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
              <div className="relative text-left">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-robot text-2xl text-white"></i>
                </div>
                <h3 className="font-bold text-white mb-1 text-lg">AI Assistant</h3>
                <p className="text-sm text-white/90">Get help creating content faster</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </OctopusLayout>
  );
}
