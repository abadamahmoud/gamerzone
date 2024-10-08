// src/types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

// Global declarations
declare global {
  interface Window {
    Twitch: {
      Embed: new (elementId: string, options: { width: string; height: string; channel: string; parent: string[] }) => void;
    };
  }
}

export interface Article {
  title: string;
  sourceAvatar: string;
  thumbnail: string;
  pubDate: string;
  reads: number;
  pubDate: string;
  reads: number;
  sourceName: string;
  slug: string;
  link: string;
}

export interface RSSFeedConfig {
source: string;
sourceAvatar: string;
sourceName: string;
//thumbnail_url: string;
//tag_ids: string[];
//tags: string[];
//is_mature: boolean

}

export interface Stream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  tags: string[];
  is_mature: boolean;
  profile_image_url?: string; 
}
// User model
export interface User {
  id: string;
  name?: string | null;
  authProviderId?: string | null;
  username?: string | null;
  password?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  serverIds: string[];
  channelIds: string[];
  createdAt: Date;
  updatedAt: Date;
  // Relations
  ownedServers: Server[];
  createdChannels: Channel[];
  sentMessages: Message[];
}

// Account model
export interface Account {
  id: string;
  userId: string;
  provider: string;
  providerAccountId: string;
  // Relations
  user: User;
}

// Session model
export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  // Relations
  user: User;
}

// VerificationToken model
export interface VerificationToken {
  id: string;
  identifier: string;
  token: string;
  expires: Date;
}

// Authenticator model
export interface Authenticator {
  id: string;
  userId: string;
  secret: string;
  counter: number;
  // Relations
  user: User;
}

// Server model
export interface Server {
  id: string;
  name: string;
  ownerId: string;
  channelIds: string[];
  membersIds: string[] ;
  createdAt: Date;
  updatedAt: Date;
  image : string;
  // Relations
  owner: User;
  channels: Channel[];
}

// Channel model
export interface Channel {
  id: string;
  serverId?: string | null;
  creatorId: string;
  type: 'server' | 'direct';
  name?: string | null;
  membersIds: string[];
  messageIds: string[];
  createdAt: Date;
  updatedAt: Date;
  // Relations
  server?: Server | null;
  creator: User;
  messages: Message[];
}

// Message model
export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  channel: Channel;
  sender: User;
}
