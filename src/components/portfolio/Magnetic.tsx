import { useRef, type ReactNode, type PointerEvent } from "react";
import { useFinePointer } from "./useFinePointer";

/** Pulls its child slightly toward the pointer on desktop. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      {children}
    </span>
  );
}
