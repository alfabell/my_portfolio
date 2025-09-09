import { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Muhamad Alfabel - Portfolio",
    template: "%s | Muhamad Alfabel",
  },
  description:
    "Portfolio website of Muhamad Alfabel - Full Stack Developer, showcasing projects, skills, and experience in web development.",
  keywords: [
    "Muhamad Alfabel",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "Muhamad Alfabel" }],
  creator: "Muhamad Alfabel",
  publisher: "Muhamad Alfabel",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhamadalfabel.engineer",
    title: "Muhamad Alfabel - Portfolio",
    description:
      "Portfolio website of Muhamad Alfabel - Full Stack Developer ganteng",
    siteName: "Muhamad Alfabel Portfolio",
    images: [
      {
        url: "/images/muhamad-alfabel.jpg",
        width: 1200,
        height: 630,
        alt: "Muhamad Alfabel - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhamad Alfabel - Portfolio",
    description: "Portfolio website of Muhamad Alfabel - Full Stack Developer",
    images: ["/images/muhamad-alfabel.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
