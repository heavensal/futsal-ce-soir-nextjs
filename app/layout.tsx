/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { SessionProvider } from "next-auth/react";


const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400"]
})

export const metadata: Metadata = {
  title: "Accueil - Futsal Ce Soir",
  description: "Rejoignez l'événement futsal ce soir !",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">

      <body
        className={`${quicksand.variable} bg-lime-800 font-sans overflow-x-hidden`}
      >
        <SessionProvider>
          <Navbar />
        </SessionProvider>
        {children}
        <Footer />
      </body>
    </html>
  );
}
