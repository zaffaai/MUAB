'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OctopusLayout from '@/components/layout/OctopusLayout';

type EventPlatform = 'internal' | 'zoom' | 'meet' | 'teams';

export default function CreateLiveEventPage() {
  const router = useRouter();

  // Event details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [platform, setPlatform] = useState<EventPlatform>('internal');
  const [externalLink, setExternalLink] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  
  // Link to product
  const [linkToProduct, setLinkToProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  // Notifications
  const [sendReminder, setSendReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState('24'); // hours before

  const platforms = [
    {
      id: 'internal' as EventPlatform,
      name: 'MUAB Live (ZegoCloud)',
      icon: 'fa-video',
      description: 'Built-in live streaming with chat',
      color: 'purple',
      recommended: true
    },
    {
      id: 'zoom' as EventPlatform,
      name: 'Zoom',
      icon: 'fa-video',
      description: 'External Zoom meeting',
      color: 'blue'
    },
    {
      id: 'meet' as EventPlatform,
      name: 'Google Meet',
      icon: 'fa-google',
      description: 'External Google Meet',
      color: 'red'
    },
    {
      id: 'teams' as EventPlatform,
      name: 'Microsoft Teams',
      icon: 'fa-microsoft',
      description: 'External Teams meeting',
      color: 'cyan'
    }
  ];

  const mockProducts = [
    { id: '1', title: 'Complete Web Development Course' },
    { id: '2', title: 'Digital Marketing Mastery' },
    { id: '3', title: 'UI/UX Design Fundamentals' },
    { id: '4', title: 'Python for Data Science' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !date || !time) {
      alert('Please fill in all required fields');
      return;
    }

    if (platform !== 'internal' && !externalLink) {
      alert('Please provide a meeting link for external platform');
      return;
    }

    console.log('Creating event...', {
      title,
      date,
      time,
      duration,
      platform,
      linkToProduct,
      selectedProduct
    });

    alert('Live event created successfully!');
    router.push('/live-events');
  };

  return (
    <OctopusLayout accountType="professional">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50:bg-gray-700 transition-all"
          >
            <i className="fas fa-arrow-left text-gray-600"></i>
          </button>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">Create Live Event</h1>
            <p className="text-gray-600">Schedule a new live session with your audience</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Details */}
          <div className="bg-white rounded-md p-8 border border-gray-200 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-1">Event Details</h2>
              <p className="text-sm text-gray-600">Basic information about your live event</p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Q&A Session: Web Development"
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will you cover in this live event?"
                rows={4}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Duration (minutes)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                  <option value="180">3 hours</option>
                </select>
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Event Thumbnail
              </label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 rounded-md bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  {thumbnail ? (
                    <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    <i className="fas fa-image text-3xl text-gray-400"></i>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label
                    htmlFor="thumbnail"
                    className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium cursor-pointer hover:bg-purple-200:bg-purple-900/50 transition-all inline-block"
                  >
                    Upload Thumbnail
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 1200x800px</p>
                </div>
              </div>
            </div>

            {/* Max Attendees */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Maximum Attendees <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                value={maxAttendees}
                onChange={(e) => setMaxAttendees(e.target.value)}
                placeholder="Leave empty for unlimited"
                min="1"
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Platform Selection */}
          <div className="bg-white rounded-md p-8 border border-gray-200 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-1">Platform</h2>
              <p className="text-sm text-gray-600">Choose where to host your live event</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((plat) => (
                <button
                  key={plat.id}
                  type="button"
                  onClick={() => setPlatform(plat.id)}
                  className={`p-4 rounded-md border-2 transition-all text-left hover:shadow-sm relative ${
                    platform === plat.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {plat.recommended && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                      Recommended
                    </span>
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 shrink-0 rounded-lg bg-${plat.color}-100${plat.color}-900/30 flex items-center justify-center`}>
                      <i className={`fas ${plat.icon} text-xl text-${plat.color}-600${plat.color}-400`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{plat.name}</h3>
                      <p className="text-sm text-gray-600">{plat.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* External Link */}
            {platform !== 'internal' && (
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Meeting Link *
                </label>
                <input
                  type="url"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  placeholder={`Enter your ${platform} meeting link`}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  This link will be shared with registered attendees
                </p>
              </div>
            )}

            {platform === 'internal' && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex gap-3">
                  <i className="fas fa-info-circle text-blue-600 mt-1"></i>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900 mb-1">MUAB Live Features</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• HD video streaming with ZegoCloud</li>
                      <li>• Interactive chat and Q&A</li>
                      <li>• Screen sharing capabilities</li>
                      <li>• Automatic recording (not available for replay per business rules)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Link to Product */}
          <div className="bg-white rounded-md p-8 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">Link to Product</h2>
                <p className="text-sm text-gray-600">Associate this event with a digital product</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={linkToProduct}
                  onChange={(e) => setLinkToProduct(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {linkToProduct && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Product
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="">Choose a product...</option>
                  {mockProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.title}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Only students enrolled in this product will be able to join
                </p>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-md p-8 border border-gray-200 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-1">Notifications</h2>
              <p className="text-sm text-gray-600">Remind attendees about the event</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <i className="fas fa-bell text-yellow-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Send Event Reminder</p>
                  <p className="text-sm text-gray-600">Email attendees before the event starts</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendReminder}
                  onChange={(e) => setSendReminder(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {sendReminder && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Reminder Time
                </label>
                <select
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="1">1 hour before</option>
                  <option value="3">3 hours before</option>
                  <option value="6">6 hours before</option>
                  <option value="24">24 hours before</option>
                  <option value="48">48 hours before</option>
                </select>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-3.5 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300:bg-gray-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all flex items-center gap-2"
            >
              <i className="fas fa-calendar-plus"></i>
              <span>Schedule Event</span>
            </button>
          </div>
        </form>
      </div>
    </OctopusLayout>
  );
}
