import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  id,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  id: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal className="mb-6 flex items-center gap-4">
        <span className="font-mono text-xs text-primary">{index}</span>
        <span className="hairline w-12" />
        <span className="label-mono">{label}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 id={id} className="max-w-4xl text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
