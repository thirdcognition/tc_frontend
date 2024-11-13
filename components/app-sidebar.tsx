"use client";

import * as React from "react";
import {
    Building2,
    Home,
    LayoutList,
    Settings,
    User,
    Ruler
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "./theme-switcher";
import Link from "next/link";
import { createClient } from "@/lib/utils/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function AppSidebar() {
    const supabase = createClient();
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser();
            setUser(user || null);
            setLoading(false);
        };

        fetchUser();
    }, [supabase]);
    return (
        <Sidebar collapsible="icon">
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
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Home">
                                    <a href="#">
                                        <Home className="size-4" />
                                        Home
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="List of Journeys"
                                >
                                    <a href="#">
                                        <LayoutList className="size-4" />
                                        List of Journeys
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Journeys Progress"
                                >
                                    <a href="#">
                                        <Ruler className="size-4" />
                                        Journeys Progress
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarGroupLabel>System</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <div className="flex space-x-4 align-middle">
                                    <SidebarMenuButton
                                        asChild
                                        tooltip="Settings"
                                    >
                                        <a href="#">
                                            <Settings className="size-4" />
                                            Settings
                                        </a>
                                    </SidebarMenuButton>

                                    <SidebarMenuButton asChild tooltip="Theme">
                                        <ThemeSwitcher />
                                    </SidebarMenuButton>
                                </div>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t px-0 py-4">
                {loading ? (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <div className="flex items-left gap-3 p-2">
                                <Avatar>
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback>
                                        <User />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">
                                        Loading...
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        Please wait
                                    </span>
                                </div>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                ) : user ? (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={user.email}>
                                <a
                                    href="#"
                                    className="flex items-left gap-3 p-2"
                                >
                                    <Avatar>
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback>
                                            <User />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">
                                            {user.id || "User name here"}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {user.email}
                                        </span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                ) : (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <div className="flex gap-2 p-2">
                                <SidebarMenuButton
                                    asChild
                                    size="sm"
                                    variant="outline"
                                >
                                    <Link href="/sign-in">Sign in</Link>
                                </SidebarMenuButton>
                                <SidebarMenuButton
                                    asChild
                                    size="sm"
                                    variant="default"
                                >
                                    <Link href="/sign-up">Sign up</Link>
                                </SidebarMenuButton>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
