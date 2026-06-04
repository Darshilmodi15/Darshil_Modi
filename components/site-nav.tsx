"use client";

import { useState } from "react";
import Image from "next/image";
import { navItems, profile } from "@/lib/portfolio-data";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#mission-log" aria-label="Mission Log home">
        <Image 
          src="/logo.png" 
          alt="DM Logo" 
          width={48} 
          height={48}
          className="brand-logo"
          priority
        />
        <span>
          <strong>{profile.siteName}</strong>
          <small>{profile.name}</small>
        </span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
