import { experience, education } from "@/content/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        id="experience-title"
        index="04"
        label="Experience"
        title={
          <>
            Internship work <span className="text-muted-foreground">and the education behind it.</span>
          </>
        }
      />

      <Reveal as="article" className="grid grid-cols-1 gap-8 border-t border-border-strong pt-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <p className="font-mono text-sm text-primary">{experience.duration}</p>
          <p className="label-mono mt-2">Internship</p>
        </div>
        <div className="lg:col-span-4">
          <h3 className="text-3xl font-semibold leading-tight md:text-4xl">{experience.role}</h3>
          <p className="mt-3 text-muted-foreground">{experience.organization}</p>
        </div>
        <ul className="lg:col-span-5">
          {experience.points.map((pt, i) => (
            <li key={pt} className="flex gap-4 border-b border-border py-4 first:pt-0 text-muted-foreground">
              <span className="pt-0.5 font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-foreground/90">{pt}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-28">
        <Reveal className="mb-10 flex items-center gap-4">
          <h3 className="font-display text-2xl font-semibold md:text-3xl">Education</h3>
          <span className="hairline flex-1" />
        </Reveal>
        <ol className="relative border-l border-border pl-8 md:pl-12">
          {education.map((e, i) => (
            <Reveal as="li" key={e.level} delay={i * 80} className="relative pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[calc(2rem+5px)] top-2 h-2.5 w-2.5 rotate-45 md:-left-[calc(3rem+5px)] ${
                  i === 0 ? "bg-primary" : "border border-border-strong bg-background"
                }`}
              />
              <div className="grid grid-cols-1 gap-2 md:grid-cols-12 md:gap-8">
                <p className="font-mono text-sm text-muted-foreground md:col-span-2">{e.year}</p>
                <div className="md:col-span-7">
                  <h4 className="text-xl font-semibold md:text-2xl">{e.level}</h4>
                  <p className="mt-1 text-muted-foreground">{e.school}</p>
                </div>
                <p className="font-mono text-sm text-foreground md:col-span-3 md:text-right">{e.score}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
