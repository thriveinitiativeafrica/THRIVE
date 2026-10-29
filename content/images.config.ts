export interface SiteImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const siteImages = {
  logo: {
    clean: "/logo/thrive-logo-clean.png",
    emblem: "/logo/thrive-emblem.png",
    alt: "THRIVE Initiative Logo, Transforming Hope, Rights, Inclusion, Vision and Empowerment",
  },
  ogDefault: "/og-default.png",
  hero: {
    woman: {
      src: "/images/hero-woman.webp",
      alt: "Smiling Nigerian woman community leader",
      width: 600,
      height: 600,
    },
    classroom: {
      src: "/images/hero-classroom.webp",
      alt: "Nigerian school pupils reading and writing in classroom",
      width: 600,
      height: 600,
    },
    centerChildren: {
      src: "/images/hero-children-center.webp",
      alt: "Smiling Nigerian children during a school outreach",
      width: 600,
      height: 600,
    },
    volunteers: {
      src: "/images/hero-volunteers.webp",
      alt: "THRIVE volunteer team carrying food and relief parcels",
      width: 600,
      height: 600,
    },
    motherChild: {
      src: "/images/hero-mother-child.webp",
      alt: "Young mother and child supported by maternal care program",
      width: 600,
      height: 600,
    },
  },
  whoWeAre: {
    main: {
      src: "/images/who-we-are.webp",
      alt: "African community member smiling with dignity and hope",
      width: 800,
      height: 1000,
    },
  },
  problem: {
    main: {
      src: "/images/problem-community.webp",
      alt: "Children in peri-urban settlement needing education and clean water support",
      width: 800,
      height: 1000,
    },
  },
  impact: {
    water: {
      src: "/images/impact-water.webp",
      alt: "Community members accessing clean potable water from newly installed borehole",
      width: 800,
      height: 550,
    },
    food: {
      src: "/images/impact-food.webp",
      alt: "Volunteers packaging fresh, wholesome food packages for vulnerable households",
      width: 800,
      height: 550,
    },
    education: {
      src: "/images/impact-education.webp",
      alt: "Nigerian pupils studying with new backpacks and scholastic kits",
      width: 800,
      height: 550,
    },
  },
  stories: {
    farming: {
      src: "/images/story-farming.webp",
      alt: "Community farmers harvesting fresh produce under AgriThrive drip irrigation",
      width: 1200,
      height: 800,
    },
    education: {
      src: "/images/story-education.webp",
      alt: "Pupils smiling in new school uniforms at partner primary school",
      width: 1200,
      height: 800,
    },
    water: {
      src: "/images/story-water.webp",
      alt: "Solar-powered borehole commissioning in Olomowewe Village",
      width: 1200,
      height: 800,
    },
    makokoRelief: {
      src: "/images/update-makoko-relief.webp",
      alt: "Field volunteers offloading emergency food hampers in Makoko community",
      width: 1200,
      height: 800,
    },
  },
  avatars: {
    amina: {
      src: "/images/avatar-amina.webp",
      alt: "Amina Okoro, Olomowewe Water Committee Chair",
    },
    babatunde: {
      src: "/images/avatar-babatunde.webp",
      alt: "Babatunde Alabi, Community Volunteer Lead",
    },
    grace: {
      src: "/images/avatar-grace.webp",
      alt: "Grace Adeyemi, Vocational Tailoring Academy Graduate",
    },
  },
};
