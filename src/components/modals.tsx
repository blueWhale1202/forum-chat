"use client";

import { CreateChannelModal } from "@/features/channels/components/create-channel-modal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { DeleteWorkspaceDialog } from "@/features/workspaces/components/delete-workspace-modal";
import { EditWorkspaceModal } from "@/features/workspaces/components/edit-workspace-modal";
import { InviteModal } from "@/features/workspaces/components/invite-modal";

import { useMounted } from "@/hooks/use-mounted";

export const Modals = () => {
    const mounted = useMounted();

    if (!mounted) return null;

    return (
        <div>
            <CreateWorkspaceModal />
            <InviteModal />
            <EditWorkspaceModal />
            <DeleteWorkspaceDialog />

            <CreateChannelModal />
        </div>
    );
};
