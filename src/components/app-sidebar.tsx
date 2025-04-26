import { School } from "lucide-react";
import { NavMenu } from "@/components/nav-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { MenuLinkEnum } from "@/constants/menu";
import { LogoutButton } from "./logout-button";

export function AppSidebar({ link }: { link: MenuLinkEnum }) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <School className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    Classroom Management
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenu link={link} />
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
