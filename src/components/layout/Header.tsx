'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  onAIAssistantToggle?: () => void;
}

export default function Header({ onAIAssistantToggle }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-[var(--topbar-height)] bg-[var(--background-secondary)] border-b border-[var(--border-color)] flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* AI Assistant Button */}
        <button
          onClick={onAIAssistantToggle}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
        >
          <span className="text-lg">🤖</span>
          <span className="font-medium hidden sm:inline">AI Assistant</span>
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="search"
            placeholder="Search..."
            className="w-64 px-4 py-2 pl-10 bg-[var(--background-tertiary)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
            🔍
          </span>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--background-tertiary)] transition-colors"
          aria-label="Toggle theme"
        >
          <span className="text-xl">{theme === 'dark' ? '🌙' : '☀️'}</span>
        </button>

        {/* Notifications */}
        <button
          className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--background-tertiary)] transition-colors"
          aria-label="Notifications"
        >
          <span className="text-xl">🔔</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--color-danger)] rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-3 border-l border-[var(--border-color)]">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium text-[var(--foreground)]">John Doe</div>
            <div className="text-xs text-[var(--text-tertiary)]">Creator</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold">
            JD
          </button>
        </div>
      </div>
    </header>
  );
}
