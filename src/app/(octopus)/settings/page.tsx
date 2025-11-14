'use client';

import { useState } from 'react';
import OctopusLayout from '@/components/layout/OctopusLayout';

type SettingsTab = 'profile' | 'account' | 'security' | 'notifications';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  // Profile Settings
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [handle, setHandle] = useState('johndoe');
  const [headline, setHeadline] = useState('Web Developer & Educator');
  const [bio, setBio] = useState('Helping people learn web development through practical courses and tutorials.');
  const [website, setWebsite] = useState('https://johndoe.com');
  const [location, setLocation] = useState('San Francisco, CA');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  // Account Settings
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [currency, setCurrency] = useState('USD');
  const [emailVisible, setEmailVisible] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private'>('public');

  // Security Settings
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState({
    newSale: true,
    newEnrollment: true,
    productReview: true,
    liveEventReminder: true,
    payoutProcessed: true,
    marketingUpdates: false,
    weeklyReport: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    newSale: true,
    newEnrollment: true,
    productReview: false,
    liveEventReminder: true
  });

  const handleSaveProfile = () => {
    console.log('Saving profile...', { fullName, email, handle, headline, bio });
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Changing password...');
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const activeSessions = [
    { id: '1', device: 'MacBook Pro', location: 'San Francisco, CA', lastActive: '2 minutes ago', current: true },
    { id: '2', device: 'iPhone 14 Pro', location: 'San Francisco, CA', lastActive: '1 hour ago', current: false },
    { id: '3', device: 'Chrome on Windows', location: 'New York, NY', lastActive: '2 days ago', current: false }
  ];

  return (
    <OctopusLayout accountType="professional">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'profile'
                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'account'
                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <i className="fas fa-cog"></i>
                <span>Account</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'security'
                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <i className="fas fa-shield-alt"></i>
                <span>Security</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all flex items-center gap-3 ${
                  activeTab === 'notifications'
                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <i className="fas fa-bell"></i>
                <span>Notifications</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700 space-y-4">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Profile Information</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Update your personal details and public profile</p>
                  </div>

                  {/* Profile Picture */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-semibold tracking-tight overflow-hidden">
                        {profilePicture ? (
                          <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          'JD'
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          id="profile-pic"
                          accept="image/*"
                          onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <label
                          htmlFor="profile-pic"
                          className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all inline-block"
                        >
                          Change Picture
                        </label>
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 5MB.</p>
                      </div>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  {/* Handle */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Handle
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">muab.com/@</span>
                      <input
                        type="text"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                        className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Your profile URL: <span className="text-purple-600 dark:text-purple-400">muab.com/@{handle}</span>
                    </p>
                  </div>

                  {/* Headline */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      maxLength={120}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-2">{headline.length}/120 characters</p>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  {/* Website & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700 space-y-4">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Account Preferences</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                      <option value="Asia/Dubai">Dubai (GST)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                    </select>
                  </div>

                  {/* Currency */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="EGP">EGP - Egyptian Pound</option>
                    </select>
                  </div>

                  {/* Privacy Settings */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">Profile Visibility</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your profile</p>
                        </div>
                        <select
                          value={profileVisibility}
                          onChange={(e) => setProfileVisibility(e.target.value as 'public' | 'private')}
                          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">Show Email on Profile</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Display your email publicly</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailVisible}
                            onChange={(e) => setEmailVisible(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all">
                      Save Preferences
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white dark:bg-gray-800 rounded-md p-5 border-2 border-red-200 dark:border-red-900">
                  <h2 className="text-base font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
                  <div className="space-y-3">
                    <button className="w-full p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-md font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-left flex items-center justify-between">
                      <div>
                        <p className="font-bold">Deactivate Account</p>
                        <p className="text-sm">Temporarily disable your account</p>
                      </div>
                      <i className="fas fa-pause"></i>
                    </button>
                    <button className="w-full p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-md font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-left flex items-center justify-between">
                      <div>
                        <p className="font-bold">Delete Account</p>
                        <p className="text-sm">Permanently delete your account and all data</p>
                      </div>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700 space-y-4">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Change Password</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Update your password to keep your account secure</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleChangePassword}
                      className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Two-Factor Authentication</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  {twoFactorEnabled && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Two-factor authentication is enabled. You'll need to enter a code from your authenticator app when logging in.
                      </p>
                    </div>
                  )}
                </div>

                {/* Active Sessions */}
                <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h2>
                  <div className="space-y-3">
                    {activeSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                            <i className="fas fa-laptop text-purple-600 dark:text-purple-400"></i>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                              {session.device}
                              {session.current && (
                                <span className="px-2 py-0.5 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">
                                  Current
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {session.location} • {session.lastActive}
                            </p>
                          </div>
                        </div>
                        {!session.current && (
                          <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-all">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700 space-y-4">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Email Notifications</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Choose what updates you want to receive via email</p>
                  </div>

                  <div className="space-y-3">
                    {Object.entries({
                      newSale: 'New Sale',
                      newEnrollment: 'New Student Enrollment',
                      productReview: 'Product Reviews',
                      liveEventReminder: 'Live Event Reminders',
                      payoutProcessed: 'Payout Processed',
                      marketingUpdates: 'Marketing Updates & Tips',
                      weeklyReport: 'Weekly Performance Report'
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailNotifications[key as keyof typeof emailNotifications]}
                            onChange={(e) => setEmailNotifications({ ...emailNotifications, [key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700 space-y-4">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Push Notifications</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage push notifications on your devices</p>
                  </div>

                  <div className="space-y-3">
                    {Object.entries({
                      newSale: 'New Sale',
                      newEnrollment: 'New Student Enrollment',
                      productReview: 'Product Reviews',
                      liveEventReminder: 'Live Event Reminders'
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pushNotifications[key as keyof typeof pushNotifications]}
                            onChange={(e) => setPushNotifications({ ...pushNotifications, [key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all">
                    Save Notification Preferences
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </OctopusLayout>
  );
}
