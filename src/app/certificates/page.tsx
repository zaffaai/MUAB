'use client';

import { useState } from 'react';

const mockCertificates = [
  {
    id: 1,
    name: "Course Completion Certificate",
    linkedProduct: "Premium Design Course",
    issued: 156,
    template: "modern",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Workshop Attendance Certificate",
    linkedProduct: "Marketing Masterclass",
    issued: 89,
    template: "classic",
    createdAt: "2024-02-01"
  },
];

export default function CertificatesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            Certificates
            <span className="px-3 py-1 bg-linear-to-r from-purple-600 to-pink-600 text-white text-sm rounded-full font-semibold">
              PRO
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Create and issue certificates to your students
          </p>
        </div>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl">
          <i className="fas fa-plus"></i>
          <span>Create Certificate</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-certificate text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Templates</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-award text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Issued</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">245</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-cyan-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">240</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="Search certificates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
        />
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCertificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-lg group"
          >
            {/* Certificate Preview */}
            <div className="bg-linear-to-br from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 rounded-lg p-8 mb-4 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <i className="fas fa-medal text-yellow-500 text-4xl opacity-20"></i>
              </div>
              <div className="relative z-10">
                <div className="text-center">
                  <i className="fas fa-certificate text-purple-600 text-5xl mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Certificate of Achievement
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Linked Product:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{cert.linkedProduct}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Template:</span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs font-medium">
                  {cert.template}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Issued:</span>
                <span className="text-sm font-semibold text-green-600">{cert.issued} certificates</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                <i className="fas fa-edit mr-2"></i>
                Edit Template
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for Pro Feature */}
      <div className="bg-linear-to-br from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg p-12 text-center border-2 border-dashed border-purple-300 dark:border-purple-700">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Issue Professional Certificates
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Create branded certificates for your courses and automatically issue them to students upon completion
        </p>
        <div className="flex gap-3 justify-center">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <i className="fas fa-plus"></i>
            <span>Create New Template</span>
          </button>
          <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <i className="fas fa-book"></i>
            <span>View Documentation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
