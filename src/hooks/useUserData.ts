import { create } from "zustand";

interface useUserDataProps {
  isOpen: boolean;
  data: any;
  onOpen: (data?: any) => void;
  onClose: () => void;
}

export const useMakeAdmin = create<useUserDataProps>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set(() => ({ isOpen: true, data: data })),
  onClose: () => set(() => ({ isOpen: false, data: null })),
}));
