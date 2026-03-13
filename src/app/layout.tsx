import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import ClientShell from "@/components/layout/ClientShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOM DE GUERRE",
  description:
    "Step into the captivating musical universe of Nom De Guerre, where rapper Vuyo and producer Ultraposh join forces to transcend the boundaries between hip-hop and house music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-void text-wire antialiased`}
      >
        <ClientShell>{children}</ClientShell>
        <div className="grain" />
      </body>
    </html>
  );
}
