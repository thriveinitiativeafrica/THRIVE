export interface Testimonial {
  id: string;
  rating: number;
  quote: string;
  author: string;
  location: string;
  role?: string;
  avatar: string;
  category: "Community" | "Donor" | "Volunteer" | "Beneficiary";
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    rating: 5,
    quote:
      "The food relief and nutrition program came at our family's lowest moment. My children now eat wholesome meals every single day, and their growth and school concentration have improved remarkably.",
    author: "Samuel Ndlovu",
    location: "Harare / Lagos Outreach",
    role: "Parent & Community Member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    category: "Beneficiary",
  },
  {
    id: "test-2",
    rating: 5,
    quote:
      "Thanks to the clean water borehole project, our village no longer suffers from waterborne illnesses. Our women and girls no longer walk miles at dawn just to fetch water for the day.",
    author: "Amina Okoro",
    location: "Ikorodu, Lagos, Nigeria",
    role: "Community Women Leader",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    category: "Beneficiary",
  },
  {
    id: "test-3",
    rating: 5,
    quote:
      "With the school scholarship and scholastic kit support program, I became the first in my family to complete senior high school. I am currently studying nursing to give back to my people.",
    author: "Grace Mwangi",
    location: "Nairobi / Regional Exchange",
    role: "Scholarship Recipient & Nurse Trainee",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    category: "Beneficiary",
  },
  {
    id: "test-4",
    rating: 5,
    quote:
      "Volunteering with THRIVE gave me frontline purpose. Their on-ground team is remarkably transparent, respectful of local community dignity, and deeply organized in every project execution.",
    author: "Dr. Kemi Adebayo",
    location: "Lagos, Nigeria",
    role: "Medical Volunteer Lead",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80",
    category: "Volunteer",
  },
];
