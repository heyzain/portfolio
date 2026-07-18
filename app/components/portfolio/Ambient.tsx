// Ambient backdrop borrowed from the cinematic footer: a radially-masked grid
// plus a slow-breathing aurora glow. Drop it as the first child of a
// `relative` section and keep the section's real content at `relative z-10`.
export function Ambient({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={"pointer-events-none absolute inset-0 z-0 overflow-hidden " + className}>
      <div className="ambient-grid absolute inset-0 opacity-70" />
      <div className="ambient-aurora animate-breathe absolute left-1/2 top-1/2 h-[70vh] w-[75vw] rounded-full blur-[90px]" />
    </div>
  );
}
