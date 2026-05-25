import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://athenadev.tech"),
  title: {
    default: "Vitalii Bogachev — Senior Fullstack Engineer & AI/SaaS Founder",
    template: "%s · Vitalii Bogachev",
  },
  description:
    "Senior fullstack engineer building AI-powered SaaS products with TypeScript, Python, and LLMs. 13 years shipping production systems for fintech, crypto, and solar industries.",
  keywords: [
    "Vitalii Bogachev",
    "Виталий Богачев",
    "Senior Fullstack Engineer",
    "TypeScript",
    "Node.js",
    "React",
    "Next.js",
    "Python",
    "Flask",
    "AI",
    "LLM",
    "OpenAI",
    "Anthropic Claude",
    "SaaS Founder",
    "BookahTranslate",
    "AthenaDev",
  ],
  authors: [{ name: "Vitalii Bogachev", url: "https://github.com/talhayme" }],
  openGraph: {
    type: "website",
    title: "Vitalii Bogachev — Senior Fullstack Engineer & AI/SaaS Founder",
    description:
      "13 years shipping production systems. Currently building AI-powered SaaS products with LLMs.",
    url: "https://athenadev.tech",
    siteName: "Vitalii Bogachev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalii Bogachev",
    description:
      "Senior fullstack engineer & AI/SaaS founder. TypeScript, Python, LLMs.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
