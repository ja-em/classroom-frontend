import { MenuLinkEnum, menus } from "@/constants/menu";
import { AppSidebar } from "./app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classroom Management",
  description: "Classroom Management",
};

export const MainLayout = ({
  children,
  link = MenuLinkEnum.CLASSROOM,
}: {
  children: React.ReactNode;
  link?: MenuLinkEnum;
}) => {
  return (
    <SidebarProvider>
      <AppSidebar link={link} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {menus.find((e) => e.url === link)?.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
