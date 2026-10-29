export interface Program {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  badge: string;
  sdgNumber: number;
  sdgLabel: string;
  heroImage: string;
  gallery: string[];
  mandate: string;
  keyObjectives: string[];
  currentInitiatives: {
    title: string;
    description: string;
    targetBeneficiaries: string;
    status: "Active" | "Ongoing" | "Upcoming";
  }[];
}

export const programsData: Program[] = [
  {
    slug: "women-empowerment",
    title: "Women Empowerment & Gender Programs",
    shortTitle: "Women Empowerment",
    subtitle: "Championing female leadership, economic independence, and community mentorship across Africa.",
    badge: "SDG 5: Gender Equality",
    sdgNumber: 5,
    sdgLabel: "Gender Equality",
    heroImage: "/images/hero-woman.webp",
    gallery: [
      "/images/hero-woman.webp",
      "/images/who-we-are.webp",
    ],
    mandate:
      "Leads programmes focused on women empowerment, leadership, mentorship, confidence-building, and capacity development. Identifies opportunities that strengthen participation in governance, business, and community decision-making while expanding access to vital social and economic support systems.",
    keyObjectives: [
      "Establish community-based female mentorship circles and leadership cohorts.",
      "Facilitate financial literacy, cooperative savings, and micro-business seed funding.",
      "Advocate against gender-based violence and provide psychosocial and legal support links.",
      "Empower women with digital skills and vocational autonomy to secure sustainable livelihoods.",
    ],
    currentInitiatives: [
      {
        title: "HerVoice Leadership Academy",
        description: "A masterclass on civic participation, public speaking, and community organizing for young women.",
        targetBeneficiaries: "Young female professionals and grassroots organizers",
        status: "Active",
      },
      {
        title: "SheThrives Micro-Grants",
        description: "Seed capital and business mentorship for mothers starting artisanal and market businesses.",
        targetBeneficiaries: "Low-income mothers across underserved communities",
        status: "Ongoing",
      },
    ],
  },
  {
    slug: "child-education",
    title: "Child Education & Youth Development",
    shortTitle: "Child Education",
    subtitle: "Unlocking human potential through equitable education, literacy hubs, and youth mentorship.",
    badge: "SDG 4: Quality Education",
    sdgNumber: 4,
    sdgLabel: "Quality Education",
    heroImage: "/images/hero-classroom.webp",
    gallery: [
      "/images/hero-classroom.webp",
      "/images/impact-education.webp",
    ],
    mandate:
      "Oversees educational outreach, school engagement, youth mentorship, leadership development, and personal-development programmes for children and young people. We bridge the classroom gap by providing learning supplies, remedial coaching, and life-skills workshops.",
    keyObjectives: [
      "Distribute back-to-school kits containing textbooks, notebooks, school bags, and uniforms.",
      "Run weekend literacy clubs and STEM foundation clinics in underserved public schools.",
      "Facilitate merit-based scholarships for out-of-school and vulnerable children.",
      "Nurture leadership, ethics, and career planning through one-on-one youth mentorship.",
    ],
    currentInitiatives: [
      {
        title: "Backpack of Hope Drive",
        description: "Distribution of essential scholastic materials to rural primary school pupils prior to academic session resumption.",
        targetBeneficiaries: "Primary pupils in rural communities",
        status: "Active",
      },
      {
        title: "FutureLeaders Mentorship Circle",
        description: "Pairing secondary school students with university students and young professionals for career guidance.",
        targetBeneficiaries: "Senior secondary school teenagers",
        status: "Ongoing",
      },
    ],
  },
  {
    slug: "skills-acquisition",
    title: "Skills Acquisition & Capacity Building",
    shortTitle: "Skills Acquisition",
    subtitle: "Equipping young people and job seekers with practical vocational and digital skills for economic self-reliance.",
    badge: "SDG 8 & 10: Decent Work & Reduced Inequalities",
    sdgNumber: 10,
    sdgLabel: "Reduced Inequalities",
    heroImage: "/images/story-farming.webp",
    gallery: [
      "/images/story-farming.webp",
      "/images/who-we-are.webp",
    ],
    mandate:
      "Develops and coordinates workshops, training sessions, skills-acquisition programmes, and learning opportunities that equip beneficiaries with practical, scalable, and transferable vocational and digital skills.",
    keyObjectives: [
      "Deliver hands-on vocational modules in fashion design, culinary arts, solar installation, and craft fabrication.",
      "Provide foundational digital skills in web basics, graphic design, and social media digital marketing.",
      "Supply post-graduation starter toolkits and apprentice transition assistance.",
      "Facilitate cooperative formation so graduates pool resources and access larger contracts.",
    ],
    currentInitiatives: [
      {
        title: "SolarTech Youth Apprentice Scheme",
        description: "Training rural youth in solar panel assembly, inverter troubleshooting, and green energy maintenance.",
        targetBeneficiaries: "Unemployed youths in semi-urban hubs",
        status: "Active",
      },
      {
        title: "Digital Pathways for Her",
        description: "Intensive digital skills bootcamp for young women from underserved communities.",
        targetBeneficiaries: "Young women aged 18 to 28",
        status: "Ongoing",
      },
    ],
  },
  {
    slug: "advocacy-inclusion",
    title: "Advocacy, Policy & Social Inclusion",
    shortTitle: "Advocacy & Social Inclusion",
    subtitle: "Amplifying civic voices, championing equal rights, and fostering participatory democracy at all levels.",
    badge: "SDG 10 & 16: Reduced Inequalities & Justice",
    sdgNumber: 10,
    sdgLabel: "Reduced Inequalities",
    heroImage: "/images/problem-community.webp",
    gallery: [
      "/images/problem-community.webp",
      "/images/hero-volunteers.webp",
    ],
    mandate:
      "Coordinates advocacy campaigns and initiatives relating to equality, inclusion, youth participation, social empowerment, and community development. Supports engagement with civil society stakeholders, policymakers, and local community leaders.",
    keyObjectives: [
      "Convene community townhalls bridging grassroots residents and local representatives.",
      "Conduct policy research briefs and civic scorecards on education and social welfare spending.",
      "Promote disability inclusion in public spaces, learning environments, and vocational centers.",
      "Lead public awareness campaigns on human rights, voter education, and civic duties.",
    ],
    currentInitiatives: [
      {
        title: "Community Voice Townhalls",
        description: "Consultative forums enabling grassroots dwellers to present priority welfare needs directly to councilors.",
        targetBeneficiaries: "Community residents, youth leaders, and market associations",
        status: "Active",
      },
      {
        title: "AccessForAll Inclusion Drive",
        description: "Advocating for ramp accessibility and inclusive learning materials for persons living with physical disabilities.",
        targetBeneficiaries: "Persons with disabilities and community institutions",
        status: "Ongoing",
      },
    ],
  },
  {
    slug: "community-development",
    title: "Community Development & Outreach",
    shortTitle: "Community Development",
    subtitle: "Delivering frontline emergency relief, clean water projects, health camps, and sustainable grassroots infrastructure.",
    badge: "SDG 3 & 11: Good Health & Sustainable Communities",
    sdgNumber: 11,
    sdgLabel: "Sustainable Communities",
    heroImage: "/images/impact-water.webp",
    gallery: [
      "/images/impact-water.webp",
      "/images/impact-food.webp",
    ],
    mandate:
      "Leads community-based programmes, outreach activities, awareness campaigns, and grassroots engagement. Works with local community stakeholders to identify urgent humanitarian needs and execute targeted interventions.",
    keyObjectives: [
      "Install and rehabilitate solar-powered clean water boreholes in rural villages.",
      "Execute nutritional food relief drives for food-insecure families and elderly widows.",
      "Organize mobile healthcare screening camps with doctor consultations.",
      "Promote environmental sanitation and neighborhood clean-up drives.",
    ],
    currentInitiatives: [
      {
        title: "Clean Water Infrastructure Initiative",
        description: "Drilling solar boreholes and setting up community water management committees.",
        targetBeneficiaries: "Rural settlements without treated piped water",
        status: "Active",
      },
      {
        title: "Community Nutrition Basket",
        description: "Food distribution boxes packed with staples for vulnerable households.",
        targetBeneficiaries: "Widowed and elderly-headed households",
        status: "Ongoing",
      },
    ],
  },
];
