import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Palette, Globe, Video, Share2 } from "lucide-react";
import { getServiceBySlug, SERVICES } from "@/data/services";
import { PROJECTS } from "@/data/projects";
import { useContactPopup } from "@/contexts/ContactPopupContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/Container";

const SERVICE_ICONS = [Palette, Globe, Video, Share2];

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { open } = useContactPopup();
  const service = getServiceBySlug(slug || "");
  const serviceIndex = SERVICES.findIndex((s) => s.slug === slug);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!service) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <Container className="pt-[120px] text-center">
          <h1 className="text-[40px] text-foreground">Service not found</h1>
          <button onClick={() => navigate("/")} className="mt-5 text-primary">← Back to home</button>
        </Container>
      </div>
    );
  }

  const Icon = service.icon;
  const relatedProjects = PROJECTS.filter((p) => p.serviceIndices.includes(serviceIndex));

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Container>
          {/* Back link */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-base text-foreground/50 bg-transparent border-none cursor-pointer mb-5"
          >
            <ChevronLeft size={16} /> Back to home
          </button>

          {/* Service header + icon */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div className="flex flex-col gap-4">
              <h1 className="font-medium text-[32px] md:text-[40px] text-foreground">{service.shortTitle}</h1>
              <p className="text-base text-foreground/50">{service.description}</p>
            </div>
            <div className="flex items-center justify-center flex-shrink-0 border border-stroke/10" style={{ width: "40px", height: "40px", borderRadius: "50%" }}>
              <Icon size={20} className="text-foreground/40" />
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
            {/* Left: Service details */}
            <div className="flex flex-col flex-1 gap-[30px]">
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-xl text-foreground">{service.includes.heading}</h3>
                <div className="text-base text-foreground/50 leading-relaxed">
                  <p>{service.includes.intro}</p>
                  <ul className="pl-5 mt-3">
                    {service.includes.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  <p className="mt-3">{service.includes.outro}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-xl text-foreground">Who this is for</h3>
                <div className="text-base text-foreground/50 leading-relaxed">
                  <ul className="pl-5">
                    {service.whoFor.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  <p className="mt-3">{service.whoFor.outro}</p>
                </div>
              </div>
            </div>

            {/* Right: Services Provided */}
            <div className="flex flex-col gap-4 flex-shrink-0">
              <h3 className="font-medium text-base text-foreground">Services Provided:</h3>
              <div className="flex flex-col gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-primary text-sm" style={{ padding: "8px", borderRadius: "6px", backgroundColor: "hsl(var(--primary) / 0.05)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sample projects */}
          <div className="mt-20">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-xl text-foreground">Sample projects</h3>
                <p className="text-base text-foreground/50">
                  A few projects done under {service.shortTitle.toLowerCase()}.
                </p>
              </div>
              <button
                onClick={() => navigate("/portfolio")}
                className="font-medium flex items-center self-start text-[16px] md:text-[14px]"
                style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", border: "none", cursor: "pointer", gap: "4px" }}
              >
                Explore more <ChevronRight size={16} />
              </button>
            </div>

            <div className="h-[1.5px] w-full bg-stroke/10 my-[30px]" />

            <div className="relative">
              <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none", paddingRight: "80px" }}>
                {relatedProjects.map((project, pi) => (
                  <div
                    key={pi}
                    onClick={() => navigate(`/portfolio/${project.slug}`)}
                    className="flex flex-col rounded-[10px] flex-shrink-0 cursor-pointer bg-surface"
                    style={{ width: "300px", minHeight: "350px", padding: "20px", gap: "20px" }}
                  >
                    <div className="rounded-[10px] h-[200px] w-full bg-placeholder" />
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium text-xl text-foreground">{project.title}</h3>
                      <p className="text-sm text-foreground/50 leading-relaxed">{project.description}</p>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      {project.serviceIndices.map((sIdx) => {
                        const SIcon = SERVICE_ICONS[sIdx];
                        return (
                          <div key={sIdx} className="flex items-center justify-center border border-stroke/10" style={{ width: "34px", height: "34px", borderRadius: "50%" }}>
                            <SIcon size={18} className="text-foreground/40" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="flex flex-col items-center mt-[120px] gap-5">
            <p className="font-medium text-center text-xl text-foreground">{service.ctaText}</p>
            <button
              onClick={open}
              className="font-medium text-[16px] md:text-[14px]"
              style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", border: "none", cursor: "pointer" }}
            >
              Start a conversation
            </button>
          </div>
        </Container>
        <Footer />
      </div>
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default ServiceDetail;
