import { create } from "zustand";

interface useDeleteMovieProps {
  isOpen: boolean;
  data: any;
  onOpen: (data?: any) => void;
  onClose: () => void;
}

export const useDeleteMovie = create<useDeleteMovieProps>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set(() => ({ isOpen: true, data: data })),
  onClose: () => set(() => ({ isOpen: false, data: null })),
}));
