'use client';

import { useState } from 'react';
import OctopusLayout from '@/components/layout/OctopusLayout';

interface MemberRequest {
  id: string;
  userName: string;
  userEmail: string;
  userHandle: string;
  userAvatar: string;
  accountType: 'personal' | 'professional';
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface TeamMember {
  id: string;
  userName: string;
  userEmail: string;
  userHandle: string;
  userAvatar: string;
  role: 'admin' | 'creator' | 'analyst' | 'viewer';
  joinedDate: string;
  productsCreated: number;
  revenue: number;
  status: 'active' | 'inactive';
}

export default function MembersPage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'team'>('requests');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const requests: MemberRequest[] = [
    {
      id: '1',
      userName: 'Sarah Johnson',
      userEmail: 'sarah.j@email.com',
      userHandle: '@sarahjohnson',
      userAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random&size=128',
      accountType: 'professional',
      requestDate: '2024-11-10',
      status: 'pending'
    },
    {
      id: '2',
      userName: 'Michael Chen',
      userEmail: 'michael.c@email.com',
      userHandle: '@michaelchen',
      userAvatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random&size=128',
      accountType: 'professional',
      requestDate: '2024-11-12',
      status: 'pending'
    },
    {
      id: '3',
      userName: 'Emma Davis',
      userEmail: 'emma.d@email.com',
      userHandle: '@emmadavis',
      userAvatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=random&size=128',
      accountType: 'personal',
      requestDate: '2024-11-13',
      status: 'pending'
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 't1',
      userName: 'John Doe',
      userEmail: 'john.doe@email.com',
      userHandle: '@johndoe',
      userAvatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random&size=128',
      role: 'admin',
      joinedDate: '2024-01-15',
      productsCreated: 12,
      revenue: 45800,
      status: 'active'
    },
    {
      id: 't2',
      userName: 'Alice Williams',
      userEmail: 'alice.w@email.com',
      userHandle: '@alicew',
      userAvatar: 'https://ui-avatars.com/api/?name=Alice+Williams&background=random&size=128',
      role: 'creator',
      joinedDate: '2024-03-20',
      productsCreated: 8,
      revenue: 23400,
      status: 'active'
    },
    {
      id: 't3',
      userName: 'David Brown',
      userEmail: 'david.b@email.com',
      userHandle: '@davidbrown',
      userAvatar: 'https://ui-avatars.com/api/?name=David+Brown&background=random&size=128',
      role: 'creator',
      joinedDate: '2024-05-10',
      productsCreated: 5,
      revenue: 12300,
      status: 'active'
    },
    {
      id: 't4',
      userName: 'Lisa Anderson',
      userEmail: 'lisa.a@email.com',
      userHandle: '@lisaanderson',
      userAvatar: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=random&size=128',
      role: 'analyst',
      joinedDate: '2024-07-01',
      productsCreated: 0,
      revenue: 0,
      status: 'active'
    },
    {
      id: 't5',
      userName: 'Robert Taylor',
      userEmail: 'robert.t@email.com',
      userHandle: '@roberttaylor',
      userAvatar: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=random&size=128',
      role: 'viewer',
      joinedDate: '2024-09-15',
      productsCreated: 0,
      revenue: 0,
      status: 'inactive'
    }
  ];

  const handleApprove = (requestId: string) => {
    console.log('Approve request:', requestId);
    // In real app, make API call to approve
  };

  const handleReject = (requestId: string) => {
    console.log('Reject request:', requestId);
    // In real app, make API call to reject
  };

