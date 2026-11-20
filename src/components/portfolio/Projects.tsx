import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import { featuredProject as p } from "@/content/profile";
import { hasLink, site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SystemLayers, layerLegend } from "./SystemLayers";

function FeatureList({ title, items, index }: { title: string; items: string[]; index: string }) {
  return (
    <div>
      <h4 className="mb-4 flex items-center gap-3 font-display text-lg font-semibold">
        <span className="font-mono text-xs text-primary">{index}</span>
        {title}
      </h4>
      <ul className="border-t border-border">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-3 border-b border-border py-3 text-sm text-muted-foreground">
            <span className="h-1 w-1 shrink-0 bg-primary" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Projects() {
  const [open, setOpen] = useState(false);
  const hasSource = hasLink(site.projectSourceUrl);

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        id="projects-title"
        index="03"
        label="Projects"
        title={
          <>
            Featured project, <span className="text-muted-foreground">from login screen to database table.</span>
          </>
        }
      />

      <article aria-labelledby="project-title" className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            data-cursor="View Project"
            aria-label="Open the case study for the Online Electricity Bill Payment System"
            className="block w-full overflow-hidden rounded-md border border-border bg-surface text-left"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="label-mono">Fig. 02 / System layers</span>
              <span className="label-mono hidden sm:inline">Hover to expand</span><span className="label-mono sm:hidden">Tap for details</span>
            </div>
            <SystemLayers />
            <ul className="grid grid-cols-3 border-t border-border">
              {layerLegend.map((l, i) => (
                <li key={l.key} className="border-r border-border p-4 last:border-r-0">
                  <span className="font-mono text-[0.65rem] text-primary">0{i + 1}</span>
                  <p className="mt-1 font-display text-sm font-semibold">{l.label}</p>
                  <p className="mt-1 hidden text-xs text-muted-foreground sm:block">{l.sub}</p>
                </li>
              ))}
            </ul>
          </button>
          <p className="label-mono mt-3 normal-case tracking-normal">
            Abstract diagram of the architecture. Not a product screenshot.
          </p>
        </Reveal>

        <div className="lg:col-span-6 lg:pl-4">
          <Reveal>
            <span className="label-mono">Featured / 01</span>
            <h3 id="project-title" className="mt-4 text-4xl font-bold leading-[0.98] tracking-tight sm:text-5xl xl:text-6xl">
              {p.title}
            </h3>
          </Reveal>
          <Reveal delay={80}>
            <dl className="mt-8 grid grid-cols-1 gap-4 border-y border-border py-5 sm:grid-cols-2">
              <div>
                <dt className="label-mono">Institution</dt>
                <dd className="mt-1 text-sm">{p.institution}</dd>
              </div>
              <div>
                <dt className="label-mono">Duration</dt>
                <dd className="mt-1 text-sm">{p.duration}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.summary}</p>
            <ul aria-label="Technology stack" className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className="rounded-sm border border-border-strong px-2.5 py-1 font-mono text-xs text-foreground">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200}>
            <ol aria-label="Customer flow" className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
              {p.flow.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary">{i + 1}</span>
                  <span>{step}</span>
                  {i < p.flow.length - 1 && <span aria-hidden="true" className="h-px w-5 bg-border-strong" />}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={260} className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              variant="accent"
              size="lg"
              aria-expanded={open}
              aria-controls="case-study"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Hide case study" : "Read case study"}
              <ChevronDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </Button>
            {hasSource ? (
              <Button asChild variant="line" size="lg">
                <a href={site.projectSourceUrl} target="_blank" rel="noopener noreferrer">
                  <Github /> Source code <ArrowUpRight />
                </a>
              </Button>
            ) : (
              <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <Github className="h-4 w-4" /> Source link to be added
              </span>
            )}
          </Reveal>
        </div>
      </article>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="case-study"
            key="case"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-16 rounded-md border border-border bg-surface p-6 md:p-10">
              <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="label-mono">Case study</span>
                  <h4 className="mt-3 max-w-2xl font-display text-2xl font-semibold md:text-3xl">
                    Two roles, one database: customers pay bills while admins manage the records behind them.
                  </h4>
                </div>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Built with Java on the server, HTML5, CSS3 and JavaScript in the browser, and MySQL for persistent
                  records.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                <FeatureList index="A" title="Customer module" items={p.customer} />
                <FeatureList index="B" title="Admin module" items={p.admin} />
                <FeatureList index="C" title="Technical implementation" items={p.technical} />
              </div>
              <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
                A public demo and screenshots are not available for this project yet.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
