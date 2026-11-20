/**
 * Site-wide configuration. Edit these values once they are known:
 * - siteUrl: final custom domain, e.g. "https://princekumar.dev" (no trailing slash).
 *   When set, absolute canonical/og:image tags are emitted. Leave "" until the domain exists.
 * - githubUrl: real GitHub profile URL. Leave "" until provided; the UI shows it as pending.
 */
export const site = {
  name: "Prince Kumar",
  role: "Java Full Stack Developer",
  location: "Durgapur, West Bengal, India",
  email: "princekumarssm859@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/prince-kumar-285839290",
  githubUrl: "",
  projectSourceUrl: "",
  siteUrl: "",
  resumePath: "/Prince-Kumar-Resume.pdf",
  resumeFileName: "Prince-Kumar-Resume.pdf",
  ogImagePath: "/og-image.jpg",
} as const;

export function hasLink(url: string): boolean {
  return /^https?:\/\/\S+$/.test(url);
}

export function absoluteUrl(path: string): string | null {
  if (!hasLink(site.siteUrl)) return null;
  return `${site.siteUrl.replace(/\/$/, "")}${path}`;
}

export function buildMailto(input: { name: string; email: string; subject: string; message: string }) {
  const body = `${input.message}\n\nFrom: ${input.name}\nReply to: ${input.email}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(input.subject)}&body=${encodeURIComponent(body)}`;
}
