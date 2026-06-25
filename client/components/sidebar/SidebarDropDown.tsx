import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { SidebarMenuSubButton } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/lib/types";

export default function SidebarDropDown({
  user,
  logout,
}: {
  user: User | null;
  logout: () => Promise<void>;
}) {
  return (
    <div>
      <DropdownMenuItem>
        <SidebarMenuSubButton className="data-[state=open]:bg-sidebar-accent -ml-3 py-5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {user?.first_name} {user?.last_name}
            </span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
        </SidebarMenuSubButton>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="py-3">
        <Sparkles />
        Upgrade to Pro
      </DropdownMenuItem>

      <DropdownMenuItem className="py-3">
        <BadgeCheck />
        Account
      </DropdownMenuItem>

      <DropdownMenuItem className="py-3">
        <CreditCard />
        Billing
      </DropdownMenuItem>

      <DropdownMenuItem className="py-3">
        <Bell />
        Notifications
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={logout} className="py-3 text-destructive ">
        <LogOut />
        Log out
      </DropdownMenuItem>
    </div>
  );
}
