import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Poppins } from "next/font/google";
import { weddingConfig } from "@/lib/config";
import "./globals.css";

const bodyFont = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const scriptFont = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${weddingConfig.partner1Name} & ${weddingConfig.partner2Name}`,
  description: `You're invited to the wedding of ${weddingConfig.partner1Name} & ${weddingConfig.partner2Name}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${headingFont.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory font-sans text-charcoal">
        {children}
      </body>
    </html>
  );
}
