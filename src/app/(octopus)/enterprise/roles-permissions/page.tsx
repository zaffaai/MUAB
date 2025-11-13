'use client';

import { useState } from 'react';
import OctopusLayout from '@/components/layout/OctopusLayout';
import { useEnterpriseStore } from '@/store/enterpriseStore';
import { Role, ROLE_BADGES, ROLE_PERMISSIONS } from '@/types/enterprise';

export default function RolesPermissionsPage() {
  const { users, updateUserRole, removeUser } = useEnterpriseStore();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('instructor');
  const [inviteMessage, setInviteMessage] = useState('');
  const [newRole, setNewRole] = useState<Role>('instructor');

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const handleInviteUser = () => {
    // In production, this would send an email invitation
    console.log('Inviting:', { inviteEmail, inviteRole, inviteMessage });
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('instructor');
    setInviteMessage('');
  };

  const handleChangeRole = () => {
    if (selectedUserId && !selectedUser?.isOwner) {
      updateUserRole(selectedUserId, newRole);
      setShowChangeRoleModal(false);
      setSelectedUserId(null);
    }
  };

  const handleRemoveUser = (userId: string, isOwner: boolean) => {
    if (isOwner) {
      alert('Cannot remove the owner of the organization');
      return;
    }
    if (confirm('Are you sure you want to remove this user?')) {
      removeUser(userId);
    }
  };

  const getRoleBadge = (role: Role) => {
    const badge = ROLE_BADGES[role];
    return `${badge.bg} ${badge.text}`;
  };

  const getRoleIcon = (role: Role) => {
    return ROLE_BADGES[role].icon;
  };

  const getRoleDisplay = (role: Role, isOwner: boolean) => {
    if (isOwner) return 'Owner (Admin)';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const permissionLabels = {
    billing: 'Billing & Payouts',
    users: 'User Management',
    products: 'Digital Products',
    community: 'Community Posts',
    branding: 'Branding & Whitelabel',
    integrations: 'Integrations & APIs',
    security: 'Security & Cloud',
  };

  return (
    <OctopusLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Roles & Permissions
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage user access and permissions across your organization
            </p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all"
          >
            <i className="fas fa-user-plus mr-2"></i>
            Invite User
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <i className="fas fa-crown text-purple-600 dark:text-purple-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter((u) => u.role === 'owner').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Owner</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <i className="fas fa-shield-alt text-blue-600 dark:text-blue-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter((u) => u.role === 'admin').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <i className="fas fa-user-shield text-green-600 dark:text-green-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter((u) => u.role === 'moderator').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Moderators</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <i className="fas fa-chalkboard-teacher text-orange-600 dark:text-orange-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter((u) => u.role === 'instructor').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Instructors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Team Members</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold ${getRoleBadge(user.role)}`}
                      >
                        <i className={`fas ${getRoleIcon(user.role)}`}></i>
                        {getRoleDisplay(user.role, user.isOwner)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : user.status === 'invited'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <i
                          className={`fas fa-circle text-xs ${
                            user.status === 'active'
                              ? 'text-green-500'
                              : user.status === 'invited'
                              ? 'text-yellow-500'
                              : 'text-gray-400'
                          }`}
                        ></i>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(user.invitedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setNewRole(user.role);
                          setShowChangeRoleModal(true);
                        }}
                        disabled={user.isOwner}
                        className={`${
                          user.isOwner
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-purple-600 hover:text-purple-700 dark:text-purple-400'
                        }`}
                        title={user.isOwner ? 'Cannot change owner role' : 'Change Role'}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleRemoveUser(user.id, user.isOwner)}
                        disabled={user.isOwner}
                        className={`${
                          user.isOwner
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-600 hover:text-red-700 dark:text-red-400'
                        }`}
                        title={user.isOwner ? 'Cannot remove owner' : 'Remove User'}
                      >
                        <i className="fas fa-user-times"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Permission Matrix
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Overview of what each role can access
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Permission
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                    <i className="fas fa-crown mr-1"></i>Owner
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                    <i className="fas fa-shield-alt mr-1"></i>Admin
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wider">
                    <i className="fas fa-user-shield mr-1"></i>Moderator
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-orange-700 dark:text-orange-300 uppercase tracking-wider">
                    <i className="fas fa-chalkboard-teacher mr-1"></i>Instructor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {Object.entries(permissionLabels).map(([key, label]) => (
                  <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {label}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {ROLE_PERMISSIONS.owner[key as keyof typeof ROLE_PERMISSIONS.owner] ? (
                        <i className="fas fa-check-circle text-green-500 text-lg"></i>
                      ) : (
                        <i className="fas fa-times-circle text-gray-300 dark:text-gray-600 text-lg"></i>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {ROLE_PERMISSIONS.admin[key as keyof typeof ROLE_PERMISSIONS.admin] ? (
                        <i className="fas fa-check-circle text-green-500 text-lg"></i>
                      ) : (
                        <i className="fas fa-times-circle text-gray-300 dark:text-gray-600 text-lg"></i>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {ROLE_PERMISSIONS.moderator[key as keyof typeof ROLE_PERMISSIONS.moderator] ? (
                        <i className="fas fa-check-circle text-green-500 text-lg"></i>
                      ) : (
                        <i className="fas fa-times-circle text-gray-300 dark:text-gray-600 text-lg"></i>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {ROLE_PERMISSIONS.instructor[key as keyof typeof ROLE_PERMISSIONS.instructor] ? (
                        <i className="fas fa-check-circle text-green-500 text-lg"></i>
                      ) : (
                        <i className="fas fa-times-circle text-gray-300 dark:text-gray-600 text-lg"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <i className="fas fa-info-circle mr-2"></i>
              <strong>Note:</strong> Instructors can only manage their own created products.
              Owner role cannot be changed or removed.
            </p>
          </div>
        </div>

        {/* Invite User Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Invite User
                  </h2>
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    <i className="fas fa-times text-gray-600 dark:text-gray-300"></i>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="user@company.com"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as Role)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="admin">Admin - Full organizational control</option>
                    <option value="moderator">Moderator - Community management</option>
                    <option value="instructor">Instructor - Content creation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    placeholder="Add a personal message to the invitation..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-b-2xl flex gap-3">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInviteUser}
                  disabled={!inviteEmail}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Change Role Modal */}
        {showChangeRoleModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Change User Role
                  </h2>
                  <button
                    onClick={() => setShowChangeRoleModal(false)}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    <i className="fas fa-times text-gray-600 dark:text-gray-300"></i>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedUser.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    New Role
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as Role)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="admin">Admin - Full organizational control</option>
                    <option value="moderator">Moderator - Community management</option>
                    <option value="instructor">Instructor - Content creation</option>
                  </select>
                </div>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-b-2xl flex gap-3">
                <button
                  onClick={() => setShowChangeRoleModal(false)}
                  className="flex-1 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangeRole}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all"
                >
                  <i className="fas fa-check mr-2"></i>
                  Update Role
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
