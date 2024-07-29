"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "./navigation";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Navigation />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <Header />
              {children}
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
