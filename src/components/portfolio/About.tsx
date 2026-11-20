import square from "@/assets/prince-kumar-square.webp";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const facts = [
  { k: "Based in", v: "Durgapur, West Bengal" },
  { k: "Studying", v: "B.Tech, Computer Science Engineering" },
  { k: "Graduating", v: "2027" },
  { k: "CGPA", v: "7.18" },
  { k: "Languages", v: "English, Hindi" },
  { k: "Looking for", v: "Java Developer, Java Full Stack or Software Engineer roles" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        id="about-title"
        index="01"
        label="About"
        title={
          <>
            Frontend, backend and the database <span className="text-muted-foreground">in between.</span>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="group relative max-w-xs overflow-hidden rounded-md border border-border lg:max-w-none">
            <img
              src={square}
              alt="Prince Kumar, Computer Science Engineering student"
              width={720}
              height={720}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
          </div>
          <p className="label-mono mt-4">Hover for colour</p>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
              I'm Prince Kumar, a Computer Science Engineering student focused on Java Full Stack Development. I enjoy
              developing practical web applications and working across frontend interfaces, backend logic and database
              integration.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 text-base leading-relaxed text-muted-foreground md:grid-cols-2 md:gap-10">
            <Reveal delay={80}>
              <p>
                I'm pursuing a B.Tech at Bengal College of Engineering &amp; Technology in Durgapur, with graduation
                expected in 2027. My studies have given me a foundation in Object-Oriented Programming, Data Structures
                and Algorithms, DBMS and Operating Systems.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p>
                Most of my hands-on work is in Java, HTML5, CSS3, JavaScript and MySQL: building forms with validation,
                connecting pages to backend logic, writing CRUD operations and debugging each flow until it works end
                to end.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                I approach a problem by breaking it into smaller parts, picking data structures that fit and testing
                each step before moving on. I follow basic Software Development Life Cycle practices so the work stays
                planned, tested and easy to revisit.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p>
                I'm now looking for an entry-level role as a Java Developer, Java Full Stack Developer or Software
                Engineer, where I can contribute to real products and keep learning from experienced engineers.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <dl className="mt-14 grid grid-cols-1 border-t border-border sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.k} className="flex flex-col gap-1 border-b border-border py-4 sm:pr-6">
                  <dt className="label-mono">{f.k}</dt>
                  <dd className="text-foreground">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
