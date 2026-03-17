import { useEffect, useRef, useState, useCallback } from "react";
import { useContactPopup } from "@/contexts/ContactPopupContext";

const BANNER_TEXT = "We believe strong brands are built on clarity, not noise.\nWhen strategy, design, and storytelling work together,\nbrands don't just look good — they earn trust and drive growth.\n\nThat's what we build at Brand King.";

const CTABanner = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { open } = useContactPopup();

  const handleScroll = useCallback(() => {
    const el = textRef.current;
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

  const chars = BANNER_TEXT.split("");
  const filledCount = Math.round(progress * chars.length);

  return (
    <section className="mt-[150px] px-5 md:px-[40px] w-full">
      <div
        ref={textRef}
        className="mx-auto rounded-[10px] flex flex-col items-center justify-center"
        style={{ maxWidth: "1400px", padding: "40px", backgroundColor: "#1B1B1B", width: "100%" }}
      >
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="px-5 py-2 border-2 border-white/20 rounded-full text-white/30 text-base">
            Let's Talk
          </div>
          <div className="flex flex-col items-center gap-[30px] max-w-[1400px] w-full">
            <p className="text-center text-[20px] md:text-[30px] leading-relaxed">
              {chars.map((char, i) => (
                <span
                  key={i}
                  style={{
                    color: i < filledCount ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)",
                    transition: "color 0.15s ease",
                  }}
                >
                  {char === "\n" ? <br /> : char}
                </span>
              ))}
            </p>
            <button
              onClick={open}
              className="font-medium text-[16px] md:text-[14px]"
              style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "hsl(253 67% 53%)", color: "#FFFFFF", border: "none", cursor: "pointer" }}
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
