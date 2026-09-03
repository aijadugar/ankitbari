import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SectionNavProvider } from "@/components/SectionNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aijadugar.dev"
  ),
  title: "Ankit Bari",
  description:
    "AI and Research Engineer building model architectures and mathematics with CUDA kernels.",
  icons: {
    icon: [
      { url: "/placeholder.png", sizes: "any" },
    ],
    apple: [{ url: "/placeholder.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Ankit Bari",
    description:
      "AI and Research Engineer building model architectures and mathematics with CUDA kernels.",
    url: "https://aijadugar.dev",
    siteName: "Ankit Bari",
    type: "website",
    images: [
      {
        url: "/placeholder.png",
        secureUrl: "/placeholder.png",
        width: 1024,
        height: 576,
        type: "image/png",
        alt: "Ankit Bari - AI and Research Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Bari",
    description:
      "AI and Research Engineer building model architectures and mathematics with CUDA kernels.",
    site: "@aijadugar",
    creator: "@aijadugar",
    images: ["/placeholder.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0E14] text-[#E6EDF3] transition-colors duration-300">
        <SectionNavProvider>
          {children}
        </SectionNavProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
