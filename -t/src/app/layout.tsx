import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Sileejaa",
  description: "A simple and fast way to create a website",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Sileejaa",
    description: "A simple and fast way to create a website",
    url: "https://sileejaa.com",
    siteName: "Sileejaa",
    images: [
      {
        url: "https://sileejaa.com/sileejaa.svg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sileejaa",
    description: "A simple and fast way to create a website",
    images: ["https://sileejaa.com/sileejaa.svg"],
    creator: "@sileejaa",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
