import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import searchIcon from "@/assets/search-icon.svg";
import brainIcon from "@/assets/brain-icon.svg";
import designBuildIcon from "@/assets/design-build-icon.svg";
import rocketIcon from "@/assets/rocket-icon.svg";
import { Container } from "./Container";

const STEPS = [
  { icon: searchIcon, title: "Discover", paragraph: "We understand your brand, goals, and challenges." },
  { icon: brainIcon, title: "Refine", paragraph: "We clarify strategic direction, tone, and position." },
  { icon: designBuildIcon, title: "Design & Build", paragraph: "We create, define, and execute everything to order." },
  { icon: rocketIcon, title: "Launch & Grow", paragraph: "We support launch, refine, and scale your brand." },
];

const ANIMATION_DURATION = 3000;
const STEP_THRESHOLDS = [0.05, 0.3, 0.55, 0.8];

const OurProcess = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const animationRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (hasTriggered) return;
    const check = () => {
      if (!sectionRef.current || hasTriggered) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vc = window.innerHeight / 2;
      const sc = rect.top + rect.height / 2;
      if (Math.abs(sc - vc) < rect.height / 2) setHasTriggered(true);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / ANIMATION_DURATION);
      setProgress(p);
      if (p < 1) animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [hasTriggered]);

  const activeSteps = STEP_THRESHOLDS.map((t) => progress >= t);

  return (
    <section ref={sectionRef} className="mt-[150px] py-[80px] w-full">
      <Container className="flex flex-col items-center gap-[30px]">
        {/* Top stack */}
        <div className="flex flex-col items-center gap-5">
          <div className="px-5 py-2 border-2 border-stroke/10 rounded-full text-foreground/30 text-base">
            Our Process
          </div>
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-medium text-center text-[32px] md:text-[40px] text-foreground">
              Our Process
            </h2>
            <p className="text-center text-base text-foreground/50 max-w-[600px]">
              A clear, collaborative process, from insight to execution.
            </p>
          </div>
        </div>

        {/* Cards + Progress */}
        <div className="flex flex-col w-full gap-[30px]">
          <div className="lg:hidden flex gap-[30px] w-full">
            <div className="flex flex-col gap-5 flex-1 w-full relative">
              {STEPS.map((step, i) => {
                const isActive = activeSteps[i];
                return (
                  <div
                    key={i}
                    className="flex flex-col transition-all duration-500 rounded-[10px]"
                    style={{ padding: "20px", gap: "20px", backgroundColor: isActive ? "hsl(var(--surface))" : "transparent" }}
                  >
                    <div
                      className="flex items-center justify-center transition-colors duration-500"
                      style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--stroke) / 0.1)",
                      }}
                    >
                      <img src={step.icon} alt={step.title} width={18} height={18} />
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="font-medium transition-colors duration-500 text-xl" style={{ color: isActive ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.25)" }}>
                        {step.title}
                      </h3>
                      <div className="h-[1.5px] w-full bg-stroke/10" />
                      <p className="transition-colors duration-500 text-base leading-relaxed" style={{ color: isActive ? "hsl(var(--foreground) / 0.5)" : "hsl(var(--foreground) / 0.25)" }}>
                        {step.paragraph}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Vertical progress bar */}
            <div className="w-1 bg-stroke/5 rounded-sm relative flex-shrink-0" style={{ alignSelf: "stretch" }}>
              <div className="absolute top-0 left-0 w-full bg-primary rounded-sm" style={{ height: `${progress * 100}%`, transition: "height 0.05s linear" }} />
            </div>
          </div>
          <div className="hidden lg:flex flex-col w-full gap-[30px]">
            <div className="flex flex-row w-full gap-5">
              {STEPS.map((step, i) => {
                const isActive = activeSteps[i];
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col transition-all duration-500 rounded-[10px]"
                    style={{ padding: "20px", gap: "20px", backgroundColor: isActive ? "hsl(var(--surface))" : "transparent" }}
                  >
                    <div
                      className="flex items-center justify-center transition-colors duration-500"
                      style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--stroke) / 0.1)",
                      }}
                    >
                      <img src={step.icon} alt={step.title} width={18} height={18} />
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="font-medium transition-colors duration-500 text-xl" style={{ color: isActive ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.25)" }}>
                        {step.title}
                      </h3>
                      <div className="h-[1.5px] w-full bg-stroke/10" />
                      <p className="transition-colors duration-500 text-base leading-relaxed" style={{ color: isActive ? "hsl(var(--foreground) / 0.5)" : "hsl(var(--foreground) / 0.25)" }}>
                        {step.paragraph}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full h-1 bg-stroke/5 rounded-sm relative">
              <div className="absolute top-0 left-0 h-full bg-primary rounded-sm" style={{ width: `${progress * 100}%`, transition: "width 0.05s linear" }} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurProcess;
