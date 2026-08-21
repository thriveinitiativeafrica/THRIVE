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
  impactStats: { value: string; label: string }[];
  currentInitiatives: {
    title: string;
    description: string;
    targetBeneficiaries: string;
    status: "Active" | "Ongoing" | "Upcoming";
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
}

export const programsData: Program[] = [
  {
    slug: "women-empowerment",
    title: "Women Empowerment & Gender Programs",
    shortTitle: "Women Empowerment",
    subtitle: "Championing female leadership, economic independence, and breaking systemic gender barriers.",
    badge: "SDG 5: Gender Equality",
    sdgNumber: 5,
    sdgLabel: "Gender Equality",
    heroImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80",
    ],
    mandate:
      "Leads programmes focused on women’s empowerment, leadership, mentorship, advocacy, confidence-building, and capacity development. Identifies opportunities that strengthen women’s participation in governance, business, and community decision-making while expanding access to vital social and economic support systems.",
    keyObjectives: [
      "Establish community-based female mentorship circles and leadership cohorts.",
      "Facilitate financial literacy, cooperative savings, and micro-business seed funding.",
      "Advocate against gender-based violence and provide psychosocial and legal support links.",
      "Empower women with digital skills and vocational autonomy to secure sustainable livelihoods.",
    ],
    impactStats: [
      { value: "2,150+", label: "Women Mentored & Trained" },
      { value: "180+", label: "Micro-Enterprises Launched" },
      { value: "94%", label: "Reported Increased Household Income" },
    ],
    currentInitiatives: [
      {
        title: "HerVoice Leadership Academy",
        description: "A 12-week intensive masterclass on civic participation, public speaking, and community organizing for young women.",
        targetBeneficiaries: "Young female professionals and grassroots organizers",
        status: "Active",
      },
      {
        title: "SheThrives Micro-Grants",
        description: "Disbursement of seed capital and business mentorship for vulnerable mothers starting artisanal and market businesses.",
        targetBeneficiaries: "300+ Low-income mothers across underserved wards",
        status: "Ongoing",
      },
    ],
    testimonial: {
      quote:
        "Before joining the THRIVE Women's Cohort, I had no collateral to expand my tailoring stall. Through their business coaching and seed grant, I now employ three young apprentices and pay my children's school fees on time.",
      author: "Amina Okoro",
      role: "Founder, Ammy Fashion & Craft, Lagos",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    slug: "child-education",
    title: "Child Education & Youth Development",
    shortTitle: "Child Education",
    subtitle: "Unlocking human potential through equitable education, literacy hubs, and youth mentorship.",
    badge: "SDG 4: Quality Education",
    sdgNumber: 4,
    sdgLabel: "Quality Education",
    heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    ],
    mandate:
      "Oversees educational outreach, school engagement, youth mentorship, leadership development, and personal-development programmes for children and young people. We bridge the classroom gap by providing learning supplies, remedial coaching, and life-skills workshops.",
    keyObjectives: [
      "Distribute back-to-school kits containing textbooks, notebooks, school bags, and uniforms.",
      "Run weekend literacy clubs and STEM foundation clinics in underserved public schools.",
      "Facilitate merit-based scholarships for out-of-school and vulnerable children.",
      "Nurture leadership, ethics, and career planning through one-on-one youth mentorship.",
    ],
    impactStats: [
      { value: "3,800+", label: "School Kits Distributed" },
      { value: "14", label: "Partner Schools Supported" },
      { value: "850+", label: "Children Enrolled in Literacy Clubs" },
    ],
    currentInitiatives: [
      {
        title: "Backpack of Hope Drive",
        description: "Annual distribution of essential scholastic materials to rural primary school pupils prior to academic session resumption.",
        targetBeneficiaries: "1,500 Primary pupils in rural communities",
        status: "Active",
      },
      {
        title: "FutureLeaders Mentorship Circle",
        description: "Pairing secondary school students with university students and young professionals for career guidance and emotional support.",
        targetBeneficiaries: "Senior secondary school teenagers",
        status: "Ongoing",
      },
    ],
    testimonial: {
      quote:
        "Receiving my textbooks and school uniform from THRIVE meant I didn't have to stay home while my classmates studied. My grades improved, and I now dream of studying medicine at university.",
      author: "Emmanuel Adeyemi",
      role: "SS2 Student & Youth Mentorship Scholar",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    slug: "skills-acquisition",
    title: "Skills Acquisition & Capacity Building",
    shortTitle: "Skills Acquisition",
    subtitle: "Equipping young people and job seekers with high-demand vocational and digital skills for economic self-reliance.",
    badge: "SDG 8 & 10: Decent Work & Reduced Inequalities",
    sdgNumber: 10,
    sdgLabel: "Reduced Inequalities",
    heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    ],
    mandate:
      "Develops and coordinates workshops, training sessions, skills-acquisition programmes, and learning opportunities that equip beneficiaries with practical, scalable, and transferable vocational and digital skills.",
    keyObjectives: [
      "Deliver hands-on vocational modules: modern fashion design, culinary arts, solar installation, and craft fabrication.",
      "Provide foundational digital skills: web basics, graphic design, and social media digital marketing.",
      "Supply post-graduation starter toolkits and apprentice transition assistance.",
      "Facilitate cooperative formation so graduates pool resources and access larger contracts.",
    ],
    impactStats: [
      { value: "1,200+", label: "Artisans & Technicians Certified" },
      { value: "82%", label: "Employed or Self-Employed within 6 Months" },
      { value: "320+", label: "Starter Toolkits Awarded" },
    ],
    currentInitiatives: [
      {
        title: "SolarTech Youth Apprentice Scheme",
        description: "Training rural youth in solar panel assembly, inverter troubleshooting, and green energy maintenance.",
        targetBeneficiaries: "120 Unemployed youths in semi-urban hubs",
        status: "Active",
      },
      {
        title: "Digital Pathways for Her",
        description: "Intensive coding and UI design bootcamp exclusively for high-potential young women from underserved communities.",
        targetBeneficiaries: "60 Young women aged 18-28",
        status: "Ongoing",
      },
    ],
    testimonial: {
      quote:
        "The digital marketing and graphic design workshop changed my trajectory completely. I received a laptop grant upon graduating and now earn remotely doing freelance branding for local stores.",
      author: "Chidinma Nwosu",
      role: "Freelance Creative & Bootcamp Alumna",
      avatar: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    slug: "advocacy-inclusion",
    title: "Advocacy, Policy & Social Inclusion",
    shortTitle: "Advocacy & Social Inclusion",
    subtitle: "Amplifying civic voices, championing equal rights, and fostering participatory democracy at all levels.",
    badge: "SDG 10 & 16: Reduced Inequalities & Justice",
    sdgNumber: 10,
    sdgLabel: "Reduced Inequalities",
    heroImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80",
    ],
    mandate:
      "Coordinates advocacy campaigns and initiatives relating to equality, inclusion, youth participation, social empowerment, and community development. Supports THRIVE’s engagement with civil society stakeholders, policymakers, and local traditional leaders.",
    keyObjectives: [
      "Convene community townhalls bridging grassroots residents and local government representatives.",
      "Conduct policy research briefs and civic scorecards on education and social welfare spending.",
      "Promote disability inclusion in public spaces, learning environments, and vocational centers.",
      "Lead public awareness campaigns on human rights, voter education, and civic duties.",
    ],
    impactStats: [
      { value: "45+", label: "Civic Townhalls Organized" },
      { value: "18,000+", label: "Citizens Reached through Campaigns" },
      { value: "6", label: "Local Policy Recommendations Adopted" },
    ],
    currentInitiatives: [
      {
        title: "Community Voice Townhalls",
        description: "Quarterly consultative forums enabling grassroots dwellers to present priority welfare needs directly to ward councilors.",
        targetBeneficiaries: "Community residents, youth leaders, and market associations",
        status: "Active",
      },
      {
        title: "AccessForAll Inclusion Drive",
        description: "Advocating for ramp accessibility and inclusive learning materials for persons living with physical disabilities.",
        targetBeneficiaries: "Persons with disabilities & community institutions",
        status: "Ongoing",
      },
    ],
    testimonial: {
      quote:
        "THRIVE gave our community associations the training and courage to engage our local government council. Today, our community has refurbished primary healthcare centers and regular power grid repairs.",
      author: "Elder Olatunji Bakare",
      role: "Community Development Association Chairman",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    slug: "community-development",
    title: "Community Development & Outreach",
    shortTitle: "Community Development",
    subtitle: "Delivering frontline emergency relief, clean water projects, health camps, and sustainable grassroots infrastructure.",
    badge: "SDG 3 & 11: Good Health & Sustainable Communities",
    sdgNumber: 11,
    sdgLabel: "Sustainable Communities",
    heroImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80",
    ],
    mandate:
      "Leads community-based programmes, outreach activities, awareness campaigns, and grassroots engagement. Works with local community stakeholders to identify urgent humanitarian needs and execute high-impact interventions.",
    keyObjectives: [
      "Install and rehabilitate solar-powered clean water boreholes in rural villages.",
      "Execute nutritional food relief drives for food-insecure families and elderly widows.",
      "Organize free mobile healthcare screening camps with essential medications and doctor consultations.",
      "Promote environmental sanitation, waste sorting, and clean neighborhood clean-up drives.",
    ],
    impactStats: [
      { value: "24", label: "Clean Water Boreholes Installed" },
      { value: "28,000+", label: "Clean Water Beneficiaries Daily" },
      { value: "14,500+", label: "Free Health Consultations Conducted" },
    ],
    currentInitiatives: [
      {
        title: "PureFlow Clean Water Project",
        description: "Drilling solar boreholes and setting up community water management committees in dry peri-urban settlements.",
        targetBeneficiaries: "6 Rural villages currently without treated piped water",
        status: "Active",
      },
      {
        title: "Community Nutrition Basket",
        description: "Monthly food distribution boxes packed with staples (rice, beans, garri, oils) for vulnerable households.",
        targetBeneficiaries: "500 Widowed and elderly-headed households",
        status: "Ongoing",
      },
    ],
    testimonial: {
      quote:
        "Waterborne diseases used to keep our children sick and away from school every rainy season. Since THRIVE installed the clean solar borehole, clinic visits have dropped by 80% and our children are healthy.",
      author: "Grace Mwangi",
      role: "Village Women Leader & Mother of Four",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
    },
  },
];
