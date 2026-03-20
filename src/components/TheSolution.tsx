import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContactPopup } from "@/contexts/ContactPopupContext";
import { Container } from "./Container";

const SERVICES = [
  {
    number: 1,
    title: "BRANDING & GRAPHIC DESIGN",
    slug: "branding-graphic-design",
    subtitle: "Clarity and consistency that builds trust;",
    paragraph: "We define your brand's identity, visual language, and message; so your business is instantly recognizable and confidently positioned across every touchpoint.",
    mediaPosition: "right" as const,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: 2,
    title: "WEBSITE DESIGN & DEVELOPMENT",
    slug: "website-design-development",
    subtitle: "Digital experiences designed to convert;",
    paragraph: "We design and build websites that don't just look good, but guide users, build credibility, and turn attention into action.",
    mediaPosition: "left" as const,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: 3,
    title: "PHOTOGRAPHY & VIDEO CREATION",
    slug: "photography-video-creation",
    subtitle: "Visual content that tells your story;",
    paragraph: "We create high-quality visual content that captures attention, communicates value, and reinforces your brand's credibility across platforms.",
    mediaPosition: "right" as const,
    image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: 4,
    title: "SOCIAL MEDIA MANAGEMENT",
    slug: "social-media-management",
    subtitle: "Consistent presence with clear direction;",
    paragraph: "We manage and grow your social media with strategy-led content that strengthens your brand voice and keeps you visible where your audience already is.",
    mediaPosition: "left" as const,
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800",
  },
];

const ServiceBlock = ({ number, title, slug, subtitle, paragraph, mediaPosition, image }: (typeof SERVICES)[number]) => {
  const navigate = useNavigate();
  const { open } = useContactPopup();

  const leftContent = (
    <div className="flex flex-col justify-center w-full lg:w-[550px]" style={{ gap: "30px", flexShrink: 0 }}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center font-semibold flex-shrink-0"
            style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", fontSize: "14px" }}
          >
            {number}
          </div>
          <h3 className="font-semibold tracking-wide text-primary" style={{ fontSize: "18px", letterSpacing: "0.05em" }}>
            {title}
          </h3>
        </div>
        <p className="text-base leading-relaxed text-foreground/50">
          {subtitle} {paragraph}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <button
          onClick={open}
          className="font-medium text-[16px] md:text-[14px]"
          style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", border: "none", cursor: "pointer" }}
        >
          Contact us
        </button>
        <button
          onClick={() => navigate(`/services/${slug}`)}
          className="font-medium flex items-center justify-center text-[16px] md:text-[14px]"
          style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "hsl(var(--stroke) / 0.1)", color: "hsl(var(--foreground))", border: "none", cursor: "pointer", gap: "4px" }}
        >
          Learn more
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  const mediaPlaceholder = (
    <div
      className="rounded-[10px] w-full lg:max-w-[700px] h-[250px] md:h-[300px] bg-placeholder flex-shrink-0 lg:flex-shrink lg:flex-1 relative"
    >
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );

  return (
    <div className={`flex flex-col ${mediaPosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} w-full items-center gap-[20px] lg:gap-[30px] max-w-[1400px]`}>
      {mediaPlaceholder}
      {leftContent}
    </div>
  );
};

const TheSolution = () => {
  return (
    <section id="solutions" className="mt-[150px] py-[80px] w-full">
      <Container className="flex flex-col items-center gap-[80px]">
        <div className="flex flex-col items-center gap-5">
          <div className="px-5 py-2 border-2 border-stroke/10 rounded-full text-foreground/30 text-base">
            The Solutions
          </div>
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-medium text-center text-[32px] md:text-[40px] text-foreground">
              We Partner with you
            </h2>
            <p className="text-center text-base text-foreground/50 max-w-[600px]">
              From clarity and identity to execution and growth, we work alongside you to solve the real problems holding your brand back.
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full items-center gap-[80px] md:gap-[150px]">
          {SERVICES.map((service, index) => (
            <ServiceBlock key={index} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TheSolution;
