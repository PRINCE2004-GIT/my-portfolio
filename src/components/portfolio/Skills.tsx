import { useState } from "react";
import { skillCategories } from "@/content/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

function SkillList({ items }: { items: { name: string; context?: string }[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((s) => (
        <li
          key={s.name}
          className="group flex items-baseline justify-between gap-4 py-4 transition-colors md:py-5"
        >
          <span className="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 group-hover:text-primary md:text-4xl">
            {s.name}
          </span>
          {s.context && (
            <span className="shrink-0 text-right font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              {s.context}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Skills() {
  const first = skillCategories[0]!;
  const [active, setActive] = useState(first.id);
  const current = skillCategories.find((c) => c.id === active) ?? first;

  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        id="skills-title"
        index="02"
        label="Skills"
        title={
          <>
            The tools I build with, <span className="text-muted-foreground">grouped by where they sit in the stack.</span>
          </>
        }
      />

      <Reveal>
        <p className="label-mono mb-10 max-w-xl normal-case tracking-normal">
          Labels on the right show where a skill was applied: the AICTE-EduSkills internship or the electricity bill
          payment project.
        </p>
      </Reveal>

      {/* Desktop: interactive category index */}
      <Reveal className="hidden grid-cols-12 gap-10 lg:grid">
        <div role="tablist" aria-label="Skill categories" aria-orientation="vertical" className="col-span-4 flex flex-col">
          {skillCategories.map((c, i) => {
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={selected}
                aria-controls="skills-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(c.id)}
                onMouseEnter={() => setActive(c.id)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const dir = e.key === "ArrowDown" ? 1 : -1;
                    const next = skillCategories[(i + dir + skillCategories.length) % skillCategories.length] ?? first;
                    setActive(next.id);
                    document.getElementById(`tab-${next.id}`)?.focus();
                  }
                }}
                className={cn(
                  "group flex items-center gap-5 border-b border-border py-5 text-left transition-colors",
                  selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className={cn("font-mono text-xs", selected ? "text-primary" : "text-faint")}>0{i + 1}</span>
                <span className="font-display text-xl font-medium">{c.title}</span>
                <span
                  className={cn(
                    "ml-auto h-px bg-primary transition-all duration-500",
                    selected ? "w-10" : "w-0",
                  )}
                />
              </button>
            );
          })}
        </div>

        <div
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="col-span-7 col-start-6"
        >
          <div key={current.id} className="anim-fade">
            <p className="mb-8 max-w-lg text-muted-foreground">{current.note}</p>
            <SkillList items={current.items} />
          </div>
        </div>
      </Reveal>

      {/* Mobile and tablet: every category listed */}
      <div className="flex flex-col gap-14 lg:hidden">
        {skillCategories.map((c, i) => (
          <Reveal key={c.id}>
            <h3 className="mb-2 flex items-center gap-3 font-display text-lg font-medium">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              {c.title}
            </h3>
            <p className="mb-5 text-sm text-muted-foreground">{c.note}</p>
            <SkillList items={c.items} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
