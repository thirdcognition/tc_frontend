import React from "react";
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

export function SignInUpMenu() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex gap-2 p-2">
                    <SidebarMenuButton asChild size="sm" variant="outline">
                        <Link href="/sign-in">
                            <LogIn className="size-4" />
                            Sign in
                        </Link>
                    </SidebarMenuButton>
                    <SidebarMenuButton asChild size="sm" variant="default">
                        <Link href="/sign-up">
                            <UserPlus className="size-4" />
                            Sign up
                        </Link>
                    </SidebarMenuButton>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
