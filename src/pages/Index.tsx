import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroCard from "@/components/HeroCard";
import TheOntro from "@/components/TheOntro";
import TheProblem from "@/components/TheProblem";
import TheSolution from "@/components/TheSolution";
import OurProcess from "@/components/OurProcess";
import WhyChooseUs from "@/components/WhyChooseUs";
import OurWork from "@/components/OurWork";
import TheTeam from "@/components/TheTeam";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

type Phase = "idle" | "shrinking" | "reordered" | "growing";

const TRANSITION = "flex 1200ms cubic-bezier(0.4, 0, 0.2, 1)";
const CYCLE_INTERVAL = 5000;
const ANIM_DURATION = 1200;

const Index = () => {
  const [cardOrder, setCardOrder] = useState([0, 1, 2]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getInactiveWidth = () => {
    if (windowWidth < 768) return "30px"; // mobile
    if (windowWidth < 1024) return "40px"; // tablet
    return "68px"; // desktop
  };

  const getCardStyle = useCallback(
    (index: number): React.CSSProperties => {
      const len = cardOrder.length;
      const inactiveWidth = getInactiveWidth();
      const isMobile = windowWidth < 768;
      const activeFlex = isMobile ? "0 0 calc(100vw - 64px)" : "1 0 0px";

      if (phase === "idle") {
        return index === 0
          ? { flex: activeFlex, transition: TRANSITION }
          : { flex: `0 0 ${inactiveWidth}`, transition: TRANSITION };
      }
      if (phase === "shrinking") {
        if (index === 0) return { flex: "0 0 0px", transition: TRANSITION };
        if (index === 1) return { flex: activeFlex, transition: TRANSITION };
        return { flex: `0 0 ${inactiveWidth}`, transition: TRANSITION };
      }
      if (phase === "reordered") {
        if (index === 0) return { flex: activeFlex };
        if (index === len - 1) return { flex: "0 0 0px" };
        return { flex: `0 0 ${inactiveWidth}` };
      }
      if (index === 0) return { flex: activeFlex, transition: TRANSITION };
      if (index === len - 1) return { flex: `0 0 ${inactiveWidth}`, transition: TRANSITION };
      return { flex: `0 0 ${inactiveWidth}`, transition: TRANSITION };
    },
    [phase, cardOrder.length, windowWidth]
  );

  const isCardActive = useCallback(
    (index: number): boolean => {
      if (phase === "shrinking") return index === 0 || index === 1;
      return index === 0;
    },
    [phase]
  );

  useEffect(() => {
    if (phase !== "idle") return;
    const timer = setTimeout(() => setPhase("shrinking"), CYCLE_INTERVAL);
    return () => clearTimeout(timer);
  }, [phase, cardOrder]);

  useEffect(() => {
    if (phase === "shrinking") {
      const timer = setTimeout(() => {
        setCardOrder((prev) => {
          const [first, ...rest] = prev;
          return [...rest, first];
        });
        setPhase("reordered");
      }, ANIM_DURATION);
      return () => clearTimeout(timer);
    }
    if (phase === "reordered") {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("growing");
        });
      });
      return () => cancelAnimationFrame(id);
    }
    if (phase === "growing") {
      const timer = setTimeout(() => setPhase("idle"), ANIM_DURATION);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div className="bg-background">
      <section
        id="hero"
        className="flex flex-col w-full h-screen pl-[20px] pr-0 py-[20px] md:p-[40px] overflow-hidden"
      >
        <Navbar />
        {/* Spacer for fixed navbar */}
        <div className="h-[38px] md:h-[18px] flex-shrink-0" />

        <div
          className="flex w-full flex-1 gap-3 mt-[20px] md:mt-[40px] min-h-0"
        >
          {cardOrder.map((cardId, index) => (
            <HeroCard
              key={cardId}
              cardId={cardId}
              active={isCardActive(index)}
              shrinking={phase === "shrinking" && index === 0}
              animStyle={getCardStyle(index)}
            />
          ))}
        </div>
      </section>

      <div className="w-full">
        <TheOntro />
      </div>
      <div className="p-[20px] md:p-[40px] lg:p-[100px]">
        <TheProblem />
        <TheSolution />
        <OurProcess />
        <WhyChooseUs />
        <OurWork />
        <TheTeam />
        <CTABanner />
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default Index;
