"use client";

import * as React from "react";

import { Sidebar, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { createClient } from "@/lib/utils/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { SignInUpMenu } from "./sidebar/sign-in-up-menu";
import { ProfileMenu } from "./sidebar/profile-menu";
import { LoadingPlaceholder } from "./sidebar/loading-placeholder";
import { LoggedInSidebar } from "./sidebar/logged-in-sidebar";
import { LoggedOutSidebar } from "./sidebar/logged-out-sidebar";

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
            {loading ? (
                <LoadingPlaceholder />
            ) : user ? (
                <LoggedInSidebar />
            ) : (
                <LoggedOutSidebar />
            )}
            <SidebarFooter className="border-t px-0 py-4">
                {loading ? (
                    <LoadingPlaceholder />
                ) : user ? (
                    <ProfileMenu user={user} />
                ) : (
                    <SignInUpMenu />
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
