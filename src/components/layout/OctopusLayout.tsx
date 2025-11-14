'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore, type AccountType } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

interface Notification {
  id: string;
  type: 'sale' | 'comment' | 'follower' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  color: string;
}

interface OctopusLayoutProps {
  children: React.ReactNode;
  accountType?: AccountType;
}

export default function OctopusLayout({ children, accountType = 'professional' }: OctopusLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'sale',
      title: 'New Sale',
      message: 'Someone purchased "Premium Design Course"',
      time: '5 min ago',
      read: false,
      icon: 'fa-shopping-cart',
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'follower',
      title: 'New Followers',
      message: '3 new people followed you',
      time: '12 min ago',
      read: false,
      icon: 'fa-user-plus',
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'comment',
      title: 'New Comment',
      message: 'Sarah commented on your JavaScript Course',
      time: '1 hour ago',
      read: true,
      icon: 'fa-comment',
      color: 'text-purple-600'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Use user's account type from auth store if available
  const currentAccountType = user?.accountType || accountType;
  const userName = user?.name || 'John Doe';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
  const cartItemCount = getItemCount();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navigationArms = [
    {
      name: 'Home',
      icon: 'fa-home',
      href: '/dashboard',
      color: 'text-purple-600 ',
      bgColor: 'bg-purple-50 '
    },
    {
      name: 'Digital Products',
      icon: 'fa-box',
      href: '/digital-products',
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/30'
    },
    {
      name: 'Live Events',
      icon: 'fa-video',
      href: '/live-events',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    },
    {
      name: 'Finance',
      icon: 'fa-wallet',
      href: '/finance',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/30'
    },
    {
      name: 'Billing',
      icon: 'fa-credit-card',
      href: '/billing',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30'
    },
    ...(currentAccountType === 'company' || currentAccountType === 'enterprise' ? [
      {
        name: 'Certificates',
        icon: 'fa-certificate',
        href: '/certificates',
        color: 'text-yellow-600 dark:text-yellow-400',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
      },
      {
        name: 'Members',
        icon: 'fa-users',
        href: '/members',
        color: 'text-pink-600 dark:text-pink-400',
        bgColor: 'bg-pink-100 dark:bg-pink-900/30'
      }
    ] : []),
    ...(currentAccountType === 'enterprise' ? [
      {
        name: 'Roles & Permissions',
        icon: 'fa-shield-alt',
        href: '/enterprise/roles-permissions',
        color: 'text-purple-600 ',
        bgColor: 'bg-purple-50 '
      },
      {
        name: 'User Management',
        icon: 'fa-user-cog',
        href: '/enterprise/users',
        color: 'text-cyan-600 dark:text-cyan-400',
        bgColor: 'bg-cyan-50 dark:bg-cyan-900/30'
      },
      {
        name: 'Post Management',
        icon: 'fa-comments',
        href: '/enterprise/posts',
        color: 'text-orange-600 dark:text-orange-400',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30'
      }
    ] : []),
    {
      name: 'Marketplace',
      icon: 'fa-store',
      href: '/marketplace',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50  transition-colors">
      {/* Top Header */}
      <header className="bg-white  border-b border-gray-200  sticky top-0 z-40 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo & Menu Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden w-10 h-10 rounded-lg bg-gray-100  flex items-center justify-center hover:bg-gray-200  transition-all"
              >
                <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-gray-600 `}></i>
              </button>
              
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-sm">
                  <i className="fas fa-spider text-white text-lg"></i>
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-linear-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                    MUAB
                  </h1>
                  <p className="text-[10px] text-gray-500  -mt-1">Octopus System</p>
                </div>
              </Link>
            </div>

            {/* Center: Search */}
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search products, events, customers..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200  bg-white  text-gray-900  placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
              >
                <i className="fas fa-shopping-cart text-gray-600"></i>
                {isMounted && cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative w-10 h-10 rounded-lg bg-gray-100  flex items-center justify-center hover:bg-gray-200  transition-all"
                >
                  <i className="fas fa-bell text-gray-600 "></i>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-96 bg-white  rounded-lg shadow-sm border border-gray-200  z-50 max-h-[500px] overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-200  flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 ">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-purple-600  hover:text-purple-700 "
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="overflow-y-auto max-h-[400px]">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => markAsRead(notif.id)}
                            className={`p-4 border-b border-gray-200  hover:bg-gray-50  cursor-pointer transition-all ${
                              !notif.read ? 'bg-purple-50 ' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-full bg-gray-100  flex items-center justify-center ${notif.color}`}>
                                <i className={`fas ${notif.icon}`}></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-semibold text-sm text-gray-900 ">
                                    {notif.title}
                                  </p>
                                  {!notif.read && (
                                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600  mb-1">
                                  {notif.message}
                                </p>
                                <p className="text-xs text-gray-500 ">
                                  {notif.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <i className="fas fa-bell-slash text-4xl text-gray-300  mb-3"></i>
                          <p className="text-gray-600 ">No notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200 ">
                      <button className="w-full text-center text-sm text-purple-600  hover:text-purple-700  font-semibold">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative flex items-center gap-3 pl-3 border-l border-gray-200 ">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900 ">{userName}</p>
                  <p className="text-xs text-gray-500  capitalize">{currentAccountType}</p>
                </div>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-semibold hover:shadow-md transition-all duration-200"
                >
                  {userInitials}
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white  rounded-lg shadow-sm border border-gray-200  py-2 z-50">
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 "
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <i className="fas fa-cog"></i>
                      <span>Settings</span>
                    </Link>
                    <Link
                      href="/billing"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 "
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <i className="fas fa-credit-card"></i>
                      <span>Billing</span>
                    </Link>
                    <hr className="my-2 border-gray-200 " />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-white  border-r border-gray-200  overflow-y-auto transition-transform z-30 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <nav className="p-4 space-y-2">
          {navigationArms.map((arm) => {
            const isActive = pathname === arm.href || pathname.startsWith(arm.href + '/');
            return (
              <Link
                key={arm.href}
                href={arm.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? `${arm.bgColor} ${arm.color} font-semibold shadow-sm`
                    : 'text-gray-700  hover:bg-gray-100 '
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isActive ? arm.bgColor : 'bg-gray-100  group-hover:scale-105'
                } transition-all duration-200`}>
                  <i className={`fas ${arm.icon} ${isActive ? arm.color : 'text-gray-500 '}`}></i>
                </div>
                <span>{arm.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-current"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Octopus Visual Indicator */}
        <div className="p-4 mt-6">
          <div className="bg-purple-50 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-md p-4 border border-purple-200 dark:border-purple-800">
            <div className="text-center">
              <i className="fas fa-spider text-4xl bg-purple-600 bg-clip-text text-transparent mb-2"></i>
              <p className="text-xs font-semibold text-gray-700 ">Octopus System</p>
              <p className="text-[10px] text-gray-500  mt-1">
                {navigationArms.length} arms connected
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all ${sidebarOpen ? 'lg:pl-64' : ''} pt-16`}>
        <div className="px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
