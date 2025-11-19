"use client";

import { TaskModal } from "@/components/modal/task-modal";
import { EditTaskModal } from "@/components/modal/edit-task-modal";

export const DialogProvider = () => {
  return (
    <>
      <TaskModal />
      <EditTaskModal />
    </>
  );
};
