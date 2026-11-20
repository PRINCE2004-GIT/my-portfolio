import { useRef, type PointerEvent } from "react";
import { useFinePointer } from "./useFinePointer";

const layers = [
  { key: "db", label: "MySQL", sub: "customers / bills / payments" },
  { key: "app", label: "Java", sub: "validation / billing / CRUD" },
  { key: "client", label: "Browser", sub: "HTML5 / CSS3 / JavaScript" },
];

function PlaneContent({ kind }: { kind: string }) {
  if (kind === "client") {
    return (
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="h-2 w-1/2 rounded-sm bg-primary" />
        <div className="h-5 rounded-sm border border-border-strong" />
        <div className="h-5 rounded-sm border border-border-strong" />
        <div className="mt-auto h-6 w-1/3 rounded-sm bg-primary/80" />
      </div>
    );
  }
  if (kind === "app") {
    return (
      <div className="grid h-full grid-cols-2 gap-2 p-4">
        {["Auth", "Bills", "Pay", "Admin"].map((m) => (
          <div key={m} className="grid place-items-center rounded-sm border border-border-strong font-mono text-[0.6rem] text-muted-foreground">
            {m}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-4">
      {[0, 1, 2, 3, 4].map((r) => (
        <div key={r} className="flex gap-2">
          <div className="h-2 w-1/4 rounded-sm bg-border-strong" />
          <div className="h-2 flex-1 rounded-sm bg-border" />
          <div className={`h-2 w-1/5 rounded-sm ${r === 1 ? "bg-primary" : "bg-border"}`} />
        </div>
      ))}
    </div>
  );
}

/** Abstract, decorative view of the project's three tiers. Expands on hover. */
export function SystemLayers() {
  const stage = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine || !stage.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    stage.current.style.transform = `rotateX(${58 - py * 12}deg) rotateZ(${-40 + px * 16}deg)`;
  };
  const reset = () => {
    if (stage.current) stage.current.style.transform = "rotateX(58deg) rotateZ(-40deg)";
  };

  return (
    <div
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="group/layers perspective relative grid h-[340px] place-items-center [--gap:56px] hover:[--gap:88px] sm:h-[420px]"
    >
      <div
        ref={stage}
        className="preserve-3d relative h-44 w-44 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-56 sm:w-56"
        style={{ transform: "rotateX(58deg) rotateZ(-40deg)" }}
      >
        {layers.map((l, i) => (
          <div
            key={l.key}
            className={`absolute inset-0 rounded-md border bg-surface-2 shadow-[var(--shadow-lift)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              l.key === "client" ? "border-primary" : "border-border-strong"
            }`}
            style={{ transform: `translateZ(calc(var(--gap) * ${i - 1}))` }}
          >
            <PlaneContent kind={l.key} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const layerLegend = layers.slice().reverse();
