import { useContactPopup } from "@/contexts/ContactPopupContext";
import { Container } from "./Container";

const WhyChooseUs = () => {
  const { open } = useContactPopup();

  return (
    <section className="mt-[150px] py-[80px] w-full">
      <Container className="flex flex-col items-center gap-[30px]">
        {/* Top stack */}
        <div className="flex flex-col items-center gap-5">
          <div className="px-5 py-2 border-2 border-stroke/10 rounded-full text-foreground/30 text-base">
            Your Benefits
          </div>
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-medium text-center text-[32px] md:text-[40px] text-foreground">
              Why brands choose Brand King
            </h2>
            <p className="text-center text-base text-foreground/50 max-w-[600px]">
              Launch faster. Stay flexible. Scale without limits.
            </p>
          </div>
        </div>

        {/* Bento Grid - mobile: stacked, desktop: accurate sizing */}
        <div className="flex flex-col md:grid w-full gap-5 mx-auto max-w-[1200px]" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {/* Box 1 - Strategy First */}
          <div className="rounded-[10px] flex flex-col p-5 gap-[20px] bg-surface border border-stroke/10 md:h-[250px] h-auto">
            <div className="flex flex-col gap-2 flex-shrink-0">
              <h3 className="font-medium text-xl text-foreground">Strategy First</h3>
              <p className="text-base text-foreground/50">Clarity before creativity, always</p>
            </div>
            <div className="rounded-[10px] flex-1 bg-placeholder w-full h-[150px] md:h-full relative">
               <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Strategy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>

          {/* Box 2 - True Partnership */}
          <div className="rounded-[10px] flex flex-col p-5 gap-[20px] bg-surface border border-stroke/10 md:h-[250px] h-auto">
             <div className="rounded-[10px] bg-placeholder flex-1 w-full h-[150px] md:h-full relative order-last md:order-first">
               <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Partnership" className="absolute inset-0 w-full h-full object-cover" />
             </div>
            <div className="flex flex-col gap-2 flex-shrink-0 order-first md:order-last">
              <h3 className="font-medium text-xl text-foreground">True Partnership</h3>
              <p className="text-base text-foreground/50">We build with you, not alone</p>
            </div>
          </div>

          {/* Box 3 - Brand Consistency (spans 2 rows on desktop) */}
          <div className="rounded-[10px] flex flex-col p-5 gap-[20px] bg-surface border border-stroke/10 md:h-[520px] h-auto" style={{ gridRow: "1 / 3" }}>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <h3 className="font-medium text-xl text-foreground">Brand Consistency</h3>
              <p className="text-base text-foreground/50">One voice across every platform</p>
            </div>
            <div className="rounded-[10px] bg-placeholder flex-1 w-full h-[250px] md:h-full relative">
               <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" alt="Consistency" className="absolute inset-0 w-full h-full object-cover left-0 top-0" />
            </div>
          </div>

          {/* Box 4 - Built to Perform (spans 2 columns on desktop) */}
          <div className="rounded-[10px] flex flex-col md:flex-row items-center p-5 gap-[30px] bg-surface border border-stroke/10 md:h-[250px] h-auto" style={{ gridColumn: "1 / 3" }}>
            <div className="flex flex-col gap-5 flex-shrink-0 md:w-[250px] lg:w-[300px]">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-xl text-foreground">Built to Perform</h3>
                <p className="text-base text-foreground/50">Designed for trust and growth</p>
              </div>
              <button
                onClick={open}
                className="font-medium w-fit text-[16px] md:text-[14px]"
                style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "hsl(var(--foreground))", color: "hsl(var(--background))", border: "none", cursor: "pointer" }}
              >
                Start free
              </button>
            </div>
            <div className="rounded-[10px] w-full flex-1 md:h-full h-[150px] bg-placeholder relative">
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="Performance" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
