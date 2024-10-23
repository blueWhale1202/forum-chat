import { createStore } from "zustand/vanilla";
import { Doc } from "../../convex/_generated/dataModel";

export type ModalType =
    | "create-workspace"
    | "update-workspace"
    | "delete-workspace";

export type Workspace = Partial<Doc<"workspaces">>;

export type ModalState = {
    type: ModalType | null;
    workspace?: Workspace;
    isOpen: boolean;
};

export type ModalActions = {
    onOpen: (type: ModalType, workspace?: Workspace) => void;
    onClose: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const defaultInitState: ModalState = {
    type: null,
    isOpen: false,
    workspace: {},
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
    return createStore<ModalStore>()((set) => ({
        ...initState,
        onOpen: (type, workspace) =>
            set(() => ({ isOpen: true, type, workspace })),
        onClose: () =>
            set(() => ({ isOpen: false, type: null, workspace: {} })),
    }));
};
