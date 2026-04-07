import type { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Myway - Career Platform for Liberia",
    template: "%s | Myway",
  },
  description:
    "Career guidance, job matching, and AI coaching built for Liberian students, employers, and counselors.",
  keywords: [
    "career",
    "jobs",
    "Liberia",
    "mentorship",
    "education",
    "employment",
    "professional development",
  ],
  authors: [{ name: "Myway Team" }],
  creator: "Myway",
  publisher: "Myway",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myway-liberia.vercel.app",
    siteName: "Myway",
    title: "Myway - Career Platform for Liberia",
    description:
      "Career guidance, job matching, and AI coaching for Liberian professionals",
    images: [
      {
        url: "https://myway-liberia.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Myway Career Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Myway - Career Platform for Liberia",
    description:
      "Career guidance, job matching, and AI coaching for Liberian professionals",
    images: ["https://myway-liberia.vercel.app/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Myway",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0d1117",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d1117" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
          // @ts-ignore
          importance="low"
        />
      </head>
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
