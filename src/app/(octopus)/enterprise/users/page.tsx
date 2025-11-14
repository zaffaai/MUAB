'use client';

import { useState } from 'react';
import OctopusLayout from '@/components/layout/OctopusLayout';
import { useEnterpriseStore } from '@/store/enterpriseStore';
import { EnterpriseUser } from '@/types/enterprise';

export default function UserManagementPage() {
  const { users, posts, toggleUserPosting, toggleUserCommenting } = useEnterpriseStore();
  const [selectedUser, setSelectedUser] = useState<EnterpriseUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const userPosts = selectedUser
    ? posts.filter((post) => post.authorId === selectedUser.id).slice(0, 5)
    : [];

  const handleViewUser = (user: EnterpriseUser) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleTogglePosting = (userId: string) => {
    toggleUserPosting(userId);
  };

  const handleToggleCommenting = (userId: string) => {
    toggleUserCommenting(userId);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.handle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <OctopusLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Manage all users on your enterprise platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-md p-5 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center">
                <i className="fas fa-users text-blue-600"></i>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {users.length}
                </p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md p-5 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-green-50 flex items-center justify-center">
                <i className="fas fa-check-circle text-green-600"></i>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {users.filter((u) => u.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md p-5 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-purple-50 flex items-center justify-center">
                <i className="fas fa-comment text-purple-600"></i>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {users.reduce((sum, u) => sum + u.stats.postsCreated, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Posts</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md p-5 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-orange-100 flex items-center justify-center">
                <i className="fas fa-ban text-orange-600"></i>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {users.filter((u) => !u.canPostOnPlatform || !u.canCommentOnPlatform).length}
                </p>
                <p className="text-sm text-gray-600">Restricted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-md p-5 border border-gray-200">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users by name, email, or handle..."
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-md border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              All Users ({filteredUsers.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3.5 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-3.5 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3.5 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-3.5 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Posts
                  </th>
                  <th className="px-3.5 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Restrictions
                  </th>
                  <th className="px-3.5 py-2 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50:bg-gray-900/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {user.handle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'active'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <i
                          className={`fas fa-circle text-xs ${
                            user.status === 'active' ? 'text-green-500' : 'text-gray-400'
                          }`}
                        ></i>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatTimeAgo(user.lastActive)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900">
                          {user.stats.postsCreated}
                        </p>
                        <p className="text-gray-600">
                          {user.stats.commentsCreated} comments
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {!user.canPostOnPlatform && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-700">
                            <i className="fas fa-ban"></i>
                            No Posts
                          </span>
                        )}
                        {!user.canCommentOnPlatform && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-orange-100 text-orange-700">
                            <i className="fas fa-comment-slash"></i>
                            No Comments
                          </span>
                        )}
                        {user.canPostOnPlatform && user.canCommentOnPlatform && (
                          <span className="text-sm text-gray-400">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="text-purple-600 hover:text-purple-700"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Details Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-md max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900">
                    User Details
                  </h2>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200:bg-gray-600 transition-all"
                  >
                    <i className="fas fa-times text-gray-600"></i>
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* User Info */}
                <div className="flex items-start gap-4">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {selectedUser.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {selectedUser.handle}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      {selectedUser.email}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedUser.status === 'active'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <i
                        className={`fas fa-circle text-xs ${
                          selectedUser.status === 'active' ? 'text-green-500' : 'text-gray-400'
                        }`}
                      ></i>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-base font-semibold text-gray-900 mb-1">
                      {selectedUser.stats.postsCreated}
                    </p>
                    <p className="text-sm text-gray-600">Posts</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-base font-semibold text-gray-900 mb-1">
                      {selectedUser.stats.commentsCreated}
                    </p>
                    <p className="text-sm text-gray-600">Comments</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-base font-semibold text-gray-900 mb-1">
                      {selectedUser.stats.productsCreated}
                    </p>
                    <p className="text-sm text-gray-600">Products</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-base font-semibold text-gray-900 mb-1">
                      {selectedUser.stats.engagement}%
                    </p>
                    <p className="text-sm text-gray-600">Engagement</p>
                  </div>
                </div>

                {/* Restrictions */}
                <div className="bg-gray-50 rounded-md p-5 space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Platform Restrictions
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Posting Ability
                      </p>
                      <p className="text-sm text-gray-600">
                        Allow user to create posts on the platform
                      </p>
                    </div>
                    <button
                      onClick={() => handleTogglePosting(selectedUser.id)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        selectedUser.canPostOnPlatform
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          selectedUser.canPostOnPlatform ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Commenting Ability
                      </p>
                      <p className="text-sm text-gray-600">
                        Allow user to comment on posts
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleCommenting(selectedUser.id)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        selectedUser.canCommentOnPlatform
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          selectedUser.canCommentOnPlatform ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Recent Posts */}
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">
                    Recent Posts
                  </h3>
                  {userPosts.length > 0 ? (
                    <div className="space-y-3">
                      {userPosts.map((post) => (
                        <div
                          key={post.id}
                          className="bg-gray-50 rounded-md p-4"
                        >
                          <p className="text-gray-900 mb-2">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>
                              <i className="fas fa-heart mr-1"></i>
                              {post.likes}
                            </span>
                            <span>
                              <i className="fas fa-comment mr-1"></i>
                              {post.comments}
                            </span>
                            <span>
                              <i className="fas fa-clock mr-1"></i>
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <span
                              className={`ml-auto px-2 py-1 rounded-md text-xs font-semibold ${
                                post.status === 'approved'
                                  ? 'bg-green-50 text-green-700'
                                  : post.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {post.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8">
                      No posts yet
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-b-2xl">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="w-full px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
