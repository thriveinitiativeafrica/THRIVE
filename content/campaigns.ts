export interface Campaign {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image: string;
  metric1: { value: string; label: string; icon: string };
  metric2: { value: string; label: string; icon: string };
  status: "Registering" | "In Progress" | "Completed";
  badgeColor: string;
}

export const campaigns: Campaign[] = [
  {
    id: "camp-1",
    slug: "clean-water-well-installation",
    title: "Clean Water Well Installation",
    category: "Infrastructure & Health",
    date: "August 25, 2026",
    location: "Kigali & Rural Settlements",
    description:
      "Help us drill and install a solar-powered clean water well to provide safe, disease-free drinking water for over 2,500 people in rural villages.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    metric1: { value: "800+ Families", label: "Directly Benefited", icon: "Users" },
    metric2: { value: "20 Volunteers", label: "Needed for Field Site", icon: "HandHeart" },
    status: "Registering",
    badgeColor: "bg-emerald-600",
  },
  {
    id: "camp-2",
    slug: "hunger-relief-food-drive",
    title: "Hunger Relief Food Drive",
    category: "Nutrition & Emergency",
    date: "August 29, 2026",
    location: "Urban Slum Hubs, Lagos",
    description:
      "Join our volunteers in packaging and distributing wholesome, nutritious food packs for vulnerable families and elderly individuals facing acute food insecurity.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    metric1: { value: "1,200+ Meals", label: "Goal to Distribute", icon: "Utensils" },
    metric2: { value: "15 Volunteers", label: "Needed for Logistics", icon: "HandHeart" },
    status: "Registering",
    badgeColor: "bg-amber-600",
  },
  {
    id: "camp-3",
    slug: "back-to-school-supplies-distribution",
    title: "Back-to-School Supplies Distribution",
    category: "Education & Literacy",
    date: "September 05, 2026",
    location: "Ogun & Oyo State Schools",
    description:
      "Support our mission to provide backpacks, notebooks, stationery, and uniforms to over 800 underserved primary school pupils starting the new term.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    metric1: { value: "800+ Children", label: "Scholastic Kits", icon: "GraduationCap" },
    metric2: { value: "25 Volunteers", label: "Needed for Packing", icon: "HandHeart" },
    status: "Registering",
    badgeColor: "bg-indigo-600",
  },
];
