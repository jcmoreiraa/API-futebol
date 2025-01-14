import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/header";
import { Carrossel } from "./components/carrossel";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "API de futebol",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
       //className={`$ ${geistMono.variable} antialiased bg-cover bg-center`} style={{ backgroundImage: 'url("/futebol.avif")', height: '100vh' }}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
