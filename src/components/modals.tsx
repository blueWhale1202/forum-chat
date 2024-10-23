"use client";

import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { DeleteWorkspaceDialog } from "@/features/workspaces/components/delete-workspace-modal";
import { EditWorkspaceModal } from "@/features/workspaces/components/edit-workspace-modal";

import { useMounted } from "@/hooks/use-mounted";

export const Modals = () => {
    const mounted = useMounted();

    if (!mounted) return null;

    return (
        <div>
            <CreateWorkspaceModal />
            <EditWorkspaceModal />
            <DeleteWorkspaceDialog />
        </div>
    );
};
