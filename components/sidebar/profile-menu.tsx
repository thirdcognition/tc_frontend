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
import { User as UserData } from "@/lib_js/models/UserInterfaces";
// import UserSession from "@/lib/utils/session/userSession";

export function ProfileMenu() {
    // const [session, setSession] = useState<UserSession | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [profileName, setProfileName] = useState<string | null>(null);

    const handleProfileChanges = (model: UserData) => {
        if (model.profile?.profilePicture) {
            setProfilePicture(model.profile.profilePicture);
        }
        if (model.profile?.name) {
            setProfileName(model.profile.name);
        }
    };

    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const newSession = await getSession();
            // setSession(newSession);
            if (newSession?.userModel) {
                setUserData(newSession.userModel);
                newSession.userModel.listen(handleProfileChanges);
                handleProfileChanges(newSession.userModel);
            }

            // setLoading(false);
        })();
    });

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                {userData ? (
                    <SidebarMenuButton
                        asChild
                        tooltip={userData?.profile?.email}
                    >
                        <a
                            href="/profile/edit"
                            className="flex items-left gap-3 p-2"
                        >
                            <Avatar>
                                {profilePicture ? (
                                    <AvatarImage src={profilePicture} />
                                ) : (
                                    <AvatarFallback>
                                        <User />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div className="flex flex-col">
                                {profileName ? (
                                    <span className="text-sm font-medium">
                                        {profileName}
                                    </span>
                                ) : (
                                    <span className="text-xs text-muted-foreground">
                                        {userData?.profile?.email}
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
