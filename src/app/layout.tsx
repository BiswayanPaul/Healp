import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import RenderMounted from "@/components/RenderMounted";
import {
  ClerkProvider
} from '@clerk/nextjs'
import IndexPage from "@/components/IndexPage";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Healp - Smarter Healthcare for Everyone",
  description:
    "Healp is a full-stack SaaS platform that helps patients discover trusted doctors and hospitals, while enabling providers to grow digitally and manage care better.",
  robots: { index: true, follow: true },
  verification: {
    google: "IdNT47KdHr3CBwzloYC_dhV_mNTUOd4Zxwm2ALwUeFE",
  },
  openGraph: {
    title: "Healp - Smarter Healthcare for Everyone",
    description:
      "Healp connects patients with verified doctors and hospitals, while empowering healthcare providers with tools to improve visibility and streamline engagement.",
    url: "https://healp.vercel.app",
    siteName: "Healp",
    images: [
      {
        url: "https://healp.vercel.app/assets/hero_page_image.jpg",
        width: 1200,
        height: 630,
        alt: "Healp - Healthcare SaaS Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healp - Smarter Healthcare for Everyone",
    description:
      "Modern healthcare SaaS connecting patients to trusted providers and helping hospitals and doctors grow their digital presence.",
    images: ["https://healp.vercel.app/assets/hero_page_image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Force index and follow manually */}
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <IndexPage />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main>
            <RenderMounted>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </RenderMounted>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
