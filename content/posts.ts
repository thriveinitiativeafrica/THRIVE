export interface BlogPost {
  slug: string;
  title: string;
  italicTitle?: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  readTime: string;
  tags: string[];
  sdgTag?: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "seeds-of-hope-growing-food-in-dry-lands",
    title: "Seeds of Hope: Growing Food in Dry Lands",
    italicTitle: "Growing Food",
    excerpt:
      "How climate-smart community drip irrigation and resilient seed distribution are reversing food insecurity in arid farming settlements.",
    category: "Agricultural Work",
    date: "17 Dec 2025",
    author: {
      name: "Chukwudi Eze",
      role: "Director of Community Development",
      avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=150&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=1000&q=80",
    readTime: "5 min read",
    tags: ["Food Security", "Agriculture", "Community Empowerment", "SDG 2"],
    sdgTag: 3,
    content: `
### Transforming Parched Ground into Verdant Hope

In rural communities where rain patterns have grown increasingly unpredictable, farming families often faced devastating seasonal crop failures. For generations, traditional farming relied solely on the monsoon rains. When the rains delayed, food stocks dwindled, and school attendance plummeted as families pooled every coin just to afford grain.

#### The Drip Irrigation Breakthrough

Last year, THRIVE Initiative initiated the **AgriThrive Resilient Farming Program**. Working alongside local cooperative leaders, we installed low-pressure solar-powered drip irrigation kits across 12 community farm clusters.

> "We used to watch our crops dry up under the scorching sun. Today, our women manage regular harvests of fresh leafy vegetables, pepper, and maize even in the driest months."
> — *Mama Abigail, Farm Cooperative Lead*

#### Measurable Outcomes

- Over **1,400 kilograms of fresh organic produce** harvested in the first pilot cycle.
- **85 female farmers** trained on climate-smart soil regeneration, composting, and seed preservation.
- Local market surplus generated an average of **₦45,000 monthly supplemental income** per participating family.

Through targeted interventions that combine practical agricultural technology with grassroots ownership, we are proving that food security is not just an ideal—it is achievable community by community.
    `,
  },
  {
    slug: "from-street-to-school-a-childs-journey",
    title: "From Street to School: A Child's Journey",
    italicTitle: "A Child's Journey",
    excerpt:
      "Tracing the inspiring turnaround of young children who regained their right to learn through the THRIVE Education Sponsorship Initiative.",
    category: "School Project",
    date: "17 Dec 2025",
    author: {
      name: "Folashade Adeleke",
      role: "Director of Child Education & Youth",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    readTime: "4 min read",
    tags: ["Child Education", "Mentorship", "Literacy", "SDG 4"],
    sdgTag: 4,
    content: `
### Restoring the Right to Dream

Education is the single most potent equalizer in modern society. Yet in peri-urban informal settlements, thousands of brilliant young minds spend their days hawking goods on congested highways instead of sitting in classrooms.

#### Meeting 10-Year-Old Tobi

When our outreach volunteers first met Tobi during a community survey in Ajegunle, he had been out of school for almost two years following the loss of his father. His mother's petty trading income could barely cover basic food and rent.

Through the **Backpack of Hope Scholarship**, THRIVE:
1. Enrolled Tobi into a nearby partner primary school with full tuition coverage.
2. Provided two complete school uniforms, sturdy shoes, textbooks, and a backpack of stationery.
3. Paired him with a weekend reading tutor from our volunteer network.

#### The Power of a Second Chance

Within six months, Tobi rose from the bottom quartile of his class to become one of the top three readers in Primary 4. His teacher describes him as inquisitive, energetic, and eager to help his peers learn their multiplication tables.

Stories like Tobi's remind us why we never tire. Every child deserves the dignity of a desk, the wonder of a book, and the promise of an education.
    `,
  },
  {
    slug: "clean-water-healthy-future",
    title: "Clean Water, Healthy Future",
    italicTitle: "Healthy Future",
    excerpt:
      "How reliable access to potable water is eradicating waterborne diseases and freeing young girls to attend classes consistently.",
    category: "Health & Water",
    date: "17 Dec 2025",
    author: {
      name: "Dr. Olayemi Peters",
      role: "Director of Monitoring & Impact",
      avatar: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=150&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=80",
    readTime: "6 min read",
    tags: ["Clean Water", "Public Health", "Sanitation", "SDG 3", "SDG 6"],
    sdgTag: 3,
    content: `
### The Lifeline That Flowed into Olomowewe Village

Water is life, but contaminated water is a silent crisis. Before THRIVE commissioned the solar borehole in Olomowewe, the only water source was a sluggish seasonal stream shared with livestock. Typhoid and chronic diarrhea were regular afflictions, filling the local clinic and keeping children home from school.

#### Sustainable Engineering Meets Community Stewardship

Rather than simply drilling a well and leaving, THRIVE implemented our **Community Water Committee Model**:
- Deep 110-meter geological drilling to tap pristine underground aquifers.
- High-efficiency submersible solar pump with battery storage for uninterrupted day and night water flow.
- A 10,000-liter overhead storage tank with 8 multi-tap distribution heads.
- Democratic election of a 5-person village maintenance committee trained on basic plumbing and preventive care.

#### The Ripple Effect of Clean Water

The transformation was immediate:
- **Zero reported cholera or dysentery cases** in the community since commissioning.
- Girls who previously spent **3 to 4 hours daily** trekking for stream water now have 100% regular school attendance.
- Community smallholders use overflow greywater to cultivate backyard vegetable gardens.

Safe water isn't a luxury; it is a foundational human right. With your continued support, we are bringing this lifeline to twelve more communities this year.
    `,
  },
];
