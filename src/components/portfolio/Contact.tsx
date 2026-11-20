import { useState, type FormEvent } from "react";
import { z } from "zod";
import { ArrowUpRight, Download, Github, Linkedin, Mail, Send } from "lucide-react";
import { buildMailto, hasLink, site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  subject: z.string().trim().min(3, "Please add a subject.").max(150, "Subject is too long."),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(2000, "Message is too long."),
});

type Fields = z.infer<typeof schema>;
const empty: Fields = { name: "", email: "", subject: "", message: "" };

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-foreground placeholder:text-faint transition-colors focus:border-primary focus:outline-none aria-[invalid=true]:border-destructive";

export function Contact() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof Fields, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setSent(false);
      const first = Object.keys(next)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    window.location.href = buildMailto(parsed.data);
    setSent(true);
  };

  const field = (k: keyof Fields, label: string, type = "text", autoComplete?: string) => (
    <div>
      <label htmlFor={`f-${k}`} className="label-mono mb-2 block">
        {label}
      </label>
      <input
        id={`f-${k}`}
        name={k}
        type={type}
        autoComplete={autoComplete}
        value={values[k]}
        onChange={set(k)}
        aria-invalid={Boolean(errors[k])}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        className={inputClass}
      />
      {errors[k] && (
        <p id={`e-${k}`} className="mt-2 text-sm text-destructive">
          {errors[k]}
        </p>
      )}
    </div>
  );

  const links = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, external: false },
    { label: "LinkedIn", value: "in/prince-kumar-285839290", href: site.linkedinUrl, icon: Linkedin, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-border">
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs text-primary">05</span>
          <span className="hairline w-12" />
          <span className="label-mono">Contact</span>
        </Reveal>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 id="contact-title" className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Let's connect and discuss <span className="text-primary">opportunities.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 max-w-md text-lg text-muted-foreground">
                I'm open to entry-level Java Developer, Java Full Stack Developer and Software Engineer roles. The
                quickest way to reach me is email.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <ul className="mt-12 border-t border-border">
                {links.map((l) => (
                  <li key={l.label} className="border-b border-border">
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 py-5"
                    >
                      <l.icon className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      <span className="label-mono w-20 shrink-0">{l.label}</span>
                      <span className="min-w-0 truncate text-foreground sm:text-lg">{l.value}</span>
                      <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                    </a>
                  </li>
                ))}
                <li className="border-b border-border">
                  {hasLink(site.githubUrl) ? (
                    <a href={site.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-5">
                      <Github className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" />
                      <span className="label-mono w-20 shrink-0">GitHub</span>
                      <span className="min-w-0 truncate sm:text-lg">{site.githubUrl.replace(/^https?:\/\//, "")}</span>
                      <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-muted-foreground" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-5">
                      <Github className="h-5 w-5 shrink-0 text-faint" />
                      <span className="label-mono w-20 shrink-0">GitHub</span>
                      <span className="text-muted-foreground">https://github.com/PRINCE2004-GIT</span>
                    </div>
                  )}
                </li>
              </ul>
            </Reveal>

            <Reveal delay={220} className="mt-10">
              <Magnetic>
                <Button asChild variant="line" size="lg">
                  <a href={site.resumePath} download={site.resumeFileName} data-cursor="PDF">
                    <Download /> Download Resume
                  </a>
                </Button>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
            <form noValidate onSubmit={onSubmit} aria-labelledby="form-title" className="rounded-md border border-border bg-surface p-6 md:p-8">
              <h3 id="form-title" className="font-display text-xl font-semibold">Send a message</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This form opens your email app with the message filled in, addressed to {site.email}.
              </p>
              <div className="mt-8 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {field("name", "Name", "text", "name")}
                  {field("email", "Your email", "email", "email")}
                </div>
                {field("subject", "Subject")}
                <div>
                  <label htmlFor="f-message" className="label-mono mb-2 block">
                    Message
                  </label>
                  <textarea
                    id="f-message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={set("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "e-message" : undefined}
                    className={`${inputClass} resize-y`}
                  />
                  {errors.message && (
                    <p id="e-message" className="mt-2 text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>
                <Button type="submit" variant="accent" size="lg" className="w-full">
                  <Send /> Open in email app
                </Button>
                <p role="status" aria-live="polite" className="min-h-5 text-sm text-primary">
                  {sent && `Your email app should now be open with the message ready. If it didn't open, write to ${site.email}.`}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
