import Footer from "@/components/layout/Footer";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Shaheed Bhagat Singh State University, Ferozepur",
  description:
    "Official website of Shaheed Bhagat Singh State University, Ferozepur - A premier technical university in Punjab",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" min-h-screen">
        <Header /> {children} <Footer />
      </body>
    </html>
  );
}
