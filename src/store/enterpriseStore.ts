import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EnterpriseUser, Post, Role, ROLE_PERMISSIONS } from '@/types/enterprise';

interface EnterpriseStore {
  users: EnterpriseUser[];
  posts: Post[];
  addUser: (user: EnterpriseUser) => void;
  updateUserRole: (userId: string, role: Role) => void;
  removeUser: (userId: string) => void;
  toggleUserPosting: (userId: string) => void;
  toggleUserCommenting: (userId: string) => void;
  updatePostStatus: (postId: string, status: Post['status']) => void;
  deletePost: (postId: string) => void;
}

export const useEnterpriseStore = create<EnterpriseStore>()(
  persist(
    (set) => ({
      users: [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@company.com',
          handle: '@sarahj',
          avatar: 'https://i.pravatar.cc/150?img=1',
          role: 'owner',
          status: 'active',
          invitedDate: '2024-01-15',
          lastActive: '2025-11-14T10:30:00',
          permissions: ROLE_PERMISSIONS.owner,
          isOwner: true,
          canPostOnPlatform: true,
          canCommentOnPlatform: true,
          stats: {
            postsCreated: 45,
            commentsCreated: 128,
            productsCreated: 12,
            engagement: 92,
          },
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael@company.com',
          handle: '@mchen',
          avatar: 'https://i.pravatar.cc/150?img=12',
          role: 'admin',
          status: 'active',
          invitedDate: '2024-02-20',
          lastActive: '2025-11-14T09:15:00',
          permissions: ROLE_PERMISSIONS.admin,
          isOwner: false,
          canPostOnPlatform: true,
          canCommentOnPlatform: true,
          stats: {
            postsCreated: 32,
            commentsCreated: 89,
            productsCreated: 8,
            engagement: 85,
          },
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          email: 'emily@company.com',
          handle: '@erodriguez',
          avatar: 'https://i.pravatar.cc/150?img=5',
          role: 'moderator',
          status: 'active',
          invitedDate: '2024-03-10',
          lastActive: '2025-11-13T16:45:00',
          permissions: ROLE_PERMISSIONS.moderator,
          isOwner: false,
          canPostOnPlatform: true,
          canCommentOnPlatform: true,
          stats: {
            postsCreated: 78,
            commentsCreated: 245,
            productsCreated: 0,
            engagement: 88,
          },
        },
        {
          id: '4',
          name: 'David Thompson',
          email: 'david@company.com',
          handle: '@dthompson',
          avatar: 'https://i.pravatar.cc/150?img=8',
          role: 'instructor',
          status: 'active',
          invitedDate: '2024-04-05',
          lastActive: '2025-11-14T08:00:00',
          permissions: ROLE_PERMISSIONS.instructor,
          isOwner: false,
          canPostOnPlatform: true,
          canCommentOnPlatform: true,
          stats: {
            postsCreated: 15,
            commentsCreated: 42,
            productsCreated: 6,
            engagement: 76,
          },
        },
        {
          id: '5',
          name: 'Jessica Martinez',
          email: 'jessica@company.com',
          handle: '@jmartinez',
          avatar: 'https://i.pravatar.cc/150?img=9',
          role: 'instructor',
          status: 'invited',
          invitedDate: '2025-11-10',
          lastActive: '',
          permissions: ROLE_PERMISSIONS.instructor,
          isOwner: false,
          canPostOnPlatform: true,
          canCommentOnPlatform: true,
          stats: {
            postsCreated: 0,
            commentsCreated: 0,
            productsCreated: 0,
            engagement: 0,
          },
        },
      ],
      posts: [
        {
          id: '1',
          authorId: '3',
          authorName: 'Emily Rodriguez',
          authorAvatar: 'https://i.pravatar.cc/150?img=5',
          authorHandle: '@erodriguez',
          content: 'Just launched our new Enterprise Analytics dashboard! Check it out and let me know what you think. 📊',
          createdAt: '2025-11-14T09:30:00',
          status: 'approved',
          likes: 24,
          comments: 8,
          category: 'Product Updates',
        },
        {
          id: '2',
          authorId: '4',
          authorName: 'David Thompson',
          authorAvatar: 'https://i.pravatar.cc/150?img=8',
          authorHandle: '@dthompson',
          content: 'New course on Advanced TypeScript patterns is now live! Excited to share this with the community.',
          createdAt: '2025-11-14T08:15:00',
          status: 'approved',
          likes: 42,
          comments: 15,
          category: 'Education',
        },
        {
          id: '3',
          authorId: '2',
          authorName: 'Michael Chen',
          authorAvatar: 'https://i.pravatar.cc/150?img=12',
          authorHandle: '@mchen',
          content: 'Important security update: Please enable 2FA on your accounts. We take your security seriously.',
          createdAt: '2025-11-13T16:00:00',
          status: 'approved',
          likes: 67,
          comments: 23,
          category: 'Security',
        },
        {
          id: '4',
          authorId: '3',
          authorName: 'Emily Rodriguez',
          authorAvatar: 'https://i.pravatar.cc/150?img=5',
          authorHandle: '@erodriguez',
          content: 'Reminder: Community guidelines must be followed. Be respectful and constructive in your feedback.',
          createdAt: '2025-11-13T14:30:00',
          status: 'pending',
          likes: 12,
          comments: 3,
          category: 'Community',
        },
        {
          id: '5',
          authorId: '1',
          authorName: 'Sarah Johnson',
          authorAvatar: 'https://i.pravatar.cc/150?img=1',
          authorHandle: '@sarahj',
          content: 'Thank you to our amazing community for helping us reach 10,000 users! 🎉',
          createdAt: '2025-11-12T11:00:00',
          status: 'approved',
          likes: 156,
          comments: 42,
          category: 'Announcements',
        },
      ],

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      updateUserRole: (userId, role) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? { ...user, role, permissions: ROLE_PERMISSIONS[role] }
              : user
          ),
        })),

      removeUser: (userId) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== userId),
        })),

      toggleUserPosting: (userId) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? { ...user, canPostOnPlatform: !user.canPostOnPlatform }
              : user
          ),
        })),

      toggleUserCommenting: (userId) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? { ...user, canCommentOnPlatform: !user.canCommentOnPlatform }
              : user
          ),
        })),

      updatePostStatus: (postId, status) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId ? { ...post, status } : post
          ),
        })),

      deletePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        })),
    }),
    {
      name: 'enterprise-storage',
    }
  )
);
