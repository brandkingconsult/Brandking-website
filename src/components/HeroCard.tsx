import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useContactPopup } from "@/contexts/ContactPopupContext";

interface CardContent {
  heading: string;
  paragraph: string;
}

const CARD_CONTENT: CardContent[] = [
  {
    heading: "Be\nVisible.",
    paragraph: "We position your brand to stand out in crowded markets and stay top-of-mind",
  },
  {
    heading: "Be\nTrusted.",
    paragraph: "We craft clear identities and brand systems that build credibility and confidence.",
  },
  {
    heading: "Sell\nMore.",
    paragraph: "We turn attention into action with brand experiences designed to convert.",
  },
];

interface HeroCardProps {
  cardId: number;
  active?: boolean;
  shrinking?: boolean;
  className?: string;
  animStyle?: React.CSSProperties;
}

const HeroCard = ({ cardId, active = false, shrinking = false, className = "", animStyle }: HeroCardProps) => {
  const content = CARD_CONTENT[cardId] || CARD_CONTENT[0];
  const showContent = active || shrinking;
  const { open } = useContactPopup();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (showContent && !shrinking) {
      const timer = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(timer);
    } else {
      setMounted(false);
    }
  }, [showContent, shrinking]);

  return (
    <div
      className={`rounded-xl ${active || shrinking ? "bg-card-active" : "bg-card"} ${className}`}
      style={{
        overflow: "hidden",
        minWidth: 0,
        position: "relative",
        ...animStyle,
      }}
    >
      {showContent && (
        <div
          className="absolute inset-0 p-5 md:p-[40px]"
          style={{
            pointerEvents: shrinking ? "none" : "auto",
          }}
        >
          <div
            className={`h-full flex flex-col justify-between w-full min-w-max md:min-w-[800px] ${shrinking
              ? "opacity-0 -translate-x-[40px]"
              : mounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[40px]"
              }`}
            style={{
              transition: "opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1), transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            <div className="w-full">
              <div className="flex flex-col gap-2 w-full">
                <h1
                  className="text-muted font-semibold leading-[1] whitespace-pre-line text-[70px] md:text-[120px]"
                >
                  {content.heading}
                </h1>
                <p
                  className="text-muted-foreground text-base max-w-[480px] break-words md:break-normal"
                >
                  {content.paragraph}
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-[30px] w-full"
              >
                <button
                  onClick={open}
                  className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-[16px] md:text-[14px]"
                  style={{ borderRadius: "10px", padding: "12px 16px" }}
                >
                  Book a free clarity session
                </button>
                <button
                  className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 transition-colors flex items-center justify-center gap-1 font-medium text-[16px] md:text-[14px]"
                  style={{ borderRadius: "10px", padding: "12px 16px" }}
                >
                  Learn more
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCard;
