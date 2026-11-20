import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "./useFinePointer";

const INTERACTIVE = "a, button, [role='tab'], [data-cursor], summary, label";

/** Desktop-only cursor: a precise dot plus a trailing ring that grows over interactive elements. */
export function Cursor() {
  const fine = useFinePointer();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    const onOver = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.(INTERACTIVE) as HTMLElement | null;
      setActive(Boolean(el));
      setLabel(el?.dataset["cursor"] ?? "");
    };
    const onLeave = () => setVisible(false);

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fine]);

  if (!fine) return null;

  const size = label ? 96 : active ? 52 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <div ref={ring} className="absolute left-0 top-0 will-change-transform">
        <div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: size,
            height: size,
            borderColor: active ? "var(--color-primary)" : "var(--color-border-strong)",
            backgroundColor: label ? "var(--color-primary)" : "transparent",
          }}
        >
          {label && (
            <span className="font-mono text-[0.62rem] font-medium uppercase tracking-wider text-primary-foreground">
              {label}
            </span>
          )}
        </div>
      </div>
      <div ref={dot} className="absolute left-0 top-0 will-change-transform">
        <div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-opacity"
          style={{ opacity: label ? 0 : 1 }}
        />
      </div>
    </div>
  );
}
