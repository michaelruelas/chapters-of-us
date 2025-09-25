import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import configData from '../../public/config.json';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getConfig() {
  return configData;
}

export async function generateMetadata() {
  const config = await getConfig();
  return {
    title: config.siteTitle || 'Chapters of Us',
    description: 'Our love story through the years',
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
