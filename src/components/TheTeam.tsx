import { useState, useRef, useEffect } from "react";

const MEMBERS = [
  { name: "Ethan Roberts", role: "Creative Director" },
  { name: "Sarah Chen", role: "Brand Strategist" },
  { name: "Marcus Johnson", role: "Lead Developer" },
  { name: "Olivia Grant", role: "Visual Designer" },
];

const TheTeam = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const pendingIndex = useRef<number | null>(null);

  const handleCardClick = (index: number) => {
    if (index === activeIndex || transitioning) return;
    pendingIndex.current = index;
    setTransitioning(true);
    setTextVisible(false);
  };

  useEffect(() => {
    if (!transitioning || textVisible) return;
    const timer = setTimeout(() => {
      if (pendingIndex.current !== null) {
        setActiveIndex(pendingIndex.current);
        pendingIndex.current = null;
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [transitioning, textVisible]);

  useEffect(() => {
    if (!transitioning) return;
    if (pendingIndex.current !== null) return;
    const timer = setTimeout(() => {
      setTextVisible(true);
      setTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeIndex, transitioning]);

  return (
    <section id="team" className="mt-[150px] py-[80px] px-5 md:px-[40px] w-full">
      <div className="flex flex-col items-center mx-auto gap-[30px] max-w-[1400px]">
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

        <div className="flex w-full justify-center gap-3 h-[300px] md:h-[450px] max-w-[1120px]">
          {MEMBERS.map((member, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                onClick={() => handleCardClick(i)}
                className="relative overflow-hidden rounded-[10px] bg-placeholder"
                style={{
                  flex: isActive ? "3 0 0px" : "0 0 60px",
                  transition: "flex 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: isActive ? "default" : "pointer",
                  filter: isActive ? "grayscale(0)" : "grayscale(100%)",
                }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    padding: "20px",
                    background: "linear-gradient(transparent, hsl(var(--stroke) / 0.4))",
                    opacity: isActive && textVisible ? 1 : 0,
                    transition: "opacity 300ms ease",
                    pointerEvents: isActive ? "auto" : "none",
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
      </div>
    </section>
  );
};

export default TheTeam;
