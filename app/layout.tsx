import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Navbar from './MyComponents/navbar';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';

export const metadata = {
  title: "Mercileen Agency",
  description: "This is a property agency Next.js application, built for modern web development.",
  keywords: "Next.js, Clerk, React, Web Development, Authentication",
  author: "Mark Brivvins Mwaniki",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../app/public/hand-presenting-model-house-home-loan-campaign.jpg" />
      </Head>
      <body>
        <ClerkProvider>
          <Navbar />
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
