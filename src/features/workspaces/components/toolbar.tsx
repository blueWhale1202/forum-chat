"use client";

import { Button } from "@/components/ui/button";

import { Info, Search } from "lucide-react";

import { useGetWorkSpace } from "../api/use-get-workspace";
import { useWorkspaceId } from "../hooks/use-workspace-id";

export const Toolbar = () => {
    const workspaceId = useWorkspaceId();
    const { data } = useGetWorkSpace({ id: workspaceId });

    return (
        <nav className="bg-blue-1 flex h-10 items-center justify-between p-1.5">
            <div className="flex-1" />

            <div className="min-w-[280px] max-w-[642px] shrink grow-[2]">
                <Button
                    size="sm"
                    className="h-7 w-full justify-start bg-accent/25 px-2 hover:bg-accent/30"
                    onClick={() => {}}
                >
                    <Search className="mr-2 size-4 text-white" />
                    <span className="text-xs capitalize text-white">
                        Search in {data?.name}
                    </span>
                </Button>
            </div>

            <div className="ml-auto flex flex-1 items-center justify-end">
                <Button variant="transparent" size={"icon-sm"}>
                    <Info className="size-4 text-white" />
                </Button>
            </div>
        </nav>
    );
};
