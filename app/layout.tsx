import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ViewportEdgeFrame } from "@/components/ViewportEdgeFrame";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ziad.studio"),
  title: {
    default: "Ziad Ayman — Creative Developer & Designer",
    template: "%s | Ziad Ayman",
  },
  description:
    "Personal portfolio and creative development archive of Ziad Ayman. Crafting minimal, editorial digital experiences with modern frontend architecture and purposeful motion.",
  keywords: [
    "Ziad Ayman",
    "Creative Developer",
    "Frontend Engineer",
    "Design Engineer",
    "Next.js Portfolio",
    "Interactive Web Design",
    "TypeScript",
    "React 19",
  ],
  authors: [{ name: "Ziad Ayman", url: "https://ziad.studio" }],
  creator: "Ziad Ayman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ziad.studio",
    title: "Ziad Ayman — Creative Developer & Designer",
    description:
      "Crafting minimal, editorial digital experiences with modern frontend architecture and purposeful motion.",
    siteName: "Ziad Ayman Portfolio",
    images: [
      {
        url: "/assets/workflow1.png",
        width: 1200,
        height: 630,
        alt: "Ziad Ayman — Creative Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziad Ayman — Creative Developer & Designer",
    description:
      "Crafting minimal, editorial digital experiences with modern frontend architecture and purposeful motion.",
    images: ["/assets/workflow1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-[var(--color-foreground)] selection:text-[var(--color-background)]">
        <ScrollProgressBar />
        <ViewportEdgeFrame />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
