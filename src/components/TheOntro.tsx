import { useEffect, useRef, useState, useCallback } from "react";

const PARAGRAPH_TEXT =
  "Most brands struggle to stand out — not because they lack quality, but because they lack clarity";

const TheOntro = () => {
  const paragraphRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = paragraphRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const start = windowH;
    const end = windowH * 0.3;
    const current = rect.top;
    if (current >= start) setProgress(0);
    else if (current <= end) setProgress(1);
    else setProgress((start - current) / (start - end));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const chars = PARAGRAPH_TEXT.split("");
  const filledCount = Math.round(progress * chars.length);

  return (
    <section className="mt-[150px] py-[80px] px-5 md:px-20 bg-surface w-full">
      <div className="flex flex-col md:flex-row items-stretch justify-center mx-auto max-w-[1200px] gap-10">
        {/* Left stack */}
        <div className="flex flex-col">
          <span className="font-medium text-xl text-primary">DID YOU KNOW?</span>
          <div className="flex flex-col gap-2 mt-auto">
            <h2 className="text-[40px] md:text-[50px] leading-tight">
              <span className="font-medium text-primary">1000+</span>{" "}
              <span className="font-normal text-foreground">Businesses</span>
            </h2>
            <p className="text-base text-foreground/50">- are facing the same problems as you</p>
          </div>
        </div>
        {/* Divider */}
        <div className="hidden md:block self-stretch w-[1.5px] bg-stroke/10" />
        {/* Right stack */}
        <div ref={paragraphRef} className="flex items-center md:w-[585px] min-h-[208px]">
          <p className="text-[24px] md:text-[32px] leading-relaxed">
            {chars.map((char, i) => (
              <span key={i} style={{ color: i < filledCount ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.25)", transition: "color 0.15s ease" }}>
                {char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheOntro;
