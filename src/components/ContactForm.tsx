import { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";

const SERVICE_OPTIONS = [
  "Brand clarity",
  "Branding & Identity",
  "Website Design & Development",
  "Video Creation & Editing",
  "Social Media Management",
  "Not sure yet",
];

const MAX_MESSAGE_LENGTH = 280;

const ContactForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const inputStyle: React.CSSProperties = {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid rgba(0,0,0,0.1)",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "transparent",
    width: "100%",
  };

  return (
    <section style={{ marginTop: "150px", padding: "80px 40px", width: "100%" }}>
      <div className="flex mx-auto" style={{ gap: "30px", maxWidth: "1400px" }}>
        {/* Left text */}
        <div className="flex flex-col justify-center" style={{ flex: 1 }}>
          <div className="flex flex-col" style={{ gap: "20px" }}>
            <div style={{ padding: "8px 20px", border: "2px solid #E8E8E8", borderRadius: "9999px", color: "#E8E8E8", fontSize: "16px", width: "fit-content" }}>
              Let's Talk
            </div>
            <div className="flex flex-col" style={{ gap: "16px" }}>
              <h2 className="font-medium" style={{ fontSize: "40px", color: "hsl(0 0% 0%)", lineHeight: 1.1 }}>
                Let's start with a conversation
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(0,0,0,0.5)", lineHeight: 1.6 }}>
                Whether you're building from scratch or ready to refine an existing brand, we'll help you clarify your direction and make it actionable.
              </p>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div
          className="flex flex-col"
          style={{ width: "545px", padding: "30px", gap: "16px", backgroundColor: "#FFFFFF", borderRadius: "10px", flexShrink: 0 }}
        >
          <div className="flex flex-col" style={{ gap: "6px" }}>
            <label style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)" }}>Full name</label>
            <input value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Fullname" style={inputStyle} />
          </div>

          <div className="flex flex-col" style={{ gap: "6px" }}>
            <label style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" style={inputStyle} />
          </div>

          <div className="flex flex-col" style={{ gap: "6px" }}>
            <label style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)" }}>Brand / Company Name</label>
            <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Your brand or company's name" style={inputStyle} />
          </div>

          {/* Custom dropdown */}
          <div className="flex flex-col" style={{ gap: "6px" }} ref={dropdownRef}>
            <label style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)" }}>What service are you looking for?</label>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="cursor-pointer"
              style={{
                ...inputStyle,
                color: selectedServices.length > 0 ? "hsl(0 0% 0%)" : "rgba(0,0,0,0.4)",
                userSelect: "none",
              }}
            >
              {selectedServices.length > 0 ? selectedServices.join(", ") : "Select services"}
            </div>
            {dropdownOpen && (
              <div
                className="flex flex-col rounded-[10px]"
                style={{ padding: "12px 16px", gap: "8px", border: "1.5px solid rgba(0,0,0,0.1)", backgroundColor: "#FFFFFF" }}
              >
                {SERVICE_OPTIONS.map((option) => {
                  const isSelected = selectedServices.includes(option);
                  return (
                    <div
                      key={option}
                      onClick={() => toggleService(option)}
                      className="flex items-center cursor-pointer"
                      style={{ gap: "10px", padding: "6px 0" }}
                    >
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                          border: isSelected ? "none" : "1.5px solid rgba(0,0,0,0.2)",
                          backgroundColor: isSelected ? "hsl(253 67% 53%)" : "transparent",
                        }}
                      >
                        {isSelected && <Check size={12} color="#FFFFFF" />}
                      </div>
                      <span style={{ fontSize: "14px", color: "hsl(0 0% 0%)" }}>{option}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col" style={{ gap: "6px" }}>
            <label style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)" }}>Brief Message</label>
            <textarea
              value={message}
              onChange={(e) => { if (e.target.value.length <= MAX_MESSAGE_LENGTH) setMessage(e.target.value); }}
              placeholder="Write a message... Brief overview only — we'll discuss details together."
              style={{ ...inputStyle, height: "200px", resize: "none" }}
            />
            <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.3)", textAlign: "right" }}>
              {message.length}/{MAX_MESSAGE_LENGTH}
            </p>
          </div>

          {/* Submit */}
          <div style={{ marginTop: "14px" }}>
            <button
              className="font-medium w-full text-[16px] md:text-[14px]"
              style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "hsl(253 67% 53%)", color: "#FFFFFF", border: "none", cursor: "pointer" }}
            >
              Start the Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
