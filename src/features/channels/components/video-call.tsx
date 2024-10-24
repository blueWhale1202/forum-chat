"use client";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Headset } from "lucide-react";
import { useRouter } from "next/navigation";

export const VideoCall = () => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            className="ml-auto"
            onClick={() => {
                router.push(`/meet/${workspaceId}`);
            }}
        >
            <Headset className="size-6 text-muted-foreground" />
        </Button>
    );
};
