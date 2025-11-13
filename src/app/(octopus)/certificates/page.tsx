'use client';

import { useState } from 'react';
import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';

interface Certificate {
  id: string;
  name: string;
  description: string;
  linkedProduct: string;
  linkedProductId: string;
  template: 'modern' | 'classic' | 'elegant' | 'minimal';
  issuedCount: number;
  backgroundColor: string;
  textColor: string;
  borderStyle: string;
  includeLogo: boolean;
  includeSignature: boolean;
  createdAt: string;
}

interface Recipient {
  id: string;
  certificateId: string;
  certificateName: string;
  userName: string;
  userEmail: string;
  issuedDate: string;
  completionDate: string;
  status: 'issued' | 'revoked';
}

export default function CertificatesPage() {
  const [activeTab, setActiveTab] = useState<'templates' | 'recipients'>('templates');

  const certificates: Certificate[] = [
    {
      id: '1',
      name: 'Course Completion Certificate',
      description: 'Awarded to students who complete the full course',
      linkedProduct: 'Digital Marketing Masterclass',
      linkedProductId: 'dp-001',
      template: 'modern',
      issuedCount: 127,
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      borderStyle: 'gradient',
      includeLogo: true,
      includeSignature: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Professional Development Certificate',
      description: 'For advanced course completion',
      linkedProduct: 'Leadership Training Program',
      linkedProductId: 'dp-002',
      template: 'elegant',
      issuedCount: 89,
      backgroundColor: '#F9FAFB',
      textColor: '#111827',
      borderStyle: 'solid',
      includeLogo: true,
      includeSignature: true,
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      name: 'Workshop Participation Certificate',
      description: 'Certificate for workshop attendees',
      linkedProduct: 'AI & Machine Learning Workshop',
      linkedProductId: 'dp-003',
      template: 'classic',
      issuedCount: 45,
      backgroundColor: '#FFF7ED',
      textColor: '#9A3412',
      borderStyle: 'double',
      includeLogo: false,
      includeSignature: true,
      createdAt: '2024-03-10'
    }
  ];

  const recipients: Recipient[] = [
    {
      id: 'r1',
      certificateId: '1',
      certificateName: 'Course Completion Certificate',
      userName: 'Sarah Johnson',
      userEmail: 'sarah.j@email.com',
      issuedDate: '2024-10-15',
      completionDate: '2024-10-14',
      status: 'issued'
    },
    {
      id: 'r2',
      certificateId: '1',
      certificateName: 'Course Completion Certificate',
      userName: 'Michael Chen',
      userEmail: 'michael.c@email.com',
      issuedDate: '2024-10-20',
      completionDate: '2024-10-19',
      status: 'issued'
    },
    {
      id: 'r3',
      certificateId: '2',
      certificateName: 'Professional Development Certificate',
      userName: 'Emma Davis',
      userEmail: 'emma.d@email.com',
      issuedDate: '2024-11-01',
      completionDate: '2024-10-31',
      status: 'issued'
    },
    {
      id: 'r4',
      certificateId: '1',
      certificateName: 'Course Completion Certificate',
      userName: 'James Wilson',
      userEmail: 'james.w@email.com',
      issuedDate: '2024-10-25',
      completionDate: '2024-10-24',
      status: 'revoked'
    },
    {
      id: 'r5',
      certificateId: '3',
      certificateName: 'Workshop Participation Certificate',
      userName: 'Olivia Martinez',
      userEmail: 'olivia.m@email.com',
      issuedDate: '2024-11-05',
      completionDate: '2024-11-05',
      status: 'issued'
    }
  ];

  const getTemplatePreview = (template: string) => {
    switch (template) {
      case 'modern':
        return 'bg-linear-to-br from-purple-100 to-cyan-100';
      case 'classic':
        return 'bg-amber-50';
      case 'elegant':
        return 'bg-gray-50';
      case 'minimal':
        return 'bg-white';
      default:
        return 'bg-white';
    }
  };

  return (
    <OctopusLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Certificates</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage certificate templates and view recipients
            </p>
          </div>
          <Link
            href="/certificates/create"
            className="px-6 py-3 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            <span>Create Certificate</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Templates</p>
              <i className="fas fa-certificate text-yellow-500"></i>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{certificates.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Issued</p>
              <i className="fas fa-award text-purple-500"></i>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {certificates.reduce((sum, cert) => sum + cert.issuedCount, 0)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <i className="fas fa-calendar text-cyan-500"></i>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">23</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Recipients</p>
              <i className="fas fa-users text-green-500"></i>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {recipients.filter(r => r.status === 'issued').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 px-6 py-2 font-semibold transition-all ${
                activeTab === 'templates'
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-b-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <i className="fas fa-certificate mr-2"></i>
              Certificate Templates
            </button>
            <button
              onClick={() => setActiveTab('recipients')}
              className={`flex-1 px-6 py-2 font-semibold transition-all ${
                activeTab === 'recipients'
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-b-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <i className="fas fa-users mr-2"></i>
              Who Earned This
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'templates' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all"
                  >
                    {/* Certificate Preview */}
                    <div className={`h-48 ${getTemplatePreview(cert.template)} border-b border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center`}>
                      <i className="fas fa-certificate text-5xl text-gray-400 mb-3"></i>
                      <h3 className="text-lg font-bold text-gray-900 text-center capitalize">
                        {cert.template} Template
                      </h3>
                    </div>

                    {/* Certificate Info */}
                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{cert.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{cert.description}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <i className="fas fa-link text-purple-500"></i>
                        <span className="text-gray-600 dark:text-gray-400">
                          Linked to: <span className="font-semibold text-gray-900 dark:text-white">{cert.linkedProduct}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <i className="fas fa-award text-yellow-500"></i>
                          <span className="font-semibold text-gray-900 dark:text-white">{cert.issuedCount} issued</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          {cert.includeLogo && <i className="fas fa-image" title="Includes logo"></i>}
                          {cert.includeSignature && <i className="fas fa-signature" title="Includes signature"></i>}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          href={`/certificates/${cert.id}`}
                          className="flex-1 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all text-center"
                        >
                          <i className="fas fa-eye mr-1"></i>
                          Preview
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex items-center gap-4 mb-6">
                  <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all">
                    <option value="">All Certificates</option>
                    {certificates.map(cert => (
                      <option key={cert.id} value={cert.id}>{cert.name}</option>
                    ))}
                  </select>

                  <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all">
                    <option value="">All Statuses</option>
                    <option value="issued">Issued</option>
                    <option value="revoked">Revoked</option>
                  </select>

                  <div className="flex-1"></div>

                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                    <i className="fas fa-download mr-2"></i>
                    Export
                  </button>
                </div>

                {/* Recipients Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Recipient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Certificate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Completion Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Issued Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {recipients.map((recipient) => (
                        <tr key={recipient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {recipient.userName}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {recipient.userEmail}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {recipient.certificateName}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {new Date(recipient.completionDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {new Date(recipient.issuedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                              recipient.status === 'issued'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                            }`}>
                              <i className={`fas ${recipient.status === 'issued' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                              {recipient.status === 'issued' ? 'Issued' : 'Revoked'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
                              <i className="fas fa-download"></i>
                            </button>
                            <button className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400">
                              <i className="fas fa-share-alt"></i>
                            </button>
                            {recipient.status === 'issued' && (
                              <button className="text-red-600 hover:text-red-700 dark:text-red-400">
                                <i className="fas fa-ban"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </OctopusLayout>
  );
}
