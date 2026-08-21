export interface DbPost {
  id: number;
  slug: string;
  title: string;
  italicTitle?: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  category?: string;
  published: boolean;
  publishedAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  readTime?: string;
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
  createdAt: Date | string;
}

export interface DbContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  category?: string;
  createdAt: Date | string;
}

export interface DbNewsletterSubscriber {
  id: number;
  email: string;
  createdAt: Date | string;
}
