import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

import { ConvexError } from "convex/values";
import { toast } from "sonner";

export const useCreateWorkspace = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.workspaces.create),
        onError: (error) => {
            const errorMessage =
                error instanceof ConvexError
                    ? error.data
                    : "Unexpected error occurred";

            toast.error(errorMessage);
        },
    });

    return mutation;
};
