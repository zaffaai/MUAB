'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        <Header onAIAssistantToggle={() => setShowAIAssistant(!showAIAssistant)} />
        
        <main className="flex-1 overflow-y-auto p-6" style={{ background: 'var(--background)' }}>
          {children}
        </main>
      </div>

      {/* AI Assistant Sidebar (Slide-in from right) */}
      {showAIAssistant && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowAIAssistant(false)}
          />
          
          {/* AI Panel */}
          <aside className="fixed right-0 top-0 h-screen w-96 z-50 shadow-2xl animate-slide-in-right"
            style={{ background: 'var(--background-secondary)' }}>
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <h3 className="font-bold" style={{ color: 'var(--foreground)' }}>AI Assistant</h3>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Here to help you</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIAssistant(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:opacity-70 transition-opacity"
                  style={{ background: 'var(--background-tertiary)' }}
                >
                  ✕
                </button>
              </div>

              {/* AI Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  AI Assistant panel coming soon! Ask me anything about your products, analytics, or how to use the platform.
                </p>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
