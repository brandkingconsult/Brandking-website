import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, Palette, Globe, Video, Share2 } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { useContactPopup } from "@/contexts/ContactPopupContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import searchIcon from "@/assets/search-icon.svg";
import brainIcon from "@/assets/brain-icon.svg";
import designBuildIcon from "@/assets/design-build-icon.svg";
import rocketIcon from "@/assets/rocket-icon.svg";

const SERVICE_ICONS = [Palette, Globe, Video, Share2];

const PROCESS_STEPS = [
  { icon: searchIcon, title: "Discover", paragraph: "Understanding the problem and the audience they served" },
  { icon: brainIcon, title: "Define", paragraph: "Clarifying the brand tone, structure, and key trust signals" },
  { icon: designBuildIcon, title: "Design & Build", paragraph: "Designing a clean interface and building a responsive, functional website" },
  { icon: rocketIcon, title: "Launch & Grow", paragraph: "Polishing details to ensure clarity, consistency, and confidence throughout" },
];

const STEP_THRESHOLDS = [0.05, 0.3, 0.55, 0.8];
const ANIMATION_DURATION = 3000;

const PortfolioDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { open } = useContactPopup();
  const project = getProjectBySlug(slug || "");

  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

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

  if (!project) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="pt-[120px] px-5 md:px-[40px] text-center">
          <h1 className="text-[40px] text-foreground">Project not found</h1>
          <button onClick={() => navigate("/portfolio")} className="mt-5 text-primary text-[16px] md:text-[14px]" style={{ padding: "12px 16px" }}>← Back to Projects</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <div className="mx-auto max-w-[1400px] px-5 md:px-[40px]">
          {/* Back link */}
          <button
            onClick={() => navigate("/portfolio")}
            className="flex items-center gap-1 text-[16px] md:text-[14px] text-foreground/50 bg-transparent border-none cursor-pointer mb-5"
            style={{ padding: "12px 16px" }}
          >
            <ChevronLeft size={16} /> Back to Projects
          </button>

          {/* Project header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div className="flex flex-col gap-4">
              <h1 className="font-medium text-[32px] md:text-[40px] text-foreground">
                {project.title} - Project Details Page
              </h1>
              <p className="text-base text-foreground/50">{project.description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {project.serviceIndices.map((sIdx) => {
                const Icon = SERVICE_ICONS[sIdx];
                return (
                  <div key={sIdx} className="flex items-center justify-center border border-stroke/10" style={{ width: "34px", height: "34px", borderRadius: "50%" }}>
                    <Icon size={18} className="text-foreground/40" />
                  </div>
                );
              })}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium no-underline"
                  style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", fontSize: "14px" }}
                >
                  Preview Live
                </a>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1.5px] w-full bg-stroke/10 mt-[30px]" />

          {/* 3x2 Grid */}
          <div className="grid gap-5 mt-[30px] max-w-[1200px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gridAutoRows: "299px" }}>
            <div className="rounded-[10px] bg-placeholder row-span-2 hidden md:block" style={{ gridRow: "1 / 3", gridColumn: "1 / 2" }} />
            <div className="rounded-[10px] bg-placeholder" />
            <div className="rounded-[10px] bg-placeholder" />
            <div className="rounded-[10px] bg-placeholder" />
            <div className="rounded-[10px] bg-placeholder" />
          </div>

          {/* Description stack */}
          <div className="flex flex-col md:flex-row gap-[30px] md:gap-[60px] mt-[30px]">
            {/* Left: Problem + Role */}
            <div className="flex flex-col flex-1 gap-[30px]">
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-xl text-foreground">Problem:</h3>
                <div className="text-base text-foreground/50 leading-relaxed whitespace-pre-line">
                  {project.problem}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-xl text-foreground">Our Role / Services</h3>
                <div className="text-base text-foreground/50 leading-relaxed">
                  <p>{project.role}</p>
                  <p className="mt-3">We handled:</p>
                  <ul className="pl-5 mt-2">
                    {project.roleDetails.map((d, i) => (
                      <li key={i}>
                        <strong className="text-foreground">{d.label}:</strong> {d.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Services used + Client + Industry */}
            <div className="flex flex-col gap-6 flex-shrink-0">
              <div className="flex flex-col gap-3">
                <h3 className="font-medium text-base text-foreground">Services used:</h3>
                <div className="flex flex-col gap-2">
                  {project.serviceIndices.map((sIdx) => (
                    <span key={sIdx} className="text-primary text-sm" style={{ padding: "8px", borderRadius: "6px", backgroundColor: "hsl(var(--primary) / 0.05)" }}>
                      {SERVICES[sIdx].shortTitle}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-base text-foreground">Client:</h3>
                <p className="text-base text-foreground/50">{project.client}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-base text-foreground">Industry:</h3>
                <p className="text-base text-foreground/50">{project.industry}</p>
              </div>
            </div>
          </div>

          {/* Our Process */}
          <div ref={sectionRef} className="mt-20">
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-xl text-foreground">Our Process</h3>
              <p className="text-base text-foreground/50">
                A clear, collaborative approach; from insight to execution
              </p>
            </div>

            <div className="flex flex-col gap-[30px] mt-[30px]">
              <div className="flex flex-col md:flex-row gap-5">
                {PROCESS_STEPS.map((step, i) => {
                  const isActive = activeSteps[i];
                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col transition-all duration-500 rounded-[10px]"
                      style={{ padding: "20px", gap: "20px", backgroundColor: isActive ? "hsl(var(--surface))" : "transparent" }}
                    >
                      <div
                        className="flex items-center justify-center transition-colors duration-500"
                        style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--stroke) / 0.1)" }}
                      >
                        <img src={step.icon} alt={step.title} width={18} height={18} />
                      </div>
                      <div className="flex flex-col gap-4">
                        <h4 className="font-medium transition-colors duration-500 text-xl" style={{ color: isActive ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.25)" }}>
                          {step.title}
                        </h4>
                        <div className="h-[1.5px] w-full bg-stroke/10" />
                        <p className="transition-colors duration-500 text-base leading-relaxed" style={{ color: isActive ? "hsl(var(--foreground) / 0.5)" : "hsl(var(--foreground) / 0.25)" }}>
                          {step.paragraph}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full h-1 bg-stroke/5 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-primary rounded-sm" style={{ width: `${progress * 100}%`, transition: "width 0.05s linear" }} />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center mt-[120px] gap-5">
            <p className="font-medium text-center text-xl text-foreground">Ready to build something this clear?</p>
            <button
              onClick={open}
              className="font-medium text-[16px] md:text-[14px]"
              style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", border: "none", cursor: "pointer" }}
            >
              Start a project like this
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PortfolioDetail;
