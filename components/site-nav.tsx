"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, personalInfo, resume } from "@/lib/portfolio-data";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${personalInfo.name} home`} onClick={() => setOpen(false)}>
        <Image src="/logo.png" alt="" width={40} height={40} priority className="brand-logo" />
        <span>
          <strong>Darshil Modi</strong>
          <small>AI/ML + Software</small>
        </span>
      </Link>

      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav id="primary-navigation" className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
        {navigation.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          );
        })}
        <a className="nav-resume" href={resume.url} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
          Résumé
        </a>
      </nav>
    </header>
  );
}
