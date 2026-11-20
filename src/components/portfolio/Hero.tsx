import { useRef, type PointerEvent } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDownRight, Download } from "lucide-react";
import portrait from "@/assets/prince-kumar-portrait.webp";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./Magnetic";
import { WireCube } from "./WireCube";
import { useFinePointer } from "./useFinePointer";

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span className="anim-mask" style={{ animationDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "12%"]);
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? ["0px", "0px"] : ["0px", "-60px"]);

  const onTilt = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine || !tilt.current) return;
    const r = tilt.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tilt.current.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
  };
  const resetTilt = () => {
    if (tilt.current) tilt.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <section
      id="home"
      ref={section}
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-24 md:pt-32"
    >
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 pb-20 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        <div className="lg:col-span-7 lg:pt-6">
          <div className="anim-fade mb-6 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ animationDelay: "150ms" }}>
            <span className="flex items-center gap-2 font-mono text-xs text-foreground">
              <span className="anim-pulse-dot h-2 w-2 rounded-full bg-primary" />
              Open to entry-level roles
            </span>
            <span className="label-mono">Durgapur, West Bengal, India</span>
          </div>

          <h1 id="hero-title" className="font-display font-bold leading-[0.88] tracking-[-0.045em]">
            <span className="sr-only">Prince Kumar, Java Full Stack Developer</span>
            <span aria-hidden="true" className="block text-[clamp(3.6rem,17vw,8.5rem)]">
              <Line delay={250}>Prince</Line>
              <Line delay={350}>
                Kumar<span className="text-primary">.</span>
              </Line>
            </span>
          </h1>

          <p
            className="anim-fade mt-8 max-w-2xl font-display text-2xl font-medium leading-[1.2] text-foreground xl:text-[1.85rem]"
            style={{ animationDelay: "600ms" }}
          >
            Java Full Stack Developer building practical web applications with Java, JavaScript and MySQL.
          </p>

          <p
            className="anim-fade mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-[1.05rem]"
            style={{ animationDelay: "720ms" }}
          >
            I'm a Computer Science Engineering student who works across frontend interfaces, Java backend logic and
            MySQL databases. I completed the AICTE-EduSkills Java Full Stack internship and built an online
            electricity bill payment system with customer and admin modules.
          </p>

          <div className="anim-fade mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "840ms" }}>
            <Magnetic>
              <Button asChild variant="accent" size="lg">
                <a href="#projects">
                  Explore My Work
                  <ArrowDownRight className="transition-transform duration-300 group-hover/btn:rotate-[-45deg]" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="line" size="lg">
                <a href={site.resumePath} download={site.resumeFileName} data-cursor="PDF">
                  <Download /> Download Resume
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:col-span-5 lg:mx-0 lg:ml-auto lg:max-w-none">
          <motion.div style={{ y: frameY }} className="perspective relative">
            <div
              ref={tilt}
              onPointerMove={onTilt}
              onPointerLeave={resetTilt}
              className="preserve-3d relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <figure className="anim-clip relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-surface" style={{ animationDelay: "300ms" }}>
                <motion.img
                  src={portrait}
                  alt="Portrait of Prince Kumar in a black suit and white shirt"
                  width={880}
                  height={1100}
                  fetchPriority="high"
                  style={{ y: imgY, scale: 1.12 }}
                  className="h-full w-full object-cover object-top"
                />
                <figcaption className="absolute inset-x-0 top-0 flex items-start justify-between bg-linear-to-b from-background/70 to-transparent p-4 pb-16">
                  <span className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground">Fig. 01 / Prince Kumar</span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">B.Tech CSE, 2027</span>
                </figcaption>
              </figure>

              {/* corner ticks */}
              <span aria-hidden="true" className="absolute -left-2 -top-2 h-5 w-5 border-l border-t border-primary" />
              <span aria-hidden="true" className="absolute -bottom-2 -right-2 h-5 w-5 border-b border-r border-primary" />

              <div
                aria-hidden="true"
                className="anim-fade absolute -bottom-10 -left-6 hidden w-64 rounded-md border border-border-strong bg-surface p-4 font-mono text-[0.7rem] leading-relaxed shadow-[var(--shadow-lift)] sm:block lg:-left-16"
                style={{ transform: "translateZ(60px)", animationDelay: "1000ms" }}
              >
                <div className="mb-2 flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-border-strong" />
                  <span className="h-2 w-2 rounded-full bg-border-strong" />
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p><span className="text-signal">public class</span> <span className="text-foreground">Prince</span> {"{"}</p>
                <p className="pl-4 text-muted-foreground">String role = <span className="text-primary">"Full Stack"</span>;</p>
                <p className="pl-4 text-muted-foreground">String[] stack = {"{"}<span className="text-primary">"Java"</span>, <span className="text-primary">"JS"</span>, <span className="text-primary">"MySQL"</span>{"}"};</p>
                <p className="pl-4 text-muted-foreground">boolean openToWork = <span className="text-signal">true</span>;</p>
                <p>{"}"}</p>
              </div>
            </div>
          </motion.div>
          <WireCube size={72} className="anim-fade absolute -left-24 top-1/3 hidden xl:block" />
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between border-t border-border px-5 py-5 md:px-10">
        <span className="label-mono">Java / HTML5 / CSS3 / JavaScript / SQL / MySQL</span>
        <a href="#about" className="label-mono hidden items-center gap-2 hover:text-foreground sm:flex">
          Scroll <ArrowDownRight className="h-3.5 w-3.5 rotate-45" />
        </a>
      </div>
    </section>
  );
}
