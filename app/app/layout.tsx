import type { Metadata } from "next";
import Script from "next/script";
import { Archivo } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Eddie Cohanim",
  description: "Personal portfolio of Eddie Cohanim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} font-sans antialiased`}>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
