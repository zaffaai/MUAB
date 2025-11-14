'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  onAIAssistantToggle?: () => void;
}

export default function Header({ onAIAssistantToggle }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-(--topbar-height) bg-(--background-secondary) border-b border-(--border-color) flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* AI Assistant Button */}
        <button
          onClick={onAIAssistantToggle}
          className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
        >
          <span className="text-lg">🤖</span>
          <span className="font-medium hidden sm:inline">AI Assistant</span>
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="search"
            placeholder="Search..."
            className="w-64 px-4 py-2 pl-10 bg-(--background-tertiary) border border-(--border-color) rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-tertiary)">
            🔍
          </span>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <i className="fas fa-sun text-yellow-400"></i>
          ) : (
            <i className="fas fa-moon text-gray-600"></i>
          )}
        </button>

        {/* Notifications */}
        <button
          className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-(--background-tertiary) transition-colors"
          aria-label="Notifications"
        >
          <span className="text-xl">🔔</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-3 border-l border-(--border-color)">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium text-(--foreground)">John Doe</div>
            <div className="text-xs text-(--text-tertiary)">Creator</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            JD
          </button>
        </div>
      </div>
    </header>
  );
}
