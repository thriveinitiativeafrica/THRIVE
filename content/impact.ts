export interface ImpactMetric {
  category: string;
  metric: string;
  value: string;
  growth: string;
  description: string;
  sdgAligned: number;
}

export const impactSummary = {
  title: "Evidence-Based Impact & Accountability",
  subtitle:
    "At THRIVE Initiative, we track every intervention rigorously. Our Monitoring, Evaluation & Impact (MEL) framework ensures absolute transparency, efficiency, and verifiable community outcomes.",
  summaryMetrics: [
    { value: "5,400+", label: "Lives Directly Impacted", change: "+42% YoY" },
    { value: "24", label: "Clean Water Installations", change: "100% Operational" },
    { value: "3,800+", label: "Educational Kits Distributed", change: "14 Partner Schools" },
    { value: "₦48.5M", label: "Direct Aid & Community Value Deployed", change: "Zero Admin Waste" },
  ],
  pillars: [
    {
      name: "Gender Equality & Female Leadership",
      sdg: 5,
      outcomes: [
        "2,150+ women graduated from leadership & mentorship circles",
        "180+ micro-businesses created with an 88% 1-year survival rate",
        "94% of trained women report higher household decision-making autonomy",
      ],
    },
    {
      name: "Child Literacy & Quality Education",
      sdg: 4,
      outcomes: [
        "3,800+ scholastic kits delivered across 14 public primary schools",
        "850+ pupils enrolled in weekend remedial reading and STEM clubs",
        "35% average improvement in standardized literacy scores among participants",
      ],
    },
    {
      name: "Vocational Skills & Sustainable Livelihoods",
      sdg: 10,
      outcomes: [
        "1,200+ youth and women certified in technical & digital vocations",
        "320+ graduates equipped with startup tools and equipment grants",
        "82% gainful employment or micro-enterprise ownership within 6 months",
      ],
    },
    {
      name: "Frontline Health, Water & Relief",
      sdg: 3,
      outcomes: [
        "28,000+ daily beneficiaries of solar-powered potable water boreholes",
        "12,800+ wholesome meals served to food-insecure children and widows",
        "80% reduction in waterborne clinical presentations in partner villages",
      ],
    },
  ],
  reports: [
    {
      year: "2025",
      title: "THRIVE Annual Impact & Governance Report 2025",
      fileSize: "2.4 MB PDF",
      summary: "Comprehensive audit of all 5 program portfolios, financial stewardship breakdown, and third-party MEL verification data.",
    },
    {
      year: "2024",
      title: "Community Baseline Survey & Strategic Horizon Report",
      fileSize: "1.8 MB PDF",
      summary: "Needs assessment covering 22 peri-urban and rural wards across Nigeria, informing our 5-year intervention roadmap.",
    },
  ],
};
