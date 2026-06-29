"use client";
import { ChevronsUpDown, User2 } from "lucide-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SidebarDropDown from "./SidebarDropDown";
import { useAuth } from "@/context/AuthContext";

export default function DashboardSidebarFooter() {
  const { user, logout } = useAuth();
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;
  console.log("isMobile:", isMobile);

  return (
    <div>
      <SidebarFooter>
        <SidebarMenu className="relative">
          <SidebarMenuItem
            className={
              state === "collapsed" && !isMobile
                ? "place-self-center cursor-pointer"
                : ""
            }
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  tooltip={isCollapsed ? user?.first_name : undefined}
                >
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  {!isCollapsed && (
                    <>
                      <div className="grid flex-1 text-left text-sm">
                        <span>
                          {user?.first_name} {user?.last_name}
                        </span>
                        <span className="text-xs">{user?.email}</span>
                      </div>

                      <ChevronsUpDown className="ml-auto size-4" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>{" "}
              <DropdownMenuContent
                side={`${isMobile ? "top" : "right"}`}
                align="end"
                collisionPadding={12}
                className={`${isMobile ? "absolute right-2 bottom-0" : "w-full min-w-65 max-w-[85vw]"}`}
              >
                <SidebarDropDown logout={logout} user={user} />
              </DropdownMenuContent>{" "}
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>{" "}
    </div>
  );
}
