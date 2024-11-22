"use client";

import * as React from "react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";

interface SidebarMenuItemComponentProps {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    tooltip: string;
}

export function SidebarMenuItemComponent({
    href,
    icon: Icon,
    label,
    tooltip
}: SidebarMenuItemComponentProps) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={tooltip}>
                <Link href={href}>
                    <Icon className="size-4" />
                    {label}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
