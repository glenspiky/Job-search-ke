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

  return (
    <div>
      <SidebarFooter>
        <SidebarMenu>
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
              <DropdownMenuPortal>
                <DropdownMenuContent
                  side="right"
                  align="end"
                  sideOffset={8}
                  className="w-76 rounded-lg"
                >
                  <SidebarDropDown logout={logout} user={user} />
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>{" "}
    </div>
  );
}
