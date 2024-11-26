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
import { Home, LayoutList, Ruler, Building2 } from "lucide-react";
import { SidebarMenuItemComponent } from "./menu-item";
// import { User as UserModel } from "@/lib_js/models/user.js";
import getSession from "@/lib/utils/session/getClientSession";
import { Organizations } from "@/lib_js/models/supabase/organizationInterfaces";
import { AvatarImage } from "@radix-ui/react-avatar";

export function LoggedInSidebar() {
    // const [user, setUser] = React.useState<UserModel | null>(null);
    const [organization, setOrganization] =
        React.useState<Organizations | null>(null);
    React.useEffect(() => {
        (async () => {
            const session = await getSession();
            // setUser(session.userModel);
            setOrganization(
                (await session.userModel.organization) as Organizations
            );
            console.log(session.userModel);
            console.log(organization);
            // setLoading(false);
        })();
    });

    return (
        <>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" tooltip="Dashboard">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                {organization && organization.logo ? (
                                    <AvatarImage src={organization.logo} />
                                ) : (
                                    <Building2 className="size-4" />
                                )}
                            </div>
                            {organization && organization.name ? (
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold">
                                        {organization.name}
                                    </span>
                                    <span className="text-xs">
                                        Welcome Back!
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs">
                                        Welcome Back!
                                    </span>
                                </div>
                            )}
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
                            {/* <SidebarMenuItemComponent
                                href="#"
                                icon={LayoutList}
                                label="My Journeys"
                                tooltip="My Journeys"
                            /> */}
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
