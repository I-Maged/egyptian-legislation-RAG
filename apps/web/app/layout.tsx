import type { Metadata } from "next";
import Navbar, { NavbarProvider } from "./components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "المساعد القانوني المصري",
  description: "مساعد قانوني تجريبي للتشريعات المصرية",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <NavbarProvider>
          <Navbar />
          {children}
        </NavbarProvider>
      </body>
    </html>
  );
}
