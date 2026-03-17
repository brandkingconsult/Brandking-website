import { useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import brandkingLogo from "@/assets/brandking-logo.svg";
import { useContactPopup } from "@/contexts/ContactPopupContext";

const NAV_LINKS = [
  { label: "Home", sectionId: "hero", route: "/" },
  { label: "Services", sectionId: "solutions", route: "/" },
  { label: "Case Studies", sectionId: "portfolio", route: "/" },
  { label: "Team", sectionId: "team", route: "/" },
];

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  const targetY = element.getBoundingClientRect().top + window.pageYOffset - 80;
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const duration = 1000;
  let start: number | null = null;

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const animate = (ts: number) => {
    if (!start) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(progress));
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { open } = useContactPopup();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isHome = location.pathname === "/";
  const isServicesPage = location.pathname.startsWith("/services");
  const isPortfolioPage = location.pathname.startsWith("/portfolio");

  const getActiveLink = () => {
    if (isServicesPage) return "Services";
    if (isPortfolioPage) return "Case Studies";
    return "Home";
  };

  const activeLink = getActiveLink();

  const handleNavClick = (link: typeof NAV_LINKS[number]) => {
    setMobileMenuOpen(false);
    if (isHome) {
      if (link.label === "Home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        smoothScrollTo(link.sectionId);
      }
    } else {
      navigate("/");
      setTimeout(() => {
        if (link.label === "Home") {
          window.scrollTo({ top: 0 });
        } else {
          smoothScrollTo(link.sectionId);
        }
      }, 100);
    }
  };

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      <nav
        className="bg-navbar rounded-lg fixed z-50 border border-stroke/10 left-[20px] right-[20px] md:left-[40px] md:right-[40px]"
        style={{ padding: "8px 16px", top: "10px" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer gap-2" onClick={handleLogoClick}>
            <img
              src={brandkingLogo}
              alt="BrandKing Logo"
              width={19}
              height={30}
              className="dark:invert"
            />
            <span className="text-foreground font-semibold text-sm">
              BrandKing
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
                className="transition-colors rounded-md text-sm"
                style={{
                  padding: "8px",
                  fontWeight: link.label === activeLink ? 500 : undefined,
                  color: link.label === activeLink ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.5)",
                  backgroundColor: link.label === activeLink ? "hsl(var(--primary) / 0.05)" : undefined,
                }}
                onMouseEnter={(e) => {
                  if (link.label !== activeLink) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(var(--primary) / 0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (link.label !== activeLink) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 lg:gap-[30px]">
            <button
              className="hidden lg:block bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-[16px] lg:text-[14px]"
              style={{ borderRadius: "10px", padding: "12px 16px" }}
              onClick={open}
            >
              Contact Us
            </button>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex items-center justify-center transition-colors border border-stroke/10 bg-transparent"
              style={{ width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer" }}
            >
              {theme === "light" ? <Moon size={18} className="text-foreground/50" /> : <Sun size={18} className="text-foreground/50" />}
            </button>
            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center bg-transparent border-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ cursor: "pointer" }}
            >
              {mobileMenuOpen ? <X size={24} className="text-foreground" /> : <Menu size={24} className="text-foreground" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-surface" style={{ paddingTop: "70px" }}>
          <div className="flex flex-col p-5 gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
                className="rounded-[10px] text-base no-underline"
                style={{
                  padding: "16px",
                  fontWeight: link.label === activeLink ? 500 : undefined,
                  color: link.label === activeLink ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.5)",
                  backgroundColor: link.label === activeLink ? "hsl(var(--primary) / 0.05)" : undefined,
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              className="bg-primary text-primary-foreground font-medium mt-4 text-[16px] md:text-[14px]"
              style={{ borderRadius: "10px", padding: "12px 16px", border: "none", cursor: "pointer" }}
              onClick={() => { setMobileMenuOpen(false); open(); }}
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
