import type { Metadata, Viewport } from "next";
import { THEME_COLORS } from "@/lib/theme";
import "./globals.css";

const description =
  "Senior software engineer at Infinity Learn. Backend systems in Go, Python, and TypeScript — plus a creative side for design and writing.";

export const metadata: Metadata = {
  metadataBase: new URL("https://premchand11.github.io"),
  title: "Premchand Panku",
  description,
  openGraph: {
    title: "Premchand Panku",
    description,
    url: "https://premchand11.github.io",
    siteName: "Premchand Panku",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premchand Panku",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLORS.dark,
};

const THEME_SCRIPT = `try{var t=localStorage.getItem("premchand.theme");var d=t!=="light";document.documentElement.setAttribute("data-theme",d?"dark":"default");var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",d?"${THEME_COLORS.dark}":"${THEME_COLORS.light}")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
