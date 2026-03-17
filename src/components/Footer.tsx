import { useState } from "react";
import { ChevronDown } from "lucide-react";
import brandkingLogo from "@/assets/brandking-logo.svg";
import brandkingFooter from "@/assets/brandking-footer.svg";
import { Container } from "./Container";

const FOOTER_LINKS = {
  Company: ["FAQ", "Services", "Insights", "Team"],
  Services: ["Brand Strategy & Identity", "Website Design & Development", "Photography & Video Creation", "Social Media Management"],
  Resources: ["Our Blog", "Case Studies", "Brand Priorities", "How It Works"],
};

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="mt-[150px] w-full">
      <Container>
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between pb-10 border-b border-stroke/10 gap-10">
          <div className="flex flex-col gap-4 max-w-[300px]">
            <div className="flex items-center gap-2">
              <img
                src={brandkingLogo}
                alt="BrandKing Logo"
                width={19}
                height={30}
                className="dark:invert"
              />
              <span className="font-semibold text-base text-foreground">BrandKing</span>
            </div>
            <p className="text-base text-foreground/40 leading-relaxed">
              Clarity-led branding, design, and digital experiences for modern businesses.
            </p>
            <div className="flex gap-3 mt-2">
              {["𝕏", "Be", "in", "▶"].map((icon, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center border border-stroke/10 text-foreground/40"
                  style={{ width: "32px", height: "32px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex gap-[60px]">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading} className="flex flex-col gap-3">
                <h4 className="font-semibold text-base text-foreground">{heading}</h4>
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-base text-foreground/50 no-underline transition-colors duration-200 hover:text-foreground"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile accordion links */}
          <div className="flex flex-col lg:hidden gap-0">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading} className="border-b border-stroke/10">
                <button
                  className="flex items-center justify-between w-full py-4 bg-transparent border-none cursor-pointer"
                  onClick={() => toggleSection(heading)}
                >
                  <h4 className="font-semibold text-base text-foreground">{heading}</h4>
                  <ChevronDown
                    size={18}
                    className="text-foreground/50 transition-transform duration-200"
                    style={{ transform: openSection === heading ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openSection === heading ? "300px" : "0px", opacity: openSection === heading ? 1 : 0 }}
                >
                  <div className="flex flex-col gap-3 pb-4">
                    {links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="text-base text-foreground/50 no-underline transition-colors duration-200 hover:text-foreground pl-2"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-5 gap-4">
          <p className="text-xs text-foreground/30">© 2025 Brand King Inc. All rights reserved.</p>
          <div className="flex gap-5">
            {["Terms of Service", "Privacy Policy", "Cookies"].map((t) => (
              <a key={t} href="#" className="text-xs text-foreground/30 no-underline">{t}</a>
            ))}
          </div>
        </div>

        {/* BrandKing SVG */}
        <div className="overflow-hidden pb-5 w-full">
          <img
            src={brandkingFooter}
            alt="BrandKing"
            className="w-full h-auto dark:invert"
          />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
