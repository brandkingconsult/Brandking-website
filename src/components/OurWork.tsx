import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft, Palette, Globe, Video, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";

const SERVICE_ICONS = [Palette, Globe, Video, Share2];

const OurWork = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<{ projectIdx: number; serviceIdx: number } | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollRight = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: 420, behavior: "smooth" });
  };
  const scrollLeft = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: -420, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="mt-[150px] py-[80px] px-5 md:px-[40px] w-full">
      <div className="flex flex-col mx-auto gap-[30px] max-w-[1400px]">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex flex-col gap-5">
            <div className="px-5 py-2 border-2 border-stroke/10 rounded-full text-foreground/30 text-base w-fit">
              Our Portfolio
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-medium text-[32px] md:text-[40px] text-foreground">Our Work</h2>
              <p className="text-base text-foreground/50 max-w-[500px]">
                A few projects that show how we help brands gain clarity and grow.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/portfolio")}
            className="font-medium flex items-center self-start md:self-auto md:mt-[60px] text-[16px] md:text-[14px]"
            style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", border: "none", cursor: "pointer", gap: "4px", flexShrink: 0 }}
          >
            Explore more <ChevronRight size={16} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-[1.5px] w-full bg-stroke/10" />

        {/* Scrollable project cards */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", paddingRight: "80px" }}
          >
            {PROJECTS.slice(0, 5).map((project, pi) => (
              <div
                key={pi}
                onClick={() => navigate(`/portfolio/${project.slug}`)}
                className="flex flex-col rounded-[10px] flex-shrink-0 cursor-pointer bg-surface"
                style={{ width: "300px", minHeight: "350px", padding: "20px", gap: "20px", scrollSnapAlign: "start" }}
              >
                <div className="rounded-[10px] h-[200px] w-full bg-placeholder" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-xl text-foreground">{project.title}</h3>
                  <p className="text-[16px] md:text-[14px] text-foreground/50 leading-relaxed">{project.description}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                  {project.serviceIndices.map((sIdx) => {
                    const Icon = SERVICE_ICONS[sIdx];
                    const isHovered = hoveredService?.projectIdx === pi && hoveredService?.serviceIdx === sIdx;
                    return (
                      <div
                        key={sIdx}
                        className="relative"
                        onMouseEnter={(e) => { e.stopPropagation(); setHoveredService({ projectIdx: pi, serviceIdx: sIdx }); }}
                        onMouseLeave={() => setHoveredService(null)}
                      >
                        <div
                          className="flex items-center justify-center border border-stroke/10"
                          style={{ width: "34px", height: "34px", borderRadius: "50%", cursor: "pointer" }}
                        >
                          <Icon size={18} className="text-foreground/40" />
                        </div>
                        {isHovered && (
                          <div
                            className="absolute bottom-full left-1/2 rounded-[10px] bg-surface"
                            style={{ transform: "translateX(-50%)", marginBottom: "8px", padding: "12px 16px", boxShadow: "0 4px 20px hsl(var(--stroke) / 0.12)", whiteSpace: "nowrap", zIndex: 10 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <p className="font-medium text-[13px] text-foreground mb-1">{SERVICES[sIdx].shortTitle}</p>
                            <a
                              href="#"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/services/${SERVICES[sIdx].slug}`); }}
                              className="text-xs text-primary no-underline"
                            >
                              View more projects →
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 hidden md:flex items-center justify-center bg-surface border border-stroke/10"
              style={{ left: "-20px", transform: "translateY(-50%)", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", boxShadow: "0 2px 8px hsl(var(--stroke) / 0.1)" }}
            >
              <ChevronLeft size={20} className="text-foreground" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute top-1/2 hidden md:flex items-center justify-center bg-surface border border-stroke/10"
              style={{ right: "-20px", transform: "translateY(-50%)", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", boxShadow: "0 2px 8px hsl(var(--stroke) / 0.1)" }}
            >
              <ChevronRight size={20} className="text-foreground" />
            </button>
          )}
        </div>
      </div>
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};

export default OurWork;
