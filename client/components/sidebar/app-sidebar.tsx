import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import DashboardSidebarContent from "./DashboardSidebarContent";
import TechLogo from "../logo";
import DashboardSidebarFooter from "./sidebar-footer";

export function AppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <div>
      <Sidebar collapsible="icon" className={`z-50${className}`}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <TechLogo />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <DashboardSidebarContent />
        </SidebarContent>
        <SidebarFooter>
          <DashboardSidebarFooter />
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