  const handleChangeRole = (memberId: string, newRole: string) => {
    console.log('Change role:', memberId, newRole);
    // In real app, make API call to update role
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to revoke this member\'s verification?')) {
      console.log('Revoke member:', memberId);
      // In real app, make API call to remove
    }
  };

  const handleViewProfile = (member: TeamMember) => {
    setSelectedMember(member);
    setShowProfileModal(true);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'creator':
        return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300';
      case 'analyst':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'viewer':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const filteredMembers = selectedRole === 'all' 
    ? teamMembers 
    : teamMembers.filter(m => m.role === selectedRole);

  return (
    <OctopusLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Members</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage association requests and team member roles
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Members</p>
              <i className="fas fa-users text-purple-500"></i>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{teamMembers.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Requests</p>
              <i className="fas fa-clock text-yellow-500"></i>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {requests.filter(r => r.status === 'pending').length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Members</p>
              <i className="fas fa-check-circle text-green-500"></i>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {teamMembers.filter(m => m.status === 'active').length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <i className="fas fa-dollar-sign text-cyan-500"></i>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${teamMembers.reduce((sum, m) => sum + m.revenue, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 px-6 py-3 font-semibold transition-all ${
                activeTab === 'requests'
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-b-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <i className="fas fa-user-clock mr-2"></i>
              Association Requests ({requests.filter(r => r.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex-1 px-6 py-3 font-semibold transition-all ${
                activeTab === 'team'
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-b-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <i className="fas fa-users mr-2"></i>
              Current Team Members ({teamMembers.length})
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'requests' ? (
              <div className="space-y-4">
                {requests.filter(r => r.status === 'pending').length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-inbox text-3xl text-gray-400"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      No pending requests
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      You don't have any pending association requests at the moment.
                    </p>
                  </div>
                ) : (
                  requests.filter(r => r.status === 'pending').map((request) => (
                    <div
                      key={request.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={request.userAvatar}
                          alt={request.userName}
                          className="w-16 h-16 rounded-full"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {request.userName}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {request.userHandle} • {request.userEmail}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${
                              request.accountType === 'professional'
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}>
                              {request.accountType}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-xs text-gray-500">
                              Requested {new Date(request.requestDate).toLocaleDateString()}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleReject(request.id)}
                                className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                              >
                                <i className="fas fa-times mr-1"></i>
                                Decline
                              </button>
                              <button
                                onClick={() => handleApprove(request.id)}
                                className="px-4 py-2 bg-linear-to-br from-purple-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                              >
                                <i className="fas fa-check mr-1"></i>
                                Approve
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex items-center gap-4 mb-6">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="creator">Creator</option>
                    <option value="analyst">Analyst</option>
                    <option value="viewer">Viewer</option>
                  </select>

                  <div className="flex-1"></div>

                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                    <i className="fas fa-download mr-2"></i>
                    Export
                  </button>
                </div>

                {/* Team Members Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Joined Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Products
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Revenue
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
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={member.userAvatar}
                                alt={member.userName}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {member.userName}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {member.userHandle}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={member.role}
                              onChange={(e) => handleChangeRole(member.id, e.target.value)}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${getRoleBadge(member.role)} border-0 cursor-pointer`}
                            >
                              <option value="admin">Admin</option>
                              <option value="creator">Creator</option>
                              <option value="analyst">Analyst</option>
                              <option value="viewer">Viewer</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {new Date(member.joinedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                            {member.productsCreated}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                            ${member.revenue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                              member.status === 'active'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}>
                              <i className={`fas fa-circle text-xs ${member.status === 'active' ? 'text-green-500' : 'text-gray-400'}`}></i>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => handleViewProfile(member)}
                              className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
                              title="View Profile"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-red-600 hover:text-red-700 dark:text-red-400"
                              title="Revoke Verification"
                            >
                              <i className="fas fa-ban"></i>
                            </button>
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

        {/* Profile Modal */}
        {showProfileModal && selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Member Profile
                  </h2>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    <i className="fas fa-times text-gray-600 dark:text-gray-300"></i>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Header */}
                <div className="flex items-start gap-6">
                  <img
                    src={selectedMember.userAvatar}
                    alt={selectedMember.userName}
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {selectedMember.userName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{selectedMember.userHandle}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{selectedMember.userEmail}</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold ${getRoleBadge(selectedMember.role)}`}>
                      {selectedMember.role}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {selectedMember.productsCreated}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Products Created</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      ${selectedMember.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Revenue Generated</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {Math.floor((new Date().getTime() - new Date(selectedMember.joinedDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Joined Date</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {new Date(selectedMember.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedMember.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      <i className={`fas fa-circle text-xs ${selectedMember.status === 'active' ? 'text-green-500' : 'text-gray-400'}`}></i>
                      {selectedMember.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Member ID</span>
                    <span className="text-sm text-gray-900 dark:text-white font-mono">
                      {selectedMember.id}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleRemoveMember(selectedMember.id);
                      setShowProfileModal(false);
                    }}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all"
                  >
                    <i className="fas fa-ban mr-2"></i>
                    Revoke Verification
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
