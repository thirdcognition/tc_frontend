import React, { ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface AppPageContainerProps {
    headerContent: ReactNode;
    children: ReactNode;
}

const AppPageContainer: React.FC<AppPageContainerProps> = ({
    headerContent,
    children
}) => {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 bg-background px-3 py-3 flex items-center">
                <SidebarTrigger />
                <div className="ml-7">{headerContent}</div>
            </header>
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
};

export default AppPageContainer;
