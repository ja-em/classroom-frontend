"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";

export const LogoutButton = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <a
            onClick={async () => {
              await signOut();
            }}
          >
            <LogOut />
            <span>Logout</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
