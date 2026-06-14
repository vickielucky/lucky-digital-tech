import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucky Digital Tech — Web Development & Digital Solutions",
  description:
    "Lucky Digital Tech builds fast, modern websites and systems to help businesses grow.",
  keywords: [
    "web development",
     "graphic design",
    "digital agency",
     "Victor Murithi",
      "Vickie Lucky",
    "UI/UX",
    "systems",
    "Lucky Digital Tech",
  ],
  openGraph: {
    title: "Lucky Digital Tech — Web Development & Digital Solutions",
    description:
      "Lucky Digital Tech builds fast, modern websites and systems to help businesses grow.",
    url: "https://lucky-digital-tech-rs84.vercel.app",
    type: "website",
  },
  alternates: {
    canonical: "https://lucky-digital-tech-rs84.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lucky Digital Tech",
    url: "https://lucky-digital-tech-rs84.vercel.app",
    logo: "https://lucky-digital-tech-rs84.vercel.app/luc.png",
    sameAs: [
      "https://web.facebook.com/victor.murithi.7927",
      "https://x.com/Vickielucky3",
      "https://www.linkedin.com/in/victor-murithi-a073b532a",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "luckydigitaltech@gmail.com",
        contactType: "customer support",
        areaServed: "KE",
        availableLanguage: ["English"],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="efWDTcpUxC1M5BN_3U7zE-QCRBp5BfaY8rahbV_pOh8"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
