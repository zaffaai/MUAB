'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
  icon: string;
  badge?: string;
  count?: number;
}

interface NavGroup {
  label: string;
  icon: string;
  sublinks: NavLink[];
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Digital Products']);
  const pathname = usePathname();

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  const navGroups: NavGroup[] = [
    {
      label: 'Digital Products',
      icon: '📦',
      sublinks: [
        { href: '/products', label: 'All Products', icon: '⚫', count: 17 },
        { href: '/live-events', label: 'Live Events', icon: '⚫', count: 4 },
        { href: '/products/create', label: 'Create New', icon: '➕' },
      ],
    },
    {
      label: 'Finance',
      icon: '💰',
      sublinks: [
        { href: '/finance', label: 'Overview', icon: '⚫' },
        { href: '/finance/transactions', label: 'Transactions', icon: '⚫' },
        { href: '/finance/payouts', label: 'Payouts', icon: '⚫' },
      ],
    },
  ];

  const singleLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/certificates', label: 'Certificates', icon: '🏆', badge: 'Pro' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[var(--background-secondary)] border-r border-[var(--border-color)] transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand */}
      <div className="h-[var(--topbar-height)] flex items-center justify-between px-5 border-b border-[var(--border-color)]">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex items-center justify-center text-white text-xl">
              💎
            </div>
            <div>
              <div className="font-bold text-lg text-[var(--foreground)]">MUAB</div>
              <div className="text-xs text-[var(--text-tertiary)]">Creator Suite</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--background-tertiary)] transition-colors"
          aria-label="Toggle sidebar"
        >
          <span className="text-[var(--text-secondary)]">{isCollapsed ? '→' : '←'}</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-var(--topbar-height))]">
        {/* Workspace Section */}
        <div className="mb-4">
          {!isCollapsed && (
            <div className="px-3 py-2 text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
              Workspace
            </div>
          )}

          {/* Single Links */}
          {singleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                isActive(link.href)
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--background-tertiary)]'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="flex-1 font-medium">{link.label}</span>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          ))}

          {/* Nav Groups */}
          {navGroups.map((group) => (
            <div key={group.label} className="mt-2">
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--background-tertiary)] transition-all"
              >
                <span className="text-xl">{group.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="flex-1 font-medium text-left">{group.label}</span>
                    <span
                      className={`text-xs transition-transform ${
                        expandedGroups.includes(group.label) ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </>
                )}
              </button>

              {/* Submenu */}
              {!isCollapsed && expandedGroups.includes(group.label) && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-[var(--border-color)] pl-4">
                  {group.sublinks.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                        isActive(sublink.href)
                          ? 'bg-[var(--color-primary-500)] bg-opacity-10 text-[var(--color-primary)] font-medium'
                          : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--background-tertiary)]'
                      }`}
                    >
                      <span className="text-xs">{sublink.icon}</span>
                      <span className="flex-1">{sublink.label}</span>
                      {sublink.count && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--background-tertiary)] text-[var(--text-tertiary)]">
                          {sublink.count}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
