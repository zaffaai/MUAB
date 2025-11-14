'use client';

import { useState } from 'react';
import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';

type EventStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';
type EventPlatform = 'internal' | 'zoom' | 'meet' | 'teams';

interface LiveEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  platform: EventPlatform;
  meetingLink?: string;
  status: EventStatus;
  attendeesCount: number;
  maxAttendees?: number;
  linkedProduct?: {
    id: string;
    title: string;
  };
  thumbnail: string;
}

export default function LiveEventsPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [showCreateModal, setShowCreateModal] = useState(false);

  const events: LiveEvent[] = [
    {
      id: '1',
      title: 'Web Development Q&A Session',
      description: 'Live Q&A for all course students',
      date: '2025-11-15',
      time: '14:00',
      duration: 60,
      platform: 'internal',
      status: 'upcoming',
      attendeesCount: 45,
      maxAttendees: 100,
      linkedProduct: {
        id: 'p1',
        title: 'Complete Web Development Course'
      },
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'
    },
    {
      id: '2',
      title: 'Design Masterclass',
      description: 'Advanced UI/UX techniques',
      date: '2025-11-18',
      time: '16:00',
      duration: 90,
      platform: 'zoom',
      meetingLink: 'https://zoom.us/j/123456789',
      status: 'upcoming',
      attendeesCount: 78,
      maxAttendees: 150,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'
    },
    {
      id: '3',
      title: 'Marketing Strategy Workshop',
      description: 'Build your marketing funnel',
      date: '2025-11-20',
      time: '10:00',
      duration: 120,
      platform: 'internal',
      status: 'upcoming',
      attendeesCount: 32,
      linkedProduct: {
        id: 'p2',
        title: 'Digital Marketing Mastery'
      },
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400'
    }
  ];

  const getPlatformIcon = (platform: EventPlatform) => {
    switch (platform) {
      case 'internal':
        return 'fa-video';
      case 'zoom':
        return 'fa-video';
      case 'meet':
        return 'fa-google';
      case 'teams':
        return 'fa-microsoft';
      default:
        return 'fa-video';
    }
  };

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'live':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'completed':
        return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const stats = [
    { label: 'Total Events', value: '24', icon: 'fa-calendar', color: 'purple' },
    { label: 'This Month', value: '8', icon: 'fa-calendar-week', color: 'cyan' },
    { label: 'Total Attendees', value: '1,234', icon: 'fa-users', color: 'blue' },
    { label: 'Avg Attendance', value: '87%', icon: 'fa-chart-line', color: 'green' }
  ];

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  return (
    <OctopusLayout accountType="professional">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Live Events</h1>
            <p className="text-gray-600 dark:text-gray-400">Schedule and manage your live sessions</p>
          </div>
          <Link
            href="/live-events/create"
            className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            <span>Create Event</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-md bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center`}>
                  <i className={`fas ${stat.icon} text-xl text-${stat.color}-600 dark:text-${stat.color}-400`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-md p-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === 'calendar'
                  ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <i className="fas fa-calendar mr-2"></i>
              Calendar
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === 'list'
                  ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <i className="fas fa-list mr-2"></i>
              List
            </button>
          </div>

          {view === 'calendar' && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
                className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <i className="fas fa-chevron-left text-gray-600 dark:text-gray-400"></i>
              </button>
              <div className="text-center min-w-[200px]">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
                className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <i className="fas fa-chevron-right text-gray-600 dark:text-gray-400"></i>
              </button>
              <button
                onClick={() => setSelectedMonth(new Date())}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Today
              </button>
            </div>
          )}
        </div>

        {/* Calendar View */}
        {view === 'calendar' && (
          <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-4 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{day}</p>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4">
              {getDaysInMonth(selectedMonth).map((day, index) => {
                const dayEvents = getEventsForDay(day);
                const isToday = day === new Date().getDate() && 
                               selectedMonth.getMonth() === new Date().getMonth() &&
                               selectedMonth.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 rounded-lg border transition-all ${
                      day
                        ? 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer'
                        : 'border-transparent'
                    } ${isToday ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700' : ''}`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-semibold mb-2 ${
                          isToday 
                            ? 'text-purple-700 dark:text-purple-300' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className="text-xs p-1 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 truncate"
                              title={event.title}
                            >
                              <i className={`fas ${getPlatformIcon(event.platform)} mr-1`}></i>
                              {event.time} {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-sm transition-all"
              >
                <div className="flex">
                  {/* Thumbnail */}
                  <div className="w-48 shrink-0">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            {event.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{event.description}</p>
                        
                        {/* Event Details */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <i className="fas fa-calendar"></i>
                            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <i className="fas fa-clock"></i>
                            <span>{event.time} ({event.duration} min)</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <i className={`fas ${getPlatformIcon(event.platform)}`}></i>
                            <span className="capitalize">{event.platform}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <i className="fas fa-users"></i>
                            <span>
                              {event.attendeesCount}
                              {event.maxAttendees && ` / ${event.maxAttendees}`}
                            </span>
                          </div>
                        </div>

                        {/* Linked Product */}
                        {event.linkedProduct && (
                          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                            <i className="fas fa-link"></i>
                            <span>Linked to: {event.linkedProduct.title}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        {event.status === 'upcoming' && (
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center gap-2">
                            <i className="fas fa-play"></i>
                            <span>Start</span>
                          </button>
                        )}
                        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {events.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-md p-12 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-calendar-plus text-3xl text-purple-600 dark:text-purple-400"></i>
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">No events scheduled</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first live event to connect with your audience
            </p>
            <Link
              href="/live-events/create"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
            >
              <i className="fas fa-plus"></i>
              <span>Create Event</span>
            </Link>
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
