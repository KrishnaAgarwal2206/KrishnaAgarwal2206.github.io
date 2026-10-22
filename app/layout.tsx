import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";

const title = "Krishna Agarwal — Optimization, AI systems & software";
const description =
  "Industrial Engineering & Operations Research at IIT Bombay. I build systems that turn complexity into decisions: exact optimization, applied AI and software engineering.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://krishnaagarwal2206.github.io"),
  openGraph: { title, description, type: "website", siteName: "Krishna Agarwal" },
  twitter: { card: "summary", title, description },
};
export const viewport: Viewport = { themeColor: "#0b0b0c", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip mono" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
