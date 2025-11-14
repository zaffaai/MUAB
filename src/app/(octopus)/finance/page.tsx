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
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-50 text-blue-700';
      case 'completed':
        return 'bg-green-50 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
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
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">Finance</h1>
          <p className="text-gray-600">Manage your earnings and payout methods</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-md p-5 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-md bg-${stat.color}-100${stat.color}-900/30 flex items-center justify-center`}>
                  <i className={`fas ${stat.icon} text-xl text-${stat.color}-600${stat.color}-400`}></i>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-base font-semibold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 bg-white rounded-md p-1 border border-gray-200 w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-purple-50 text-purple-700'
                : 'text-gray-600 hover:text-gray-900:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'payouts'
                ? 'bg-purple-50 text-purple-700'
                : 'text-gray-600 hover:text-gray-900:text-white'
            }`}
          >
            Payouts History
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'methods'
                ? 'bg-purple-50 text-purple-700'
                : 'text-gray-600 hover:text-gray-900:text-white'
            }`}
          >
            Payout Methods
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Earnings Chart */}
            <div className="bg-white rounded-md p-5 border border-gray-200">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Monthly Earnings</h2>
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
                      className="w-full bg-purple-600 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(data.amount / 3200) * 100}%` }}
                    ></div>
                    <p className="text-sm text-gray-600 mt-2">{data.month}</p>
                    <p className="text-xs font-semibold text-gray-900">${data.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-md p-5 border border-gray-200">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={handleRequestPayout}
                  className="w-full p-4 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all flex items-center justify-between"
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
                  className="w-full p-4 bg-gray-100 text-gray-900 rounded-md font-semibold hover:bg-gray-200:bg-gray-600 transition-all flex items-center justify-between"
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
                  className="w-full p-4 bg-gray-100 text-gray-900 rounded-md font-semibold hover:bg-gray-200:bg-gray-600 transition-all flex items-center justify-between"
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
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex gap-3">
                  <i className="fas fa-info-circle text-blue-600 mt-1"></i>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900 mb-1">Platform Fee</p>
                    <p className="text-sm text-blue-700">
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
          <div className="bg-white rounded-md border border-gray-200">
            {/* Filters */}
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Payout History</h2>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as PayoutStatus | 'all')}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
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
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Transaction ID</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Gross Amount</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Platform Fee</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Net Amount</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Method</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-600">Payout Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayouts.map((payout) => (
                    <tr
                      key={payout.id}
                      className="border-b border-gray-200 hover:bg-gray-50:bg-gray-700/50 transition-all"
                    >
                      <td className="p-4 text-sm text-gray-900">
                        {new Date(payout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="p-4 text-sm text-gray-600 font-mono">
                        {payout.transactionId || '—'}
                      </td>
                      <td className="p-4 text-sm font-semibold text-gray-900">
                        {payout.currency} {payout.amount.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm text-red-600">
                        -{payout.currency} {payout.platformFee.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm font-semibold text-green-600">
                        {payout.currency} {payout.netAmount.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <i className={`fas ${getMethodIcon(payout.method)}`}></i>
                          <span className="capitalize">{payout.method}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payout.status)}`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
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
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-receipt text-2xl text-gray-400"></i>
                </div>
                <p className="text-gray-600">No payouts found</p>
              </div>
            )}
          </div>
        )}

        {/* Payout Methods Tab */}
        {activeTab === 'methods' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Payout Methods</h2>
              <button
                onClick={() => setShowAddMethodModal(true)}
                className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all flex items-center gap-2"
              >
                <i className="fas fa-plus"></i>
                <span>Add Method</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {payoutMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-white rounded-md p-5 border border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-purple-50 flex items-center justify-center">
                        <i className={`fas ${getMethodIcon(method.type)} text-xl text-purple-600`}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.details}</p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {method.isVerified ? (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <i className="fas fa-check-circle"></i>
                        <span>Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-yellow-600 text-sm">
                        <i className="fas fa-exclamation-circle"></i>
                        <span>Pending Verification</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <button className="flex-1 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-200:bg-purple-900/50 transition-all">
                        Set as Default
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200:bg-gray-600 transition-all">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200:bg-red-900/50 transition-all">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Method Options */}
            <div className="bg-white rounded-md p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Available Payout Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-md text-center hover:border-purple-500 transition-all cursor-pointer">
                  <i className="fas fa-university text-3xl text-gray-400 mb-2"></i>
                  <p className="font-semibold text-gray-900">Bank Transfer</p>
                  <p className="text-xs text-gray-600">Direct deposit to bank</p>
                </div>
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-md text-center hover:border-purple-500 transition-all cursor-pointer">
                  <i className="fab fa-paypal text-3xl text-gray-400 mb-2"></i>
                  <p className="font-semibold text-gray-900">PayPal</p>
                  <p className="text-xs text-gray-600">Fast PayPal transfer</p>
                </div>
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-md text-center hover:border-purple-500 transition-all cursor-pointer">
                  <i className="fab fa-stripe text-3xl text-gray-400 mb-2"></i>
                  <p className="font-semibold text-gray-900">Stripe</p>
                  <p className="text-xs text-gray-600">Stripe Connect payout</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payout Request Modal */}
        {showPayoutRequestModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-md max-w-md w-full">
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900">Request Payout</h2>
                  <button
                    onClick={() => setShowPayoutRequestModal(false)}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200:bg-gray-600 transition-all"
                  >
                    <i className="fas fa-times text-gray-600"></i>
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="bg-purple-50 rounded-md p-4 border border-purple-200">
                  <p className="text-sm text-purple-700 mb-2">Available Balance</p>
                  <p className="text-xl font-semibold tracking-tight text-purple-900">$3,200</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Payout Method
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all">
                    {payoutMethods.map(method => (
                      <option key={method.id} value={method.id}>
                        {method.name} - {method.details}
                        {method.isDefault ? ' (Default)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-yellow-50 rounded-md p-4 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-info-circle text-yellow-600 mt-0.5"></i>
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Processing Information</p>
                      <p>Your payout request will be sent to the MUAB admin team for review. You'll receive a notification once it's processed (typically within 3-5 business days).</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPayoutRequestModal(false)}
                    className="flex-1 px-3.5 py-2 bg-gray-100 text-gray-900 rounded-md font-semibold hover:bg-gray-200:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayout}
                    className="flex-1 px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
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
