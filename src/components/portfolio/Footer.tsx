import { ArrowUp } from "lucide-react";
import { site } from "@/config/site";
import { navItems } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10">
        <p aria-hidden="true" className="select-none font-display text-[clamp(3rem,15vw,13rem)] font-bold leading-[0.85] tracking-[-0.05em] text-outline">
          Prince Kumar
        </p>
        <div className="mt-10 flex flex-col gap-6 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            {site.name}, {site.role}. {site.location}.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-sm text-muted-foreground hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#home" className="label-mono flex items-center gap-2 hover:text-foreground">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
