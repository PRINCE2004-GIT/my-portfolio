import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { navItems } from "@/content/profile";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Wordmark() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="Prince Kumar, back to top">
      <span className="grid h-9 w-9 place-items-center rounded-md border border-border-strong font-display text-sm font-bold text-primary transition-colors group-hover:border-primary">
        PK
      </span>
      <span className="hidden font-display text-[0.95rem] font-semibold tracking-tight sm:inline">
        Prince Kumar
      </span>
    </a>
  );
}

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "anim-nav fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
        scrolled || open ? "border-b border-border bg-background/90 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 md:h-20 md:px-10">
        <Wordmark />

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors",
                  active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-500",
                    active === item.id ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild variant="line" size="sm" className="hidden sm:inline-flex">
            <a href={site.resumePath} download={site.resumeFileName}>
              <Download /> Resume
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="!size-5" /> : <Menu className="!size-5" />}
          </Button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-5 pb-10 pt-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {navItems.map((item, i) => (
            <li key={item.id} className="border-b border-border">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-baseline justify-between py-5 font-display text-3xl font-semibold",
                  active === item.id ? "text-primary" : "text-foreground",
                )}
              >
                {item.label}
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <Button asChild variant="accent" size="lg" className="mt-8 w-full">
          <a href={site.resumePath} download={site.resumeFileName} onClick={() => setOpen(false)}>
            <Download /> Download Resume
          </a>
        </Button>
      </div>
    </header>
  );
}
