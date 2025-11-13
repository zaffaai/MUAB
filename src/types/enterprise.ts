export type Role = 'owner' | 'admin' | 'moderator' | 'instructor';
export type UserStatus = 'active' | 'invited' | 'inactive';
export type PostStatus = 'pending' | 'approved' | 'flagged' | 'deleted';

export interface Permission {
  billing: boolean;
  users: boolean;
  products: boolean;
  community: boolean;
  branding: boolean;
  integrations: boolean;
  security: boolean;
}

export interface EnterpriseUser {
  id: string;
  name: string;
  email: string;
  handle: string;
  avatar: string;
  role: Role;
  status: UserStatus;
  invitedDate: string;
  lastActive: string;
  permissions: Permission;
  isOwner: boolean;
  canPostOnPlatform: boolean;
  canCommentOnPlatform: boolean;
  stats: {
    postsCreated: number;
    commentsCreated: number;
    productsCreated: number;
    engagement: number;
  };
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorHandle: string;
  content: string;
  createdAt: string;
  status: PostStatus;
  likes: number;
  comments: number;
  category: string;
}

export interface InviteUserData {
  email: string;
  role: Role;
  message?: string;
}

export const ROLE_PERMISSIONS: Record<Role, Permission> = {
  owner: {
    billing: true,
    users: true,
    products: true,
    community: true,
    branding: true,
    integrations: true,
    security: true,
  },
  admin: {
    billing: true,
    users: true,
    products: true,
    community: true,
    branding: true,
    integrations: true,
    security: true,
  },
  moderator: {
    billing: false,
    users: false,
    products: false,
    community: true,
    branding: false,
    integrations: false,
    security: false,
  },
  instructor: {
    billing: false,
    users: false,
    products: true, // Only own content
    community: false,
    branding: false,
    integrations: false,
    security: false,
  },
};

export const ROLE_BADGES: Record<Role, { bg: string; text: string; icon: string }> = {
  owner: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    icon: 'fa-crown',
  },
  admin: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    icon: 'fa-shield-alt',
  },
  moderator: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    icon: 'fa-user-shield',
  },
  instructor: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
    icon: 'fa-chalkboard-teacher',
  },
};
