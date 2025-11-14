'use client';

import { useState } from 'react';
import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';

export default function OctopusDashboard() {
  // Mock data
  const stats = [
    {
      label: 'Total Revenue',
      value: '$12,450',
      change: '+18.2%',
      icon: 'fa-dollar-sign',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      label: 'Active Products',
      value: '24',
      change: '+3',
      icon: 'fa-box',
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30'
    },
    {
      label: 'Total Sales',
      value: '1,234',
      change: '+12.5%',
      icon: 'fa-shopping-cart',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      label: 'Active Students',
      value: '8,492',
      change: '+24.3%',
      icon: 'fa-users',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    }
  ];

  const recentProducts = [
    { id: 1, name: 'Premium Design Course', type: 'Course', sales: 234, revenue: 11680, status: 'active' },
    { id: 2, name: 'Marketing Ebook', type: 'Ebook', sales: 156, revenue: 4680, status: 'active' },
    { id: 3, name: 'Business Template Pack', type: 'Template', sales: 89, revenue: 2670, status: 'active' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Live Webinar: Marketing 101', date: '2025-11-15', time: '3:00 PM', attendees: 45 },
    { id: 2, title: 'Q&A Session', date: '2025-11-18', time: '5:00 PM', attendees: 23 }
  ];

  const recentActivity = [
    { id: 1, text: 'New sale: Premium Design Course', time: '5 min ago', icon: 'fa-shopping-cart', color: 'text-green-600' },
    { id: 2, text: '3 new students enrolled', time: '12 min ago', icon: 'fa-user-plus', color: 'text-blue-600' },
    { id: 3, text: 'Live event started', time: '1 hour ago', icon: 'fa-video', color: 'text-red-600' },
    { id: 4, text: 'Payment received: $450', time: '2 hours ago', icon: 'fa-dollar-sign', color: 'text-green-600' }
  ];

  return (
    <OctopusLayout accountType="professional">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's what's happening with your business today
            </p>
          </div>
          <Link
            href="/digital-products/create"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:shadow-md hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
          >
            <i className="fas fa-plus"></i>
            <span>New Product</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center transition-transform hover:scale-110`}>
                  <i className={`fas ${stat.icon} text-xl ${stat.color}`}></i>
                </div>
                <span className="px-2.5 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Products */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Recent Products</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your latest digital products</p>
              </div>
              <Link
                href="/digital-products"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm flex items-center gap-2 group"
              >
                <span>View All</span>
                <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>

            <div className="space-y-3">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center text-white">
                    <i className="fas fa-box"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.type} • {product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">${product.revenue.toLocaleString()}</p>
                    <span className="inline-block px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Activity Feed</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recent updates</p>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-3 pb-4 ${
                    index < recentActivity.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0`}>
                    <i className={`fas ${activity.icon} ${activity.color}`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1 leading-snug">
                      {activity.text}
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

        {/* Upcoming Events & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Upcoming Events</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your scheduled live events</p>
              </div>
              <Link
                href="/live-events"
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30"
                >
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white">
                    <i className="fas fa-video"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                      <span><i className="fas fa-calendar mr-1"></i>{event.date}</span>
                      <span><i className="fas fa-clock mr-1"></i>{event.time}</span>
                      <span><i className="fas fa-users mr-1"></i>{event.attendees}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Quick Actions</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Common tasks</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/digital-products/create"
                className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all group"
              >
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                  <i className="fas fa-plus"></i>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Create Product</p>
              </Link>

              <Link
                href="/live-events/create"
                className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all group"
              >
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                  <i className="fas fa-video"></i>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Go Live</p>
              </Link>

              <Link
                href="/finance/payouts"
                className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                  <i className="fas fa-wallet"></i>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">View Payouts</p>
              </Link>

              <Link
                href="/marketplace"
                className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all group"
              >
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                  <i className="fas fa-store"></i>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Marketplace</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </OctopusLayout>
  );
}
