import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed z-50 flex items-center justify-center bg-primary text-primary-foreground border-none"
      style={{ bottom: "30px", right: "30px", width: "48px", height: "48px", borderRadius: "50%", cursor: "pointer", boxShadow: "0 4px 12px hsl(var(--stroke) / 0.15)" }}
    >
      <ChevronUp size={22} />
    </button>
  );
};

export default BackToTop;
