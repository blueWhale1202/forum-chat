import { createStore } from "zustand/vanilla";

export type ModalType = "create-workspace";

export type ModalData = {};

export type ModalState = {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
};

export type ModalActions = {
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const defaultInitState: ModalState = {
    type: null,
    isOpen: false,
    data: {},
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
    return createStore<ModalStore>()((set) => ({
        ...initState,
        onOpen: (type, data = {}) => set(() => ({ isOpen: true, type, data })),
        onClose: () => set(() => ({ isOpen: false, type: null, data: {} })),
    }));
};
