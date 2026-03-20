import { useState, useRef, useEffect } from "react";
import { Container } from "./Container";

const MEMBERS = [
  { name: "Ethan Roberts", role: "Creative Director", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=600&h=800" },
  { name: "Sarah Chen", role: "Brand Strategist", image: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&q=80&w=600&h=800" },
  { name: "Marcus Johnson", role: "Lead Developer", image: "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?auto=format&fit=crop&q=80&w=600&h=800" },
  { name: "Olivia Grant", role: "Visual Designer", image: "https://images.unsplash.com/photo-1589156191108-c7ea6f642456?auto=format&fit=crop&q=80&w=600&h=800" },
];

const TheTeam = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const pendingIndex = useRef<number | null>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setMobileActiveIndex(index);
        }
      });
    }, {
      root: container,
      threshold: 0.6
    });

    const children = container.querySelectorAll(".team-card-mobile");
    children.forEach(child => observer.observe(child));

    return () => observer.disconnect();
  }, [isMobile]);

  const handleCardClick = (index: number) => {
    if (isMobile) return;
    if (index === activeIndex || transitioning) return;
    pendingIndex.current = index;
    setTransitioning(true);
    setTextVisible(false);
  };

  useEffect(() => {
    if (isMobile) return;
    if (!transitioning || textVisible) return;
    const timer = setTimeout(() => {
      if (pendingIndex.current !== null) {
        setActiveIndex(pendingIndex.current);
        pendingIndex.current = null;
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [transitioning, textVisible, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    if (!transitioning) return;
    if (pendingIndex.current !== null) return;
    const timer = setTimeout(() => {
      setTextVisible(true);
      setTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeIndex, transitioning, isMobile]);

  return (
    <section id="team" className="mt-[150px] py-[80px] w-full">
      <Container className="flex flex-col items-center gap-[30px]">
        <div className="flex flex-col items-center gap-5">
          <div className="px-5 py-2 border-2 border-stroke/10 rounded-full text-foreground/30 text-base">
            Our Team
          </div>
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-medium text-center text-[32px] md:text-[40px] text-foreground">
              The Creators Behind the Work
            </h2>
            <p className="text-center text-base text-foreground/50 max-w-[600px]">
              A small, focused team passionate about building meaningful brands.
            </p>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className={
            isMobile
              ? "flex w-full gap-3 h-[350px] overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4"
              : "flex w-full justify-center gap-3 h-[300px] md:h-[450px] max-w-[1120px]"
          }
          style={isMobile ? { scrollBehavior: "smooth", WebkitOverflowScrolling: "touch", paddingRight: "10%" } : {}}
        >
          {MEMBERS.map((member, i) => {
            const isDesktopActive = !isMobile && i === activeIndex;
            const isMobileActive = isMobile && i === mobileActiveIndex;
            const isActive = isMobile ? isMobileActive : isDesktopActive;
            
            return (
              <div
                key={i}
                data-index={i}
                onClick={() => handleCardClick(i)}
                className={`relative rounded-[10px] bg-placeholder ${isMobile ? "team-card-mobile snap-center flex-shrink-0" : ""}`}
                style={
                  isMobile
                    ? {
                        width: "85vw",
                        flex: "none",
                        transform: isActive ? "scale(1)" : "scale(0.95)",
                        transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 500ms ease",
                        filter: isActive ? "grayscale(0)" : "grayscale(50%)",
                        backgroundImage: `url(${member.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : {
                        flex: isDesktopActive ? "3 0 0px" : "0 0 60px",
                        transition: "flex 800ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                        cursor: isDesktopActive ? "default" : "pointer",
                        filter: isDesktopActive ? "grayscale(0)" : "grayscale(100%)",
                        backgroundImage: `url(${member.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                }
              >
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    padding: "20px",
                    background: "linear-gradient(transparent, hsl(var(--stroke) / 0.4))",
                    opacity: isMobile ? (isActive ? 1 : 0.5) : (isDesktopActive && textVisible ? 1 : 0),
                    transition: "opacity 300ms ease",
                    pointerEvents: isMobile || isDesktopActive ? "auto" : "none",
                  }}
                >
                  <p className="font-medium text-xl text-foreground/50">
                    {member.name}
                  </p>
                  <p className="text-base text-foreground/50">
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};

export default TheTeam;
