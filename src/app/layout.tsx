import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nEDI Platform",
  description: "Electronic Data Interchange Platform for Produce Vendors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}