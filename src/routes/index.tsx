import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { absoluteUrl, hasLink, site } from "@/config/site";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Marquee } from "@/components/portfolio/Marquee";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Cursor } from "@/components/portfolio/Cursor";

const TITLE = "Prince Kumar | Java Full Stack Developer";
const DESCRIPTION =
  "Portfolio of Prince Kumar, a Computer Science Engineering student and Java Full Stack Developer in Durgapur, India, building web applications with Java, JavaScript and MySQL.";

function buildHead() {
  const canonical = absoluteUrl("/") ?? "/";
  const ogImage = absoluteUrl(site.ogImagePath);
  const sameAs = [site.linkedinUrl, site.githubUrl].filter(hasLink);

  const meta: Array<Record<string, string>> = [
    { title: TITLE },
    { name: "description", content: DESCRIPTION },
    { name: "author", content: site.name },
    { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "profile" },
    { property: "og:url", content: canonical },
    { property: "profile:first_name", content: "Prince" },
    { property: "profile:last_name", content: "Kumar" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: TITLE },
    { name: "twitter:description", content: DESCRIPTION },
  ];
  if (ogImage) {
    meta.push(
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Prince Kumar, Java Full Stack Developer" },
      { name: "twitter:image", content: ogImage },
    );
  }

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Durgapur", addressRegion: "West Bengal", addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Bengal College of Engineering & Technology" },
    knowsAbout: ["Java", "JavaScript", "HTML5", "CSS3", "SQL", "MySQL", "Object-Oriented Programming", "Data Structures and Algorithms"],
    knowsLanguage: ["English", "Hindi"],
    sameAs,
    ...(hasLink(site.siteUrl) ? { url: site.siteUrl } : {}),
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Prince Kumar Portfolio",
    description: DESCRIPTION,
    ...(hasLink(site.siteUrl) ? { url: site.siteUrl } : {}),
  };

  return {
    meta,
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(person) },
      { type: "application/ld+json", children: JSON.stringify(website) },
    ],
  };
}

export const Route = createFileRoute("/")({
  head: buildHead,
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Marquee />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
