"use client";
import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="dark min-h-full flex flex-col">
        <AuthProvider>
          <TooltipProvider>
            <Navbar />
            {isHomePage ? (
              <div>{children}</div>
            ) : (
              <SidebarProvider defaultOpen={false}>
                {" "}
                <AppSidebar />
                <main className="w-full pt-20 px-6  ">
                  <div className="flex items-center gap-2 mb-4">
                    <SidebarTrigger className="-mt-12 -ml-5" />{" "}
                  </div>

                  <div>{children}</div>
                </main>
              </SidebarProvider>
            )}
          </TooltipProvider>
        </AuthProvider>{" "}
      </body>
    </html>
  );
}
