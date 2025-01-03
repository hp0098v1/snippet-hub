import React from "react";
import { Vazirmatn } from "next/font/google";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";

const vazirmatn = Vazirmatn({ subsets: ["arabic"] });

export const metadata = {
  title: "SnippetHub",
  description: "پلتفرم مدیریت و اشتراک‌گذاری کد",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body className="min-h-screen relative flex flex-col bg-background antialiased dark">
        <SessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
