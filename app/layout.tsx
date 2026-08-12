import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://premchand11.github.io"),
  title: "Premchand Panku",
  description:
    "NIT Warangal. Building small, useful systems — Go pipelines, LLM tools, and the occasional web app.",
};

const THEME_SCRIPT = `try{var t=localStorage.getItem("premchand.theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"default")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
