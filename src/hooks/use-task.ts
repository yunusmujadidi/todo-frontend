import { create } from "zustand";
import { Task } from "@/lib/types";

type NewTaskState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewTaskModal = create<NewTaskState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

type EditTaskState = {
  isOpen: boolean;
  task: Task | null;
  onOpen: (task: Task) => void;
  onClose: () => void;
};

export const useEditTaskModal = create<EditTaskState>((set) => ({
  isOpen: false,
  task: null,
  onOpen: (task: Task) => set({ isOpen: true, task }),
  onClose: () => set({ isOpen: false, task: null }),
}));
