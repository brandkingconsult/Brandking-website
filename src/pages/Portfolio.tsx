import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft, Palette, Globe, Video, Share2 } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/Container";

const SERVICE_ICONS = [Palette, Globe, Video, Share2];

const FILTER_OPTIONS = [
  { label: "All Projects", value: -1 },
  { label: "Branding & visual identity", value: 0 },
  { label: "Website design & development", value: 1 },
  { label: "Video & content creation", value: 2 },
  { label: "Social media management", value: 3 },
];

const Portfolio = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredProjects = filter === -1 ? PROJECTS : PROJECTS.filter((p) => p.serviceIndices.includes(filter));
  const activeLabel = FILTER_OPTIONS.find((f) => f.value === filter)?.label || "All Projects";

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Container>
          {/* Back to home */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-[16px] md:text-[14px] text-foreground/50 bg-transparent border-none cursor-pointer mb-5"
            style={{ padding: "12px 16px" }}
          >
            <ChevronLeft size={16} /> Back to home
          </button>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex flex-col gap-4">
              <h1 className="font-medium text-[32px] md:text-[40px] text-foreground">Our Work</h1>
              <p className="text-base text-foreground/50 max-w-[500px]">
                A few projects that show how we help brands gain clarity and grow.
              </p>
            </div>
            {/* Filter dropdown */}
            <div className="relative" ref={dropdownRef} style={{ flexShrink: 0 }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center font-medium border border-stroke/10 bg-transparent text-foreground text-[16px] md:text-[14px]"
                style={{ padding: "12px 16px", borderRadius: "10px", gap: "8px", cursor: "pointer" }}
              >
                {activeLabel} <ChevronDown size={16} />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 rounded-[10px] border border-stroke/10 bg-surface"
                  style={{ marginTop: "8px", padding: "8px", boxShadow: "0 4px 20px hsl(var(--stroke) / 0.08)", zIndex: 20, minWidth: "250px" }}
                >
                  {FILTER_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => { setFilter(option.value); setDropdownOpen(false); }}
                      className="cursor-pointer rounded-md"
                      style={{
                        padding: "8px",
                        fontSize: "14px",
                        color: filter === option.value ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.5)",
                        backgroundColor: filter === option.value ? "hsl(var(--stroke) / 0.05)" : "transparent",
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1.5px] w-full bg-stroke/10 my-[30px]" />

          {/* Project cards wrapping grid */}
          <div className="flex flex-wrap gap-5">
            {filteredProjects.map((project, pi) => (
              <div
                key={pi}
                onClick={() => navigate(`/portfolio/${project.slug}`)}
                className="flex flex-col rounded-[10px] cursor-pointer bg-surface"
                style={{ width: "calc(33.333% - 14px)", minWidth: "280px", padding: "20px", gap: "20px" }}
              >
                <div className="rounded-[10px] h-[200px] w-full bg-placeholder" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-xl text-foreground">{project.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{project.description}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                  {project.serviceIndices.map((sIdx) => {
                    const Icon = SERVICE_ICONS[sIdx];
                    return (
                      <div key={sIdx} className="flex items-center justify-center border border-stroke/10" style={{ width: "34px", height: "34px", borderRadius: "50%" }}>
                        <Icon size={18} className="text-foreground/40" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
