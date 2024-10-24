"use client";

import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

import { Info, Search } from "lucide-react";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetWorkSpace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Toolbar = () => {
    const workspaceId = useWorkspaceId();
    const { data: workspace } = useGetWorkSpace({ id: workspaceId });
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const { data: channels } = useGetChannels();
    const { data: members } = useGetMembers();

    useEffect(() => {
        const keydown = (e: KeyboardEvent) => {
            if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(true);
            }
        };
        document.addEventListener("keydown", keydown);

        return () => {
            document.removeEventListener("keydown", keydown);
        };
    }, []);

    const handleSelect = (href: string) => {
        router.push(href);
        setOpen(false);
    };
    return (
        <nav className="flex h-10 items-center justify-between bg-blue-1 p-1.5">
            <div className="flex-1" />

            <div className="min-w-[280px] max-w-[642px] shrink grow-[2]">
                <Button
                    size="sm"
                    className="h-7 w-full justify-start bg-accent/25 px-2 hover:bg-accent/30"
                    onClick={() => setOpen(true)}
                >
                    <Search className="mr-2 size-4 text-white" />
                    <span className="text-xs capitalize text-white">
                        Search in {workspace?.name}
                    </span>
                </Button>

                <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Channels">
                            {channels?.map((channel) => (
                                <CommandItem
                                    key={channel._id}
                                    onSelect={() =>
                                        handleSelect(
                                            `/workspaces/${workspace?._id}/channels/${channel._id}`,
                                        )
                                    }
                                >
                                    {channel.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>

                        <CommandSeparator />

                        <CommandGroup heading="Members">
                            {members?.map((member) => (
                                <CommandItem
                                    key={member._id}
                                    onSelect={() =>
                                        handleSelect(
                                            `/workspaces/${workspace?._id}/member/${member._id}`,
                                        )
                                    }
                                >
                                    {member.user.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
            </div>

            <div className="ml-auto flex flex-1 items-center justify-end">
                <Button variant="transparent" size={"icon-sm"}>
                    <Info className="size-4 text-white" />
                </Button>
            </div>
        </nav>
    );
};
