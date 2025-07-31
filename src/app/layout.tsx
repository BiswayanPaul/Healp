import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import RenderMounted from "@/components/RenderMounted";
import {
  ClerkProvider
} from '@clerk/nextjs'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "HEALP",
  description: "Making Healthcare Easy",
  verification: {
    google: "IdNT47KdHr3CBwzloYC_dhV_mNTUOd4Zxwm2ALwUeFE",
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
