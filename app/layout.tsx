import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mission Log | Darshil Modi",
  description:
    "Darshil Modi's mission log exploring AI, space, intelligent systems, and the technology of tomorrow."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
