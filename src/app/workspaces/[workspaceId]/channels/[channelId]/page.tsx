"use client";

import { ChannelHeader } from "@/features/channels/components/channel-header";
import { useCurrentChannel } from "@/features/channels/hooks/use-current-channel";
import { Loader, TriangleAlert } from "lucide-react";

export default function ChannelIdPage() {
    const { isPending, data: channel } = useCurrentChannel();

    if (isPending) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center">
                <Loader className="size-5 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!channel) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-2">
                <TriangleAlert className="size-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                    Channel not found
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <ChannelHeader title={channel.name} />
        </div>
    );
}
