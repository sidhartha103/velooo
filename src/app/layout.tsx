import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { RootLayoutClient } from '@/components/root-layout-client';

export const metadata: Metadata = {
  title: 'VeloShoot',
  description: 'Reels, Ready in a Snap.',
   icons: {
    icon: '/favicon.icoo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
        <Toaster />
      </body>
    </html>
  );
}
