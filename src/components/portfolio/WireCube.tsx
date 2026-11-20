import { useEffect, useRef } from "react";
import { useFinePointer } from "./useFinePointer";

/** A small wireframe cube that turns with the pointer. No idle spinning. */
export function WireCube({ size = 88, className = "" }: { size?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  useEffect(() => {
    if (!fine) return;
    let raf = 0;
    const cur = { x: -24, y: 32 };
    const tgt = { x: -24, y: 32 };
    const onMove = (e: PointerEvent) => {
      tgt.y = 32 + (e.clientX / window.innerWidth - 0.5) * 90;
      tgt.x = -24 - (e.clientY / window.innerHeight - 0.5) * 60;
    };
    const tick = () => {
      cur.x += (tgt.x - cur.x) * 0.06;
      cur.y += (tgt.y - cur.y) * 0.06;
      if (ref.current) ref.current.style.transform = `rotateX(${cur.x}deg) rotateY(${cur.y}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [fine]);

  const half = size / 2;
  const faces = [
    `translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <div aria-hidden="true" className={`perspective ${className}`} style={{ width: size, height: size }}>
      <div
        ref={ref}
        className="preserve-3d relative h-full w-full"
        style={{ transform: "rotateX(-24deg) rotateY(32deg)" }}
      >
        {faces.map((t, i) => (
          <div
            key={i}
            className={`absolute inset-0 border ${i === 0 ? "border-primary" : "border-border-strong"}`}
            style={{ transform: t }}
          />
        ))}
      </div>
    </div>
  );
}
