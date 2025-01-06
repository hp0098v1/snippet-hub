import { Vazirmatn, Fira_Code, Fira_Mono } from "next/font/google";
import React from "react";

import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/context/session-provider";
import { cn } from "@/lib/utils";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fira-code",
});

const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-fira-mono",
});

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
    <html
      suppressHydrationWarning
      className={cn(
        "dark",
        vazirmatn.variable,
        firaCode.variable,
        firaMono.variable
      )}
      dir="rtl"
      lang="fa"
    >
      <body className="dark relative flex min-h-screen flex-col bg-background antialiased">
        <SessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
