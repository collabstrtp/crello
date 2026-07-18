import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.crello.dev"),

  title: {
  default: "Crello Technologies | Custom Software Development Company",
  template: "%s | Crello Technologies",
  },

  description:
    "Crello Technologies builds custom software, web applications, mobile apps, AI solutions, SaaS platforms, and business automation for startups and enterprises.",

  applicationName: "Crello Technologies",

  authors: [
    {
      name: "Crello Technologies",
      url: "https://www.crello.dev",
    },
  ],

  creator: "Crello Technologies",

  publisher: "Crello Technologies",

  category: "Technology",

  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: "https://www.crello.dev",
  },

  icons: {
  icon: "/icon.png",
  apple: "/apple-touch-icon.png",
},

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.crello.dev",
    siteName: "Crello Technologies",

    title:
      "Crello Technologies | Custom Software Development Company",

    description:
      "We build custom software, web applications, AI solutions, mobile apps, SaaS platforms, and business automation for startups and enterprises.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crello Technologies",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Crello Technologies | Custom Software Development",

    description:
      "Custom software, AI solutions, SaaS platforms, mobile apps, and modern web development.",

    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // Add this after verifying your site in Google Search Console
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050505] antialiased">
          <OrganizationSchema />

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}