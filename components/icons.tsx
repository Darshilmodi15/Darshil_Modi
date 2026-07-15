import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}

export function GithubIcon(props: IconProps) {
  return <IconBase {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1.3-3.7c4.3-.5 8.8-2.1 8.8-9.5A7.4 7.4 0 0 0 20.5 0 6.9 6.9 0 0 0 20 4.8 7 7 0 0 0 12 4.8 7 7 0 0 0 4 4.8 6.9 6.9 0 0 0 3.5 0a7.4 7.4 0 0 0-2 4.8c0 7.4 4.5 9 8.8 9.5A4.8 4.8 0 0 0 9 18v4" /><path d="M9 19c-4.5 1.8-4.5-2-6-2.5" /></IconBase>;
}

export function LinkedinIcon(props: IconProps) {
  return <IconBase {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><path d="M2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></IconBase>;
}

export function DiscordIcon(props: IconProps) {
  return <IconBase {...props}><path d="M8 12.5h.01M16 12.5h.01" /><path d="M7.5 8.5a11 11 0 0 1 9 0" /><path d="M7 17c-1.6-.4-3-1-4-2 .2-4 1.1-7.2 3-9.5 1.2-.5 2.3-.8 3.3-1l.6 1.2a12 12 0 0 1 4.2 0l.6-1.2c1 .2 2.1.5 3.3 1 1.9 2.3 2.8 5.5 3 9.5-1 1-2.4 1.6-4 2l-1-1.7a10 10 0 0 1-8 0L7 17Z" /></IconBase>;
}

export function FileIcon(props: IconProps) {
  return <IconBase {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M8 13h8M8 17h5" /></IconBase>;
}

export function ExternalIcon(props: IconProps) {
  return <IconBase {...props}><path d="M7 17 17 7" /><path d="M9 7h8v8" /></IconBase>;
}

export function ArrowRightIcon(props: IconProps) {
  return <IconBase {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></IconBase>;
}

export function BookIcon(props: IconProps) {
  return <IconBase {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" /></IconBase>;
}

export function MailIcon(props: IconProps) {
  return <IconBase {...props}><path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" /></IconBase>;
}

export function SunIcon(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></IconBase>;
}

export function MoonIcon(props: IconProps) {
  return <IconBase {...props}><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 7 7 0 1 0 20.5 14.5Z" /></IconBase>;
}
