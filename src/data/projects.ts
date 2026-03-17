export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  serviceIndices: number[]; // indices into SERVICES array
  client: string;
  industry: string;
  problem: string;
  role: string;
  roleDetails: { label: string; text: string }[];
  liveUrl?: string;
  image?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "gradclear",
    title: "GradClear",
    description: "Turning a complex education service into a clear, trusted digital brand.",
    serviceIndices: [0, 1],
    client: "GradClear Ltd",
    industry: "Education / Academic Verification",
    problem: "GradClear was built to help students and institutions verify academic results quickly and reliably. The idea was strong, but the presentation wasn't.\n\nThe brand lacked a clear identity, the website felt confusing to first-time users, and trust was difficult to establish at a glance. For a platform dealing in academic credibility, that was a major issue.\n\nThey came to us to help translate their vision into something users could immediately understand and trust.",
    role: "Brand King partnered with GradClear from a foundational level.",
    roleDetails: [
      { label: "Branding & visual identity", text: "creating a clean, professional look that reflects trust and clarity" },
      { label: "Website design & development", text: "structuring the platform to feel intuitive, credible, and easy to use" },
    ],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "rockview-hotel",
    title: "Rockview Hotel",
    description: "Repositioning a local hotel to feel premium, modern, and book-ready.",
    serviceIndices: [0, 2],
    client: "Rockview Hotel",
    industry: "Hospitality / Tourism",
    problem: "Rockview Hotel had a loyal local following but struggled to attract online bookings. Their brand felt dated and their digital presence didn't reflect the quality of their property.\n\nWe helped them reposition with a refreshed visual identity and compelling content that drives bookings.",
    role: "Brand King partnered with Rockview Hotel to elevate their presence.",
    roleDetails: [
      { label: "Branding & visual identity", text: "modernizing the hotel's look to feel premium and inviting" },
      { label: "Photography & video", text: "showcasing the property with professional visual content" },
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "discover",
    title: "Discover",
    description: "We learn about your brand, goals, and challenges.",
    serviceIndices: [1, 3],
    client: "Discover Inc.",
    industry: "Technology / SaaS",
    problem: "Discover had a strong product but weak brand recognition. Their online presence was fragmented across platforms with no consistent voice.\n\nWe helped them unify their brand and build a digital ecosystem that works together.",
    role: "Brand King built Discover's digital foundation.",
    roleDetails: [
      { label: "Website design & development", text: "creating a unified digital hub for all their services" },
      { label: "Social media management", text: "establishing a consistent voice across platforms" },
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "bloom-studio",
    title: "Bloom Studio",
    description: "Building a visual identity that feels organic, creative, and bold.",
    serviceIndices: [0, 2, 3],
    client: "Bloom Studio",
    industry: "Creative / Design Agency",
    problem: "Bloom Studio had incredible work but no cohesive brand to showcase it. Their identity was scattered and didn't reflect their creative caliber.\n\nWe helped them build a brand as creative as their output.",
    role: "Brand King gave Bloom Studio a brand that matches their talent.",
    roleDetails: [
      { label: "Branding & visual identity", text: "creating a bold, organic brand system" },
      { label: "Photography & video", text: "documenting their creative process and portfolio" },
      { label: "Social media management", text: "showcasing their work consistently online" },
    ],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "novapay",
    title: "NovaPay",
    description: "Crafting a fintech brand that communicates trust, speed, and simplicity.",
    serviceIndices: [0, 1, 3],
    client: "NovaPay Technologies",
    industry: "Finance / Fintech",
    problem: "NovaPay needed to stand out in a crowded fintech space. Users didn't trust new payment platforms easily, and their brand didn't communicate the reliability they offered.\n\nWe built a brand and digital experience that makes trust their first impression.",
    role: "Brand King established NovaPay's market position.",
    roleDetails: [
      { label: "Branding & visual identity", text: "designing a brand that communicates trust and innovation" },
      { label: "Website design & development", text: "building a conversion-focused product website" },
      { label: "Social media management", text: "growing awareness in the fintech community" },
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "terra-foods",
    title: "Terra Foods",
    description: "Bringing a sustainable food brand to life with purpose-driven design.",
    serviceIndices: [0, 2],
    client: "Terra Foods Co.",
    industry: "Food & Beverage / Sustainability",
    problem: "Terra Foods had a mission-driven product but their brand didn't communicate their values effectively. Consumers couldn't tell them apart from generic competitors.\n\nWe helped them stand for something visually and verbally.",
    role: "Brand King aligned Terra Foods' brand with their mission.",
    roleDetails: [
      { label: "Branding & visual identity", text: "creating an earthy, purpose-driven visual identity" },
      { label: "Photography & video", text: "capturing the story behind their sustainable practices" },
    ],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "arc-fitness",
    title: "Arc Fitness",
    description: "Designing a fitness brand that motivates before you even step inside.",
    serviceIndices: [0, 1, 2],
    client: "Arc Fitness",
    industry: "Health & Fitness",
    problem: "Arc Fitness was a premium gym with a generic brand. Their online presence didn't match the quality experience members received inside.\n\nWe gave them a brand and digital presence as strong as their training programs.",
    role: "Brand King transformed Arc Fitness's brand perception.",
    roleDetails: [
      { label: "Branding & visual identity", text: "building a bold, energy-driven brand identity" },
      { label: "Website design & development", text: "creating an immersive membership-focused website" },
      { label: "Photography & video", text: "capturing the intensity and community of the gym" },
    ],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "pulse-agency",
    title: "Pulse Agency",
    description: "Repositioning a digital agency to attract enterprise-level clients.",
    serviceIndices: [0, 1],
    client: "Pulse Digital Agency",
    industry: "Marketing / Digital Agency",
    problem: "Pulse had the skills to serve enterprise clients but their brand spoke to startups. The disconnect was costing them high-value contracts.\n\nWe repositioned their brand to match their ambitions.",
    role: "Brand King elevated Pulse's market positioning.",
    roleDetails: [
      { label: "Branding & visual identity", text: "refining their brand for enterprise credibility" },
      { label: "Website design & development", text: "building a portfolio site that impresses decision-makers" },
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "zenith-labs",
    title: "Zenith Labs",
    description: "Making complex biotech accessible through clear, trustworthy branding.",
    serviceIndices: [0, 1, 3],
    client: "Zenith Laboratories",
    industry: "Biotech / Healthcare",
    problem: "Zenith Labs had groundbreaking research but their public-facing brand was clinical and cold. Potential partners and investors couldn't connect with their mission.\n\nWe humanized their brand while maintaining scientific credibility.",
    role: "Brand King made Zenith Labs approachable and credible.",
    roleDetails: [
      { label: "Branding & visual identity", text: "balancing scientific rigor with human warmth" },
      { label: "Website design & development", text: "making complex information accessible and engaging" },
      { label: "Social media management", text: "building thought leadership in the biotech space" },
    ],
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800",
  },
];

export const getProjectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
