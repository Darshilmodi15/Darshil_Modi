"use client";

import { useState } from "react";
import { DiscordIcon, FileIcon, GithubIcon, LinkedinIcon } from "@/components/icons";
import { personalInfo, resume, socialLinks } from "@/lib/portfolio-data";

export function FooterActions() {
  const [copied, setCopied] = useState(false);
  const github = socialLinks.find((link) => link.label === "GitHub");
  const linkedin = socialLinks.find((link) => link.label === "LinkedIn");

  async function copyDiscord() {
    await navigator.clipboard.writeText(personalInfo.discord).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="footer-actions" aria-label="Footer links">
      {github && <a className="icon-button" href={github.href} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile"><GithubIcon /></a>}
      {linkedin && <a className="icon-button" href={linkedin.href} target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn profile"><LinkedinIcon /></a>}
      <button className="icon-button" type="button" onClick={copyDiscord} aria-label="Copy Discord username"><DiscordIcon /></button>
      <a className="icon-button" href={resume.url} target="_blank" rel="noopener noreferrer" aria-label="Open Resume"><FileIcon /></a>
      <span className={copied ? "copy-toast is-visible" : "copy-toast"} role="status" aria-live="polite">Discord username copied</span>
    </div>
  );
}
