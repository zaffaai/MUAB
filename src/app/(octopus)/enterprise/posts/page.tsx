'use client';

import { useState } from 'react';
import OctopusLayout from '@/components/layout/OctopusLayout';
import { useEnterpriseStore } from '@/store/enterpriseStore';
import { Post, PostStatus } from '@/types/enterprise';

export default function PostManagementPage() {
  const { posts, users, updatePostStatus, deletePost, toggleUserPosting } =
    useEnterpriseStore();
  const [filterStatus, setFilterStatus] = useState<'all' | PostStatus>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const categories = ['All Categories', 'Product Updates', 'Education', 'Security', 'Community', 'Announcements'];

  const filteredPosts = posts.filter((post) => {
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesCategory =
      filterCategory === 'all' || post.category === filterCategory;
    return matchesStatus && matchesCategory && post.status !== 'deleted';
  });

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleApprovePost = (postId: string) => {
    updatePostStatus(postId, 'approved');
  };

  const handleFlagPost = (postId: string) => {
    updatePostStatus(postId, 'flagged');
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
      setShowPostModal(false);
    }
  };

  const handleRestrictUser = (userId: string, userName: string) => {
    if (
      confirm(
        `Are you sure you want to restrict ${userName} from posting on the platform?`
      )
    ) {
      toggleUserPosting(userId);
      setShowPostModal(false);
    }
  };

  const getStatusBadge = (status: PostStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'flagged':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <OctopusLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Post Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and moderate all posts on your platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <i className="fas fa-comment text-blue-600 dark:text-blue-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {posts.filter((p) => p.status !== 'deleted').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <i className="fas fa-clock text-yellow-600 dark:text-yellow-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {posts.filter((p) => p.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <i className="fas fa-check-circle text-green-600 dark:text-green-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {posts.filter((p) => p.status === 'approved').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <i className="fas fa-flag text-red-600 dark:text-red-400"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {posts.filter((p) => p.status === 'flagged').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Flagged</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | PostStatus)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="flagged">Flagged</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat === 'All Categories' ? 'all' : cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              All Posts ({filteredPosts.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex gap-4">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {post.authorName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {post.authorHandle} • {formatDate(post.createdAt)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusBadge(post.status)}`}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white mb-3">{post.content}</p>
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        <i className="fas fa-heart mr-1"></i>
                        {post.likes}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        <i className="fas fa-comment mr-1"></i>
                        {post.comments}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                        {post.category}
                      </span>
                      <div className="ml-auto flex gap-2">
                        {post.status === 'pending' && (
                          <button
                            onClick={() => handleApprovePost(post.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
                          >
                            <i className="fas fa-check mr-1"></i>
                            Approve
                          </button>
                        )}
                        {post.status === 'approved' && (
                          <button
                            onClick={() => handleFlagPost(post.id)}
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-all"
                          >
                            <i className="fas fa-flag mr-1"></i>
                            Flag
                          </button>
                        )}
                        <button
                          onClick={() => handleViewPost(post)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-all"
                        >
                          <i className="fas fa-eye mr-1"></i>
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredPosts.length === 0 && (
              <div className="p-12 text-center">
                <i className="fas fa-inbox text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p className="text-gray-600 dark:text-gray-400">No posts found</p>
              </div>
            )}
          </div>
        </div>

        {/* Post Details Modal */}
        {showPostModal && selectedPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Post Details
                  </h2>
                  <button
                    onClick={() => setShowPostModal(false)}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    <i className="fas fa-times text-gray-600 dark:text-gray-300"></i>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Author Info */}
                <div className="flex items-start gap-4">
                  <img
                    src={selectedPost.authorAvatar}
                    alt={selectedPost.authorName}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      {selectedPost.authorName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedPost.authorHandle}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {formatDate(selectedPost.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusBadge(selectedPost.status)}`}
                  >
                    {selectedPost.status}
                  </span>
                </div>

                {/* Content */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <p className="text-gray-900 dark:text-white text-lg leading-relaxed">
                    {selectedPost.content}
                  </p>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {selectedPost.likes}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {selectedPost.comments}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Comments</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
                    <p className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {selectedPost.category}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4">
                  <div className="flex gap-3">
                    {selectedPost.status === 'pending' && (
                      <button
                        onClick={() => {
                          handleApprovePost(selectedPost.id);
                          setShowPostModal(false);
                        }}
                        className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
                      >
                        <i className="fas fa-check mr-2"></i>
                        Approve Post
                      </button>
                    )}
                    {selectedPost.status !== 'flagged' && (
                      <button
                        onClick={() => {
                          handleFlagPost(selectedPost.id);
                          setShowPostModal(false);
                        }}
                        className="flex-1 px-6 py-3 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 transition-all"
                      >
                        <i className="fas fa-flag mr-2"></i>
                        Flag Post
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeletePost(selectedPost.id)}
                    className="w-full px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all"
                  >
                    <i className="fas fa-trash mr-2"></i>
                    Delete Post
                  </button>
                  <button
                    onClick={() =>
                      handleRestrictUser(selectedPost.authorId, selectedPost.authorName)
                    }
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all"
                  >
                    <i className="fas fa-ban mr-2"></i>
                    Restrict User from Posting
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
