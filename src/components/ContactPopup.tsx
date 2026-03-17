import { useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";
import { useContactPopup } from "@/contexts/ContactPopupContext";

const SERVICE_OPTIONS = [
  "Brand clarity",
  "Branding & Identity",
  "Website Design & Development",
  "Video Creation & Editing",
  "Social Media Management",
  "Not sure yet",
];

const MAX_MESSAGE_LENGTH = 280;

const CALENDLY_EMBED_URL = "https://calendly.com/brandkingconsult";
const CALENDLY_FALLBACK_URL = "https://calendly.com/brandkingconsult/brand-discovery-call-30-minutes";

const ContactPopup = () => {
  const { isOpen, close } = useContactPopup();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const calendlyRef = useRef<HTMLDivElement>(null);

  const allFilled = fullname.trim() !== "" && email.trim() !== "" && brand.trim() !== "" && selectedServices.length > 0 && message.trim() !== "";

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
      setCalendlyLoaded(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Load Calendly script after submission
  useEffect(() => {
    if (!submitted) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        if (calendlyRef.current && calendlyRef.current.querySelector("iframe")) {
          setCalendlyLoaded(true);
        } else {
          setCalendlyLoaded(false);
        }
      }, 3000);
    };
    script.onerror = () => setCalendlyLoaded(false);
    document.head.appendChild(script);
    return () => {
      try { document.head.removeChild(script); } catch { }
    };
  }, [submitted]);

  const handleSubmit = () => {
    if (!allFilled) return;
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "hsl(var(--stroke) / 0.1)", backdropFilter: "blur(100px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        className="flex flex-col relative bg-surface"
        style={{ width: "545px", maxWidth: "calc(100vw - 40px)", padding: "30px", gap: "16px", borderRadius: "10px", maxHeight: "90vh", overflowY: "auto" }}
      >
        <button
          onClick={close}
          className="absolute flex items-center justify-center border border-stroke/10 bg-transparent"
          style={{ top: "16px", right: "16px", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer" }}
        >
          <X size={16} className="text-foreground" />
        </button>

        {!submitted ? (
          <>
            <h2 className="font-medium text-[32px] md:text-[40px] text-foreground">Let's Talk</h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-foreground/50">Full name</label>
              <input value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Fullname" className="w-full bg-transparent border border-stroke/10 rounded-[10px] text-foreground text-sm outline-none" style={{ padding: "12px 16px" }} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-foreground/50">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-transparent border border-stroke/10 rounded-[10px] text-foreground text-sm outline-none" style={{ padding: "12px 16px" }} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-foreground/50">Brand / Company Name</label>
              <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Your brand or company's name" className="w-full bg-transparent border border-stroke/10 rounded-[10px] text-foreground text-sm outline-none" style={{ padding: "12px 16px" }} />
            </div>

            <div className="flex flex-col gap-1.5" ref={dropdownRef}>
              <label className="text-[13px] text-foreground/50">What service are you looking for?</label>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer w-full bg-transparent border border-stroke/10 rounded-[10px] text-sm select-none"
                style={{ padding: "12px 16px", color: selectedServices.length > 0 ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.4)" }}
              >
                {selectedServices.length > 0 ? selectedServices.join(", ") : "Select services"}
              </div>
              {dropdownOpen && (
                <div className="flex flex-col rounded-[10px] border border-stroke/10 bg-surface" style={{ padding: "12px 16px", gap: "8px" }}>
                  {SERVICE_OPTIONS.map((option) => {
                    const isSelected = selectedServices.includes(option);
                    return (
                      <div key={option} onClick={() => toggleService(option)} className="flex items-center cursor-pointer" style={{ gap: "10px", padding: "6px 0" }}>
                        <div
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: "18px", height: "18px", borderRadius: "4px",
                            border: isSelected ? "none" : "1.5px solid hsl(var(--stroke) / 0.2)",
                            backgroundColor: isSelected ? "hsl(var(--primary))" : "transparent",
                          }}
                        >
                          {isSelected && <Check size={12} color="hsl(0 0% 100%)" />}
                        </div>
                        <span className="text-sm text-foreground">{option}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-foreground/50">Brief Message</label>
              <textarea
                value={message}
                onChange={(e) => { if (e.target.value.length <= MAX_MESSAGE_LENGTH) setMessage(e.target.value); }}
                placeholder="Write a message... Brief overview only — we'll discuss details together."
                className="w-full bg-transparent border border-stroke/10 rounded-[10px] text-foreground text-sm outline-none resize-none"
                style={{ padding: "12px 16px", height: "200px" }}
              />
              <p className="text-xs text-foreground/30 text-right">
                {message.length}/{MAX_MESSAGE_LENGTH}
              </p>
            </div>

            <div style={{ marginTop: "14px" }}>
              <button
                onClick={handleSubmit}
                className="font-medium w-full text-[16px] md:text-[14px]"
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  backgroundColor: allFilled ? "hsl(var(--primary))" : "#B7B7B7",
                  color: "hsl(var(--primary-foreground))",
                  border: "none",
                  cursor: allFilled ? "pointer" : "not-allowed",
                  transition: "background-color 0.3s ease",
                }}
              >
                Start the Conversation
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 py-4">
            {/* Calendly embed attempt */}
            <div
              ref={calendlyRef}
              className="calendly-inline-widget w-full"
              data-url={CALENDLY_EMBED_URL}
              style={{ minWidth: "320px", height: "700px" }}
            />
            {/* Fallback if embed doesn't load */}
            {!calendlyLoaded && (
              <div className="flex flex-col items-center gap-4 text-center mt-4">
                <p className="text-foreground text-lg font-medium">Your message has been received.</p>
                <p className="text-foreground/50 text-base">Let's schedule a time to discuss your brand.</p>
                <a
                  href={CALENDLY_FALLBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium no-underline"
                  style={{ padding: "14px 24px", borderRadius: "10px", backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", fontSize: "14px" }}
                >
                  Schedule Strategy Session
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPopup;
