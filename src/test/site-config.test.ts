import { describe, expect, it } from "vitest";
import { buildMailto, hasLink, site } from "@/config/site";

describe("site config", () => {
  it("downloads the resume as Prince-Kumar-Resume.pdf", () => {
    expect(site.resumePath).toBe("/Prince-Kumar-Resume.pdf");
    expect(site.resumeFileName).toBe("Prince-Kumar-Resume.pdf");
  });

  it("uses the verified LinkedIn profile", () => {
    expect(site.linkedinUrl).toBe("https://www.linkedin.com/in/prince-kumar-285839290");
  });

  it("does not present a GitHub link until a real URL is configured", () => {
    expect(hasLink("")).toBe(false);
    expect(hasLink(site.githubUrl)).toBe(site.githubUrl !== "");
  });

  it("addresses contact form messages to the professional email", () => {
    const url = buildMailto({ name: "Asha", email: "asha@example.com", subject: "Role", message: "Hello there" });
    expect(url.startsWith("mailto:princekumarssm859@gmail.com?subject=Role&body=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Reply to: asha@example.com");
  });
});
