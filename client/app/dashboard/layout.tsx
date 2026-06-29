"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <div className="flex min-h-screen w-screen">
          <AppSidebar />

          <main className="flex-1 pt-20 px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-mt-12 -ml-5" />
            </div>

            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
