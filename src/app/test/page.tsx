"use client";

import { MediaRoom } from "@/components/media-room";
import { toast } from "sonner";

export default function TestPage() {
    return (
        <>
            <MediaRoom
                chatId="123"
                onDisconnected={() => {
                    toast.warning("Disconnect");
                }}
            />
        </>
    );
}
