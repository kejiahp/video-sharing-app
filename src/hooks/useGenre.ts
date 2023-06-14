import { create } from "zustand";

interface useGenreModalStore {
  isOpen: boolean;
  data: any;
  onOpen: (data?: any) => void;
  onClose: () => void;
}

export const useRenameGenre = create<useGenreModalStore>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data?: any) => set(() => ({ data: data, isOpen: true })),
  onClose: () => set(() => ({ data: null, isOpen: false })),
}));

export const useDeleteGenre = create<useGenreModalStore>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data?: any) => set(() => ({ data: data, isOpen: true })),
  onClose: () => set(() => ({ data: null, isOpen: false })),
}));
