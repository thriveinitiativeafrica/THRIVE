export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: { label: string; href: string }[];
}

export const siteConfig = {
  name: "THRIVE Initiative",
  acronymName: "Transforming Hope, Rights, Inclusion, Vision and Empowerment",
  tagline: "Empowering People. Uplifting Communities. Building a Better Future.",
  secondaryTagline: "Empowering People. Transforming Communities.",
  description:
    "THRIVE Initiative is an African nonprofit organization dedicated to women empowerment, child education, skills acquisition, advocacy, social inclusion, and sustainable grassroots development across Africa, headquartered in Abuja, Nigeria.",
  url: "https://www.thriveinitiativeafrica.com",
  ogImage: "/og-default.png",
  contact: {
    email: "hello@thriveinitiativeafrica.com",
    supportEmail: "hello@thriveinitiativeafrica.com",
    phone: "+234 706 413 5356",
    altPhone: "+234 813 365 5222",
    address: "Abuja, Federal Capital Territory, Nigeria",
    operatingHours: "Monday to Friday: 8:00 AM to 5:00 PM WAT",
  },
  social: {
    facebook: "https://facebook.com/thriveinitiative",
    twitter: "https://twitter.com/thrive_org",
    instagram: "https://www.instagram.com/thriveinitiativeng/",
    linkedin: "https://linkedin.com/company/thrive-initiative",
    youtube: "https://youtube.com/@thriveinitiative",
  },
  donationTiers: [
    { amount: 5000, label: "₦5,000" },
    { amount: 10000, label: "₦10,000" },
    { amount: 25000, label: "₦25,000" },
    { amount: 50000, label: "₦50,000" },
    { amount: 100000, label: "₦100,000" },
  ],
  bankDetails: {
    bankName: "[TODO: Supply Bank Name]",
    accountName: "THRIVE INITIATIVE AFRICA",
    accountNumberNaira: "[TODO: Supply Account Number]",
    sortCode: "[TODO: Supply Sort Code if applicable]",
  },
  nav: [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about/story",
      children: [
        { label: "Our Story & Values", href: "/about/story" },
        { label: "About the Team", href: "/about/team" },
      ],
    },
    {
      label: "Programs",
      href: "/programs",
      children: [
        { label: "All Programs", href: "/programs" },
        { label: "Women Empowerment & Gender", href: "/programs/women-empowerment" },
        { label: "Child Education & Youth", href: "/programs/child-education" },
        { label: "Skills Acquisition", href: "/programs/skills-acquisition" },
        { label: "Advocacy & Social Inclusion", href: "/programs/advocacy-inclusion" },
        { label: "Community Development", href: "/programs/community-development" },
      ],
    },
    {
      label: "Get Involved",
      href: process.env.NEXT_PUBLIC_VOLUNTEER_FORM_URL || "/contact",
      isExternal: Boolean(process.env.NEXT_PUBLIC_VOLUNTEER_FORM_URL),
    },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
