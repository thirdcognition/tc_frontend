"use client";

import * as React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { User } from "lucide-react";

export function LoadingPlaceholder() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            {/* <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                    <User />
                </AvatarFallback>
            </Avatar> */}
            <div className="flex flex-col mt-2">
                <span className="text-sm font-medium">Loading...</span>
                <span className="text-xs text-muted-foreground">
                    Please wait
                </span>
            </div>
        </div>
    );
}
