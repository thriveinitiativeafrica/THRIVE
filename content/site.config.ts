export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const siteConfig = {
  name: "THRIVE Initiative",
  acronymName: "Transforming Hope, Rights, Inclusion, Vision & Empowerment",
  tagline: "Empowering People. Uplifting Communities. Building a Better Future.",
  secondaryTagline: "Empowering People. Transforming Communities.",
  description:
    "THRIVE Initiative is a Nigerian nonprofit organization dedicated to women empowerment, child education, skills acquisition, advocacy, social inclusion, and sustainable community development.",
  url: "https://thriveinitiative.org",
  ogImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
  contact: {
    email: "contact@thriveinitiative.org",
    supportEmail: "support@thriveinitiative.org",
    phone: "+234 812 345 6789",
    altPhone: "+234 803 987 6543",
    address: "14 Impact Crescent, Victoria Island, Lagos, Nigeria",
    operatingHours: "Monday – Friday: 8:00 AM – 5:00 PM WAT",
  },
  social: {
    facebook: "https://facebook.com/thriveinitiative",
    twitter: "https://twitter.com/thrive_org",
    instagram: "https://instagram.com/thrive_initiative",
    linkedin: "https://linkedin.com/company/thrive-initiative",
    youtube: "https://youtube.com/@thriveinitiative",
  },
  stats: [
    {
      value: "2,500+",
      label: "Families Helped",
      icon: "Users",
    },
    {
      value: "10,000+",
      label: "Meals Served",
      icon: "Utensils",
    },
    {
      value: "800+",
      label: "Children Educated",
      icon: "GraduationCap",
    },
  ],
  donationTiers: [
    { amount: 5000, label: "₦5,000", impact: "Provides learning supplies and scholastic materials for 2 children" },
    { amount: 15000, label: "₦15,000", impact: "Funds 1 month of vocational workshop tools for a female trainee", popular: true },
    { amount: 35000, label: "₦35,000", impact: "Supplies nutritious emergency food packs for vulnerable families" },
    { amount: 50000, label: "₦50,000", impact: "Supports community health outreach and clean water distribution" },
    { amount: 100000, label: "₦100,000", impact: "Full vocational skills scholarship and business seed grant" },
  ],
  bankDetails: {
    bankName: "Guaranty Trust Bank (GTBank)",
    accountName: "THRIVE INITIATIVE FOR COMMUNITY ADVANCEMENT",
    accountNumberNaira: "0847291038",
    sortCode: "058152062",
  },
  nav: [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about",
      children: [
        { label: "Our Story & Values", href: "/about", description: "Mission, vision, core values, and SDG commitments" },
        { label: "Impact & MEL", href: "/impact", description: "Monitoring, evaluation, outputs, and impact reports" },
      ],
    },
    {
      label: "Programs",
      href: "/programs",
      children: [
        { label: "All Programs", href: "/programs", description: "Explore our integrated community initiatives" },
        { label: "Women Empowerment & Gender", href: "/programs/women-empowerment", description: "Mentorship, leadership, and confidence building" },
        { label: "Child Education & Youth", href: "/programs/child-education", description: "School engagement, literacy, and youth development" },
        { label: "Skills Acquisition", href: "/programs/skills-acquisition", description: "Vocational workshops, tech, and craft training" },
        { label: "Advocacy & Social Inclusion", href: "/programs/advocacy-inclusion", description: "Rights, equality, and community advocacy" },
        { label: "Community Development", href: "/programs/community-development", description: "Grassroots outreach, clean water, and relief" },
      ],
    },
    {
      label: "Get Involved",
      href: "/get-involved",
      children: [
        { label: "Get Involved Hub", href: "/get-involved", description: "Find out how you can contribute to our mission" },
        { label: "Volunteer With Us", href: "/get-involved/volunteer", description: "Join our active community volunteer network" },
        { label: "Partner With Us", href: "/get-involved/partner", description: "Institutional and corporate partnerships" },
      ],
    },
    { label: "Stories & Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
};
