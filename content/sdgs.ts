export interface SDGItem {
  number: number;
  title: string;
  shortTitle: string;
  color: string;
  textColor: string;
  iconName: string;
  description: string;
  initiativeAction: string;
}

export const sdgList: SDGItem[] = [
  {
    number: 5,
    title: "Gender Equality",
    shortTitle: "Gender Equality",
    color: "#FF3A21",
    textColor: "#FFFFFF",
    iconName: "Female",
    description: "Achieve gender equality and empower all women and girls.",
    initiativeAction: "Fostering female leadership, vocational mentorship, and eliminating barriers to financial independence.",
  },
  {
    number: 3,
    title: "Good Health and Well-being",
    shortTitle: "Good Health",
    color: "#4C9F38",
    textColor: "#FFFFFF",
    iconName: "HeartPulse",
    description: "Ensure healthy lives and promote well-being for all at all ages.",
    initiativeAction: "Community health screenings, maternal wellness workshops, and clean water sanitation campaigns.",
  },
  {
    number: 4,
    title: "Quality Education",
    shortTitle: "Quality Education",
    color: "#C5192D",
    textColor: "#FFFFFF",
    iconName: "BookOpen",
    description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities.",
    initiativeAction: "Providing school kits, scholarships, after-school literacy tutoring, and teacher support.",
  },
  {
    number: 10,
    title: "Reduced Inequalities",
    shortTitle: "Reduced Inequalities",
    color: "#DD1367",
    textColor: "#FFFFFF",
    iconName: "Scale",
    description: "Reduce inequality within and among countries.",
    initiativeAction: "Advocating for marginalized groups, persons with disabilities, and underserved grassroots communities.",
  },
  {
    number: 11,
    title: "Sustainable Cities and Communities",
    shortTitle: "Sustainable Communities",
    color: "#FD9D24",
    textColor: "#FFFFFF",
    iconName: "Building",
    description: "Make cities and human settlements inclusive, safe, resilient, and sustainable.",
    initiativeAction: "Grassroots community development, emergency relief, and local environmental resilience programs.",
  },
  {
    number: 17,
    title: "Partnerships for the Goals",
    shortTitle: "Partnerships",
    color: "#19486A",
    textColor: "#FFFFFF",
    iconName: "Handshake",
    description: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.",
    initiativeAction: "Collaborating with civic organizations, public institutions, and international stakeholders.",
  },
];
