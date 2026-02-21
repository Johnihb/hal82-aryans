import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Navbar from '@/components/Navbar';




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emergen",
  description: "A friend in emergency .",
  icons:{
    icon:'/logo.jpeg'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });



  return (
    <html lang="en">
      {/*
        `suppressHydrationWarning` prevents React from complaining about
        attribute mismatches on the body that can be caused by browser
        extensions or client-only scripts that modify attributes before
        hydration. This is safe here because body attributes like
        font CSS variables will be stable for our app.
      */}
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-[72px] lg:pt-[72px]`}
      >
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
