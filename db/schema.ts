export type PostType = "blog" | "update";
export type PostStatus = "published" | "draft";

export interface PostInlineImage {
  url: string;
  caption: string;
  alt: string;
}

export interface DbPost {
  id: string;
  slug: string;
  title: string;
  italicTitle?: string;
  excerpt: string;
  content: string;
  type: PostType;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  coverImage: string;
  coverImageAlt: string;
  inlineImages?: PostInlineImage[];
  status: PostStatus;
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DbVolunteerSignup {
  id: number;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  availability?: string;
  areaOfInterest?: string;
  skills?: string;
  createdAt: string;
}

export interface DbContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  category?: string;
  createdAt: string;
}

export interface DbNewsletterSubscriber {
  id: number;
  email: string;
  createdAt: string;
}
