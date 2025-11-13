'use client';

import { useState } from 'react';
import OctopusLayout from '@/components/layout/OctopusLayout';

type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed';
type PaymentMethod = 'bank' | 'paypal' | 'stripe';

interface PayoutMethod {
  id: string;
  type: PaymentMethod;
  name: string;
  details: string;
  isDefault: boolean;
  isVerified: boolean;
}

interface Payout {
  id: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  currency: string;
  status: PayoutStatus;
  date: string;
  payoutDate?: string;
  method: PaymentMethod;
  transactionId?: string;
}

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'payouts' | 'methods'>('overview');
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<PayoutStatus | 'all'>('all');
  const [showPayoutRequestModal, setShowPayoutRequestModal] = useState(false);

  const handleRequestPayout = () => {
    setShowPayoutRequestModal(true);
  };

  const handleConfirmPayout = () => {
    // Send message to MUAB admin
    alert('Payout request sent to MUAB admin! You will be notified once processed.');
    setShowPayoutRequestModal(false);
    console.log('Payout request submitted to MUAB admin');
  };

  const handleDownloadReport = () => {
    // Trigger download of financial report
    const reportData = {
      reportDate: new Date().toISOString(),
      totalEarnings: 12450,
      platformFees: 455,
      payouts: payouts,
      period: 'All Time'
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `muab-financial-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const payoutMethods: PayoutMethod[] = [
    {
      id: '1',
      type: 'bank',
      name: 'Bank Account',
      details: 'Bank of America ****1234',
      isDefault: true,
      isVerified: true
    },
    {
      id: '2',
      type: 'paypal',
      name: 'PayPal',
      details: 'john.doe@example.com',
      isDefault: false,
      isVerified: true
    }
  ];

  const payouts: Payout[] = [
    {
      id: '1',
      amount: 2450.00,
      platformFee: 122.50,
      netAmount: 2327.50,
      currency: 'USD',
      status: 'completed',
      date: '2025-11-01',
      payoutDate: '2025-11-05',
      method: 'bank',
      transactionId: 'TXN-2025-11-001'
    },
    {
      id: '2',
      amount: 1890.00,
      platformFee: 94.50,
      netAmount: 1795.50,
      currency: 'USD',
      status: 'processing',
      date: '2025-10-28',
      method: 'bank'
    },
    {
      id: '3',
      amount: 3200.00,
      platformFee: 160.00,
      netAmount: 3040.00,
      currency: 'USD',
      status: 'pending',
      date: '2025-10-15',
      method: 'paypal'
    },
    {
      id: '4',
      amount: 1560.00,
      platformFee: 78.00,
      netAmount: 1482.00,
      currency: 'USD',
      status: 'completed',
      date: '2025-10-01',
      payoutDate: '2025-10-05',
      method: 'bank',
      transactionId: 'TXN-2025-10-001'
    }
  ];

  const stats = [
    {
      label: 'Total Earnings',
      value: '$12,450',
      change: '+12.5%',
      icon: 'fa-dollar-sign',
      color: 'green'
    },
    {
      label: 'Available Balance',
      value: '$3,200',
      change: 'Ready to withdraw',
      icon: 'fa-wallet',
      color: 'blue'
    },
    {
      label: 'Pending Payouts',
      value: '$1,890',
      change: 'Processing',
      icon: 'fa-clock',
      color: 'yellow'
    },
    {
      label: 'Platform Fees',
      value: '$455',
      change: '5% of total',
      icon: 'fa-percentage',
      color: 'purple'
    }
  ];

  const getStatusColor = (status: PayoutStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'processing':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'failed':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'bank':
        return 'fa-university';
      case 'paypal':
        return 'fa-paypal';
      case 'stripe':
        return 'fa-stripe';
    }
  };

  const filteredPayouts = filterStatus === 'all' 
    ? payouts 
    : payouts.filter(p => p.status === filterStatus);

  return (
    <OctopusLayout accountType="professional">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Finance</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your earnings and payout methods</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center`}>
                  <i className={`fas ${stat.icon} text-xl text-${stat.color}-600 dark:text-${stat.color}-400`}></i>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700 w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'payouts'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Payouts History
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'methods'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Payout Methods
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Earnings Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Monthly Earnings</h2>
              <div className="h-64 flex items-end justify-around gap-2">
                {[
                  { month: 'Jul', amount: 1200 },
                  { month: 'Aug', amount: 1800 },
                  { month: 'Sep', amount: 2400 },
                  { month: 'Oct', amount: 1900 },
                  { month: 'Nov', amount: 3200 }
                ].map((data) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-linear-to-t from-purple-600 to-cyan-600 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(data.amount / 3200) * 100}%` }}
                    ></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{data.month}</p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">${data.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={handleRequestPayout}
                  className="w-full p-4 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <i className="fas fa-money-bill-wave text-2xl"></i>
                    <div className="text-left">
                      <p className="font-bold">Request Payout</p>
                      <p className="text-sm opacity-90">Available: $3,200</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right"></i>
                </button>

                <button 
                  onClick={() => setActiveTab('methods')}
                  className="w-full p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <i className="fas fa-credit-card text-2xl"></i>
                    <div className="text-left">
                      <p className="font-bold">Manage Payout Methods</p>
                      <p className="text-sm opacity-75">{payoutMethods.length} methods added</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right"></i>
                </button>

                <button 
                  onClick={handleDownloadReport}
                  className="w-full p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <i className="fas fa-file-invoice text-2xl"></i>
                    <div className="text-left">
                      <p className="font-bold">Download Reports</p>
                      <p className="text-sm opacity-75">Tax & earnings reports</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>

              {/* Platform Fee Info */}
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex gap-3">
                  <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-1"></i>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Platform Fee</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      MUAB charges a 5% platform fee on all sales. Payouts are processed monthly on the 5th.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payouts History Tab */}
        {activeTab === 'payouts' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            {/* Filters */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payout History</h2>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as PayoutStatus | 'all')}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Transaction ID</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Gross Amount</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Platform Fee</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Net Amount</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Method</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Payout Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayouts.map((payout) => (
                    <tr
                      key={payout.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                    >
                      <td className="p-4 text-sm text-gray-900 dark:text-white">
                        {new Date(payout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                        {payout.transactionId || '—'}
                      </td>
                      <td className="p-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {payout.currency} {payout.amount.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm text-red-600 dark:text-red-400">
                        -{payout.currency} {payout.platformFee.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm font-bold text-green-600 dark:text-green-400">
                        {payout.currency} {payout.netAmount.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                          <i className={`fas ${getMethodIcon(payout.method)}`}></i>
                          <span className="capitalize">{payout.method}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payout.status)}`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        {payout.payoutDate 
                          ? new Date(payout.payoutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : '—'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPayouts.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-receipt text-2xl text-gray-400"></i>
                </div>
                <p className="text-gray-600 dark:text-gray-400">No payouts found</p>
              </div>
            )}
          </div>
        )}

        {/* Payout Methods Tab */}
        {activeTab === 'methods' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payout Methods</h2>
              <button
                onClick={() => setShowAddMethodModal(true)}
                className="px-6 py-3 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <i className="fas fa-plus"></i>
                <span>Add Method</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {payoutMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <i className={`fas ${getMethodIcon(method.type)} text-xl text-purple-600 dark:text-purple-400`}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{method.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{method.details}</p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-semibold">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {method.isVerified ? (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                        <i className="fas fa-check-circle"></i>
                        <span>Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-sm">
                        <i className="fas fa-exclamation-circle"></i>
                        <span>Pending Verification</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <button className="flex-1 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all">
                        Set as Default
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-all">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Method Options */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Available Payout Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center hover:border-purple-500 transition-all cursor-pointer">
                  <i className="fas fa-university text-3xl text-gray-400 mb-2"></i>
                  <p className="font-semibold text-gray-900 dark:text-white">Bank Transfer</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Direct deposit to bank</p>
                </div>
                <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center hover:border-purple-500 transition-all cursor-pointer">
                  <i className="fab fa-paypal text-3xl text-gray-400 mb-2"></i>
                  <p className="font-semibold text-gray-900 dark:text-white">PayPal</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Fast PayPal transfer</p>
                </div>
                <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center hover:border-purple-500 transition-all cursor-pointer">
                  <i className="fab fa-stripe text-3xl text-gray-400 mb-2"></i>
                  <p className="font-semibold text-gray-900 dark:text-white">Stripe</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Stripe Connect payout</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payout Request Modal */}
        {showPayoutRequestModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Request Payout</h2>
                  <button
                    onClick={() => setShowPayoutRequestModal(false)}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    <i className="fas fa-times text-gray-600 dark:text-gray-300"></i>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">Available Balance</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">$3,200</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Payout Method
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all">
                    {payoutMethods.map(method => (
                      <option key={method.id} value={method.id}>
                        {method.name} - {method.details}
                        {method.isDefault ? ' (Default)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-info-circle text-yellow-600 dark:text-yellow-400 mt-0.5"></i>
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <p className="font-semibold mb-1">Processing Information</p>
                      <p>Your payout request will be sent to the MUAB admin team for review. You'll receive a notification once it's processed (typically within 3-5 business days).</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPayoutRequestModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayout}
                    className="flex-1 px-6 py-3 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Confirm Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
