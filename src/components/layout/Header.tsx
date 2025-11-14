'use client';

interface HeaderProps {
  onAIAssistantToggle?: () => void;
}

export default function Header({ onAIAssistantToggle }: HeaderProps) {
  return (
    <header className="h-(--topbar-height) bg-(--background-secondary) border-b border-(--border-color) flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* AI Assistant Button */}
        <button
          onClick={onAIAssistantToggle}
          className="flex items-center gap-2 px-3.5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all shadow-sm"
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
        {/* Notifications */}
        <button
          className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <span className="text-xl">🔔</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium text-gray-900">John Doe</div>
            <div className="text-xs text-gray-600">Creator</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
            JD
          </button>
        </div>
      </div>
    </header>
  );
}
