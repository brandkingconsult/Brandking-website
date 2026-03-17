import { Palette, Globe, Video, Share2, LucideIcon } from "lucide-react";

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  description: string;
  includes: {
    heading: string;
    intro: string;
    bullets: string[];
    outro: string;
  };
  whoFor: {
    bullets: string[];
    outro: string;
  };
  tags: string[];
  ctaText: string;
}

export const SERVICES: ServiceData[] = [
  {
    slug: "branding-graphic-design",
    title: "BRANDING & GRAPHIC DESIGN",
    shortTitle: "Branding & Graphic Design",
    icon: Palette,
    description: "Helping brands trust their visual identity through a clear, credible digital experience.",
    includes: {
      heading: "What this service includes",
      intro: 'We build brands that feel intentional, consistent, and trustworthy — not just "nice-looking." This includes:',
      bullets: [
        "Brand strategy & positioning",
        "Logo design and visual identity",
        "Color systems and typography",
        "Brand guidelines for consistency",
        "Marketing and social media assets",
      ],
      outro: "Our goal is to give your brand a clear direction and a visual language that works everywhere.",
    },
    whoFor: {
      bullets: [
        "Startups defining their identity for the first time",
        "Growing brands struggling with inconsistency",
        "Businesses rebranding to gain trust and clarity",
      ],
      outro: "If people don't understand what your brand stands for at a glance, this service is for you.",
    },
    tags: ["Branding", "Graphics design"],
    ctaText: "Let's define your brand properly",
  },
  {
    slug: "website-design-development",
    title: "WEBSITE DESIGN & DEVELOPMENT",
    shortTitle: "Website Design & Development",
    icon: Globe,
    description: "Digital experiences designed to convert visitors into customers with clarity and purpose.",
    includes: {
      heading: "What this service includes",
      intro: "We design and build websites that guide users, build credibility, and turn attention into action. This includes:",
      bullets: [
        "UX/UI design and prototyping",
        "Responsive website development",
        "Landing page optimization",
        "CMS integration and setup",
        "Performance and SEO optimization",
      ],
      outro: "Our goal is to create digital experiences that look great and actually perform.",
    },
    whoFor: {
      bullets: [
        "Businesses without a professional web presence",
        "Brands with outdated or underperforming websites",
        "Startups launching their first digital product",
      ],
      outro: "If your website isn't working as hard as you are, this service is for you.",
    },
    tags: ["Web design", "Development"],
    ctaText: "Let's build your digital presence",
  },
  {
    slug: "photography-video-creation",
    title: "PHOTOGRAPHY & VIDEO CREATION",
    shortTitle: "Video Creation & Editing",
    icon: Video,
    description: "Visual content that tells your story and reinforces your brand's credibility across platforms.",
    includes: {
      heading: "What this service includes",
      intro: "We create high-quality visual content that captures attention and communicates value. This includes:",
      bullets: [
        "Brand photography sessions",
        "Product and lifestyle shoots",
        "Video production and editing",
        "Social media video content",
        "Motion graphics and animation",
      ],
      outro: "Our goal is to give your brand visual content that works everywhere.",
    },
    whoFor: {
      bullets: [
        "Brands needing professional visual content",
        "Businesses launching new products or campaigns",
        "Companies building their content library",
      ],
      outro: "If your visuals don't match your brand quality, this service is for you.",
    },
    tags: ["Photography", "Video"],
    ctaText: "Let's create your visual story",
  },
  {
    slug: "social-media-management",
    title: "SOCIAL MEDIA MANAGEMENT",
    shortTitle: "Social Media Management",
    icon: Share2,
    description: "Consistent presence with clear direction that strengthens your brand voice.",
    includes: {
      heading: "What this service includes",
      intro: "We manage and grow your social media with strategy-led content. This includes:",
      bullets: [
        "Content strategy and calendar",
        "Post creation and scheduling",
        "Community management",
        "Analytics and reporting",
        "Platform-specific optimization",
      ],
      outro: "Our goal is to keep your brand visible and relevant where your audience is.",
    },
    whoFor: {
      bullets: [
        "Brands without consistent social presence",
        "Businesses too busy to manage content",
        "Companies wanting strategic growth online",
      ],
      outro: "If your social media feels random instead of intentional, this service is for you.",
    },
    tags: ["Social media", "Management"],
    ctaText: "Let's grow your social presence",
  },
];

export const getServiceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
