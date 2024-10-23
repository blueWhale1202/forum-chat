"use client";

import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { useModalStore } from "@/providers/modal-store-provider";

import { useDeleteWorkspace } from "../api/use-delete-workspace";

export const DeleteWorkspaceDialog = () => {
    const { type, isOpen, onClose, workspace } = useModalStore(
        (state) => state,
    );
    const isOpenModal = isOpen && type === "delete-workspace";

    const { mutate, isPending } = useDeleteWorkspace();

    const router = useRouter();

    if (!workspace) {
        return null;
    }

    const onDelete = () => {
        mutate(
            {
                id: workspace._id!,
            },
            {
                onSuccess: () => {
                    router.replace(`/`);
                    toast.success("Deleted workspace");
                },
            },
        );
    };

    return (
        <AlertDialog open={isOpenModal} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete{" "}
                        <span className="font-semibold">{workspace.name}</span>{" "}
                        workspace?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete workspace and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={onDelete} disabled={isPending}>
                            Continue
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
