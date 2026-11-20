import { useEffect, useState } from "react";

/** True on devices with a precise pointer and no reduced-motion preference. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setFine(pointer.matches && !motion.matches);
    update();
    pointer.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      pointer.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);
  return fine;
}
