export interface ExecutiveRole {
  id: number;
  title: string;
  department: string;
  category: "Executive Directorate" | "Program Leadership" | "Operations & Growth";
  responsibilities: string;
  roleOverview: string;
  image: string;
}

export const leadershipData: {
  purpose: string;
  coreValues: { name: string; description: string }[];
  generalExpectations: string[];
  reportingAndAccountability: string;
  roles: ExecutiveRole[];
} = {
  purpose:
    "The Executive Structure of THRIVE Initiative is designed to provide clear leadership, accountability, coordination, and effective implementation of the Initiative's mission, programmes, partnerships, and community-impact activities. The structure reflects THRIVE's focus on women empowerment and leadership, child education and youth development, skills acquisition, advocacy and social inclusion, and community development.",
  coreValues: [
    { name: "Empowerment", description: "Equipping individuals with tools, skills, and agency to shape their own destinies." },
    { name: "Inclusion", description: "Ensuring every voice is valued, especially marginalized and underserved groups." },
    { name: "Leadership", description: "Guiding by example with ethical courage, visionary drive, and accountability." },
    { name: "Integrity", description: "Upholding absolute transparency, honesty, and stewardship in all operations." },
    { name: "Compassion", description: "Serving communities with empathy, respect, and deep human dignity." },
    { name: "Impact", description: "Measuring success through tangible, lasting transformation in human lives." },
    { name: "Collaboration", description: "Uniting with partners, volunteers, and stakeholders for collective progress." },
  ],
  generalExpectations: [
    "Uphold THRIVE Initiative’s mission, vision, values, policies, and reputation.",
    "Work collaboratively and communicate effectively with other executive officers.",
    "Attend executive meetings and actively participate in planning and decision-making.",
    "Maintain professionalism, accountability, confidentiality, and integrity.",
    "Submit periodic updates or reports on assigned responsibilities.",
    "Support THRIVE programmes beyond individual portfolios where necessary.",
    "Promote inclusive participation and ensure activities remain responsive to community needs.",
  ],
  reportingAndAccountability:
    "Each executive officer is accountable for the responsibilities assigned to their portfolio and shall report to the Founder/Executive Director or designated superior officer. Executive officers may work with coordinators, assistants, volunteers, and project teams as approved by the leadership.",
  roles: [
    {
      id: 1,
      title: "Founder / Executive Director",
      department: "Executive Leadership",
      category: "Executive Directorate",
      roleOverview: "Chief Visionary & High-Level Leadership",
      responsibilities:
        "Provides the overall vision, strategic direction, and leadership of THRIVE Initiative. Represents the Initiative at high-level engagements, approves major strategic decisions, supervises the executive team, and ensures that all activities remain aligned with THRIVE's mission and values.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Deputy Executive Director",
      department: "Executive Leadership",
      category: "Executive Directorate",
      roleOverview: "Strategic Execution & Inter-Departmental Coordination",
      responsibilities:
        "Supports the Founder/Executive Director in strategic leadership and day-to-day coordination. Acts on delegated responsibilities, follows up on executive decisions, and promotes effective collaboration across departments.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Secretary-General / Head of Administration",
      department: "Administration & Governance",
      category: "Executive Directorate",
      roleOverview: "Institutional Documentation & Secretariat Systems",
      responsibilities:
        "Coordinates official records, correspondence, meeting schedules, minutes, documentation, and administrative systems. Ensures that executive decisions and organisational records are properly documented and maintained.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "Director of Programs & Projects",
      department: "Program Execution",
      category: "Program Leadership",
      roleOverview: "Program Development & Execution Oversight",
      responsibilities:
        "Leads the planning, development, coordination, and implementation of THRIVE programmes and projects. Ensures that activities are practical, inclusive, timely, and aligned with the Initiative's objectives.",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title: "Director of Women Empowerment & Gender Programs",
      department: "Gender & Women Initiatives",
      category: "Program Leadership",
      roleOverview: "Mentorship, Capacity Building & Female Leadership",
      responsibilities:
        "Leads programmes focused on women’s empowerment, leadership, mentorship, advocacy, confidence-building, and capacity development. Identifies opportunities that strengthen women’s participation and access to support.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      title: "Director of Child Education & Youth Development",
      department: "Youth & Education",
      category: "Program Leadership",
      roleOverview: "School Outreach & Youth Mentorship",
      responsibilities:
        "Oversees educational outreach, school engagement, youth mentorship, leadership development, and personal-development programmes for children and young people.",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      title: "Director of Skills Acquisition & Capacity Building",
      department: "Vocational & Skills",
      category: "Program Leadership",
      roleOverview: "Practical Training & Vocational Empowerment",
      responsibilities:
        "Develops and coordinates workshops, training sessions, skills-acquisition programmes, and learning opportunities that equip beneficiaries with practical and transferable skills.",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      title: "Director of Advocacy, Policy & Social Inclusion",
      department: "Advocacy & Rights",
      category: "Program Leadership",
      roleOverview: "Policy Engagement & Equality Campaigns",
      responsibilities:
        "Coordinates advocacy campaigns and initiatives relating to equality, inclusion, youth participation, social empowerment, and community development. Supports THRIVE’s engagement with relevant stakeholders on social-impact issues.",
      image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      title: "Director of Community Development & Outreach",
      department: "Community Relations",
      category: "Program Leadership",
      roleOverview: "Grassroots Interventions & Local Stakeholder Engagement",
      responsibilities:
        "Leads community-based programmes, outreach activities, awareness campaigns, and grassroots engagement. Works with community stakeholders to identify needs and support responsive interventions.",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      title: "Director of Partnerships & External Relations",
      department: "Partnerships & Institutional Alliances",
      category: "Operations & Growth",
      roleOverview: "Strategic Alliances, Institutional Growth & Donor Relations",
      responsibilities:
        "Builds and manages relationships with schools, NGOs, community groups, development organisations, institutions, professionals, and other strategic partners. Identifies collaboration opportunities that expand THRIVE’s reach and impact.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 11,
      title: "Director of Communications & Public Relations",
      department: "Communications & PR",
      category: "Operations & Growth",
      roleOverview: "Brand Voice, Media Relations & Public Affairs",
      responsibilities:
        "Oversees THRIVE’s public communication, organisational messaging, media relations, publicity, and public-facing materials. Ensures that the Initiative communicates professionally and consistently.",
      image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 12,
      title: "Director of Digital Media & Content",
      department: "Digital Media",
      category: "Operations & Growth",
      roleOverview: "Digital Storytelling, Social Engagement & Web Ecosystem",
      responsibilities:
        "Manages digital content planning, social media communication, online campaigns, visual storytelling, and digital engagement. Works with the communications team to increase awareness of THRIVE’s programmes and impact.",
      image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 13,
      title: "Director of Finance & Resource Management",
      department: "Finance & Operations",
      category: "Operations & Growth",
      roleOverview: "Financial Stewardship, Budgeting & Resource Allocation",
      responsibilities:
        "Oversees budgeting, financial planning, expenditure records, resource allocation, and basic financial accountability. Ensures responsible and transparent management of organisational resources.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 14,
      title: "Director of Monitoring, Evaluation & Impact",
      department: "MEL & Impact",
      category: "Operations & Growth",
      roleOverview: "Impact Analytics, Field Assessment & Accountability",
      responsibilities:
        "Tracks programme implementation, beneficiary participation, outputs, outcomes, feedback, and lessons learned. Develops simple monitoring systems and prepares impact reports to support accountability and programme improvement.",
      image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 15,
      title: "Director of Volunteers & Membership Engagement",
      department: "Volunteers & Community",
      category: "Operations & Growth",
      roleOverview: "Volunteer Recruitment, Welfare & Community Mobilization",
      responsibilities:
        "Coordinates volunteer recruitment, onboarding, engagement, welfare, participation, and retention. Creates meaningful opportunities for volunteers and members to contribute to THRIVE’s programmes and community-impact activities.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    },
  ],
};
