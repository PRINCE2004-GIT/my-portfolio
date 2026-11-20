const words = ["Java", "JavaScript", "MySQL", "HTML5", "CSS3", "SQL", "OOP", "Data Structures", "DBMS", "Git"];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-border py-6 md:py-8">
      <div className="anim-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-5xl font-bold tracking-tight md:text-7xl">
            <span className={i % 3 === 0 ? "text-foreground" : "text-outline"}>{w}</span>
            <span className="h-2 w-2 rotate-45 bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
