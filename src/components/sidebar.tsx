"use client";

import { usePathname } from "next/navigation";

import { SidebarButton } from "@/components/sidebar-button";
import { UserButton } from "@/components/user-button";
import { WorkspaceSwitcher } from "@/features/workspaces/components/workspace-switcher";

import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";

export const Sidebar = () => {
    const pathname = usePathname();
    return (
        <aside className="bg-blue-1 flex h-full w-[70px] flex-col items-center gap-y-4 pb-4 pt-[9px]">
            <WorkspaceSwitcher />

            <SidebarButton
                Icon={Home}
                label="Home"
                isActive={pathname.includes("/workspaces")}
            />
            <SidebarButton Icon={MessageSquare} label="DMs" />
            <SidebarButton Icon={Bell} label="Activity" />
            <SidebarButton Icon={MoreHorizontal} label="More" />

            <div className="mt-auto flex flex-col items-center justify-center gap-y-1">
                <UserButton />
            </div>
        </aside>
    );
};
