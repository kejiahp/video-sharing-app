import { create } from "zustand";

interface useAdvertProps {
  isOpen: boolean;
  data: any;
  onOpen: (data?: any) => void;
  onClose: () => void;
}

export const useCreateAdvert = create<useAdvertProps>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set(() => ({ data: data, isOpen: true })),
  onClose: () => set(() => ({ data: null, isOpen: false })),
}));

export const useUpdateAdvert = create<useAdvertProps>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set(() => ({ data: data, isOpen: true })),
  onClose: () => set(() => ({ data: null, isOpen: false })),
}));

export const useDeleteAdvert = create<useAdvertProps>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set(() => ({ data: data, isOpen: true })),
  onClose: () => set(() => ({ data: null, isOpen: false })),
}));
