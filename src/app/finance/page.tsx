'use client';

import { useState } from 'react';

const mockPayoutMethods = [
  {
    id: 1,
    type: 'paypal',
    email: 'creator@example.com',
    isActive: true,
    addedAt: '2024-01-10'
  },
  {
    id: 2,
    type: 'bank',
    last4: '4242',
    bankName: 'Chase Bank',
    isActive: false,
    addedAt: '2024-02-15'
  },
];

const mockTransactions = [
  { id: 1, date: '2024-03-10', product: 'Premium Design Course', amount: 199.99, customer: 'John Doe', status: 'completed' },
  { id: 2, date: '2024-03-09', product: 'Marketing Masterclass', amount: 149.99, customer: 'Jane Smith', status: 'completed' },
  { id: 3, date: '2024-03-08', product: 'JavaScript Course', amount: 89.99, customer: 'Mike Johnson', status: 'pending' },
  { id: 4, date: '2024-03-07', product: 'Photography eBook', amount: 39.99, customer: 'Sarah Williams', status: 'completed' },
];

export default function FinancePage() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Finance
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Track your earnings and manage payout methods
          </p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-line text-2xl"></i>
            </div>
            <div>
              <p className="text-purple-100 text-sm">Lifetime Earnings</p>
              <h3 className="text-3xl font-bold">$45,280</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-white/20 px-2 py-1 rounded">+24.5%</span>
            <span className="text-purple-100">vs last period</span>
          </div>
        </div>

        <div className="bg-linear-to-br from-green-600 to-green-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-calendar text-2xl"></i>
            </div>
            <div>
              <p className="text-green-100 text-sm">This Month</p>
              <h3 className="text-3xl font-bold">$8,340</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-white/20 px-2 py-1 rounded">+12.3%</span>
            <span className="text-green-100">from last month</span>
          </div>
        </div>

        <div className="bg-linear-to-br from-cyan-600 to-cyan-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-money-bill-wave text-2xl"></i>
            </div>
            <div>
              <p className="text-cyan-100 text-sm">Next Payout</p>
              <h3 className="text-3xl font-bold">$4,170</h3>
            </div>
          </div>
          <div className="text-sm text-cyan-100">
            <i className="fas fa-clock mr-1"></i>
            March 15, 2024
          </div>
        </div>
      </div>

      {/* Payout Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payout Methods</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage how you receive your earnings</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <i className="fas fa-plus"></i>
            <span>Add Method</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPayoutMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                method.isActive
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    method.type === 'paypal' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    <i className={`fab ${method.type === 'paypal' ? 'fa-paypal text-blue-600' : 'fa-cc-visa text-purple-600'} text-xl`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {method.type === 'paypal' ? 'PayPal' : method.bankName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {method.type === 'paypal' ? method.email : `•••• ${method.last4}`}
                    </p>
                  </div>
                </div>
                {method.isActive && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                    Active
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                  Edit
                </button>
                {!method.isActive && (
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                    Set Active
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            View All <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{tx.product}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{tx.customer}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">${tx.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
