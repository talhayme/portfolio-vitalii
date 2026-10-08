import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Must match where the site is actually served from. A canonical that
  // points at a different domain tells crawlers the real copy lives there.
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vitalii Bogachev — Senior AI Engineer (LLM, RAG, MCP)",
    template: "%s · Vitalii Bogachev",
  },
  description:
    "Senior AI Engineer building LLM products that run in production, not demos. RAG, custom MCP servers, LLM evaluation and prompt regression testing, on GPT-4 and Claude. 13 years of engineering underneath.",
  keywords: [
    "Vitalii Bogachev",
    "Виталий Богачев",
    "Senior AI Engineer",
    "AI Engineer",
    "LLM Engineer",
    "RAG",
    "MCP",
    "Model Context Protocol",
    "LLM evaluation",
    "prompt engineering",
    "OpenAI",
    "GPT-4",
    "Anthropic Claude",
    "Python",
    "TypeScript",
    "BookahTranslate",
    "AthenaDev",
  ],
  authors: [{ name: "Vitalii Bogachev", url: "https://github.com/talhayme" }],
  openGraph: {
    type: "website",
    title: "Vitalii Bogachev — Senior AI Engineer (LLM, RAG, MCP)",
    description:
      "I build LLM products that run in production, not demos. RAG, MCP servers, evals and regression gates — on GPT-4 and Claude.",
    url: siteUrl,
    siteName: "Vitalii Bogachev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalii Bogachev — Senior AI Engineer",
    description:
      "LLM products that run in production, not demos. RAG, MCP, evals. GPT-4 and Claude.",
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
