import React from "react";
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface ProfileMenuProps {
    user: SupabaseUser;
}

export function ProfileMenu({ user }: ProfileMenuProps) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={user.email}>
                    <a href="#" className="flex items-left gap-3 p-2">
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
    );
}
