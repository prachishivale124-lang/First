import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/CartContext";
import { SessionProvider } from "@/components/providers/SessionProvider";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BHISHMA | Pure Nature. Healthy Future.",
  description: "Experience naturally grown fruits and vegetables delivered fresh from trusted farms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
            <BottomNav />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
