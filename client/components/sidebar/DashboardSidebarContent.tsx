"use client";
import Link from "next/link";
import { sidebarNavigation, profileNavigation } from "../data";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";

export default function DashboardSidebarContent() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  return (
    <div>
      <SidebarGroup>
        {!isCollapsed && <SidebarGroupLabel>Main</SidebarGroupLabel>}

        <SidebarGroupContent>
          <SidebarMenu>
            {sidebarNavigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem
                  className={
                    state === "collapsed" && !isMobile
                      ? "place-self-center"
                      : ""
                  }
                  key={item.name}
                >
                  <SidebarMenuButton
                    tooltip={state === "collapsed" ? item.name : undefined}
                    asChild
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive
                          ? "bg-emerald-500 text-black"
                          : "text-zinc-400 hover:bg-emerald-800 hover:text-white"
                        }`}
                    >
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge &&
                    (isCollapsed ? (
                      <div className="absolute top-1 right-1">
                        <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </div>
                    ) : (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    ))}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>{" "}
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        {!isCollapsed && <SidebarGroupLabel>Profile</SidebarGroupLabel>}

        <SidebarGroupContent>
          <SidebarMenu>
            {profileNavigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem
                  className={
                    state === "collapsed" && !isMobile
                      ? "place-self-center"
                      : ""
                  }
                  key={item.name}
                >
                  <SidebarMenuButton
                    tooltip={state === "collapsed" ? item.name : undefined}
                    asChild
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive
                          ? "bg-emerald-500 text-black"
                          : "text-zinc-400 hover:bg-emerald-800 hover:text-white"
                        }`}
                    >
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge &&
                    (isCollapsed ? (
                      <div className="absolute top-1 right-1">
                        <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </div>
                    ) : (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    ))}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>{" "}
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
}
