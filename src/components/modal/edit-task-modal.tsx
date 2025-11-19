"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditTaskModal } from "@/hooks/use-task";
import { TaskForm } from "../forms/task-form";

export const EditTaskModal = () => {
  const { onClose, isOpen, task } = useEditTaskModal();

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update the task details below.</DialogDescription>
        </DialogHeader>
        {task && (
          <TaskForm task={task} onSuccess={handleSuccess} onCancel={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};
