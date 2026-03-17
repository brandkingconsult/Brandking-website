import { useContactPopup } from "@/contexts/ContactPopupContext";

const WhyChooseUs = () => {
  const { open } = useContactPopup();

  return (
    <section className="mt-[150px] py-[80px] px-5 md:px-[40px] w-full">
      <div className="flex flex-col items-center mx-auto gap-[30px] max-w-[1400px]">
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

        {/* Bento Grid - mobile: stacked, desktop: 3x2 */}
        <div className="flex flex-col md:grid w-full gap-5 max-w-[1200px]" style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", height: "auto" }}>
          {/* Box 1 - Strategy First */}
          <div className="rounded-[10px] flex flex-col p-5 gap-[30px] bg-surface border border-stroke/10 md:h-auto h-[300px]">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-xl text-foreground">Strategy First</h3>
              <p className="text-base text-foreground/50">Clarity before creativity, always</p>
            </div>
            <div className="rounded-[10px] flex-1 bg-placeholder" />
          </div>

          {/* Box 2 - True Partnership */}
          <div className="rounded-[10px] flex flex-col p-5 gap-[30px] bg-surface border border-stroke/10 md:h-auto h-[300px]">
            <div className="rounded-[10px] flex-1 bg-placeholder" />
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-xl text-foreground">True Partnership</h3>
              <p className="text-base text-foreground/50">We build with you, not alone</p>
            </div>
          </div>

          {/* Box 3 - Brand Consistency (spans 2 rows on desktop) */}
          <div className="rounded-[10px] flex flex-col p-5 gap-[30px] bg-surface border border-stroke/10 md:h-auto h-[300px]" style={{ gridRow: "1 / 3" }}>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-xl text-foreground">Brand Consistency</h3>
              <p className="text-base text-foreground/50">One voice across every platform</p>
            </div>
            <div className="rounded-[10px] flex-1 bg-placeholder" />
          </div>

          {/* Box 4 - Built to Perform (spans 2 columns on desktop) */}
          <div className="rounded-[10px] flex flex-col md:flex-row items-start p-5 gap-[30px] bg-surface border border-stroke/10" style={{ gridColumn: "1 / 3" }}>
            <div className="flex flex-col gap-5 flex-shrink-0">
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
            <div className="rounded-[10px] flex-1 w-full md:h-full h-[150px] bg-placeholder" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
