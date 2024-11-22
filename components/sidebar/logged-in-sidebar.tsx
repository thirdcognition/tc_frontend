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
import { User, Home, LayoutList, Ruler } from "lucide-react";
import { SidebarMenuItemComponent } from "./menu-item";

export function LoggedInSidebar() {
    return (
        <>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" tooltip="User Dashboard">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <User className="size-4" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-semibold">Dashboard</span>
                                <span className="text-xs">Welcome Back!</span>
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
                            <SidebarMenuItemComponent
                                href="/journey/build"
                                icon={LayoutList}
                                label="Create a Journey"
                                tooltip="Create a Journey"
                            />
                            <SidebarMenuItemComponent
                                href="#"
                                icon={LayoutList}
                                label="My Journeys"
                                tooltip="My Journeys"
                            />
                            <SidebarMenuItemComponent
                                href="#"
                                icon={Ruler}
                                label="Progress"
                                tooltip="Progress"
                            />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </>
    );
}
