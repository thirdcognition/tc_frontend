import React, { useEffect, useState } from "react";
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
// import { User as SupabaseUser } from "@supabase/supabase-js";
import getSession from "@/lib/utils/session/getClientSession";
import { User as UserModel } from "@/lib_js/models/UserInterfaces";
import UserSession from "@/lib/utils/session/userSession";

export function ProfileMenu() {
    const [session, setSession] = useState<UserSession | null>(null);
    const [user, setUser] = useState<UserModel | null>(null);
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const userSession = await getSession();
            setSession(userSession);
            setUser(userSession.userModel);
            console.log(userSession.userModel);
            // setLoading(false);
        })();
    });

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                {user ? (
                    <SidebarMenuButton asChild tooltip={user.profile.email}>
                        <a
                            href="/profile/edit"
                            className="flex items-left gap-3 p-2"
                        >
                            <Avatar>
                                {user.profile.profilePicture && session ? (
                                    <AvatarImage
                                        src={user.profile.profilePicture}
                                    />
                                ) : (
                                    <AvatarFallback>
                                        <User />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div className="flex flex-col">
                                {user.profile.name ? (
                                    <span className="text-sm font-medium">
                                        {user.profile.name}
                                    </span>
                                ) : (
                                    <span className="text-xs text-muted-foreground">
                                        {user.profile.email}
                                    </span>
                                )}
                            </div>
                        </a>
                    </SidebarMenuButton>
                ) : (
                    ""
                )}
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
