import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parks & Trails Companion",
  description: "Parks & Trails Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#E9F5EC]">{children}</body>
    </html>
  );
}
