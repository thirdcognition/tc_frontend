"use client";

import * as React from "react";
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent
} from "@/components/ui/sidebar";
import { Building2, Home } from "lucide-react";
import { SidebarMenuItemComponent } from "./menu-item";

export function LoggedOutSidebar() {
    return (
        <>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" tooltip="Acme Corp">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <Building2 className="size-4" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-semibold">Acme Corp</span>
                                <span className="text-xs">Enterprise Plan</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItemComponent
                                href="/"
                                icon={Home}
                                label="Home"
                                tooltip="Home"
                            />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </>
    );
}
