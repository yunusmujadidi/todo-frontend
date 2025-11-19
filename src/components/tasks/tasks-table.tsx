"use client";

import { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "@/lib/api";
import { Task } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/tables/data-table";
import { createColumns } from "@/components/tables/columns";
import { useConfirm } from "@/hooks/use-confirm";
import { useEditTaskModal } from "@/hooks/use-task";

export const TasksTable = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { onOpen: openEditModal } = useEditTaskModal();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "Are you sure you want to delete this task? This action cannot be undone."
  );

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTasks();
      const tasksData = Array.isArray(response.data)
        ? response.data
        : response.data?.tasks || [];
      setTasks(tasksData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (taskId: number, status: Task["status"]) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      await updateTask(taskId, task.title, task.description, status);
      toast.success("Task status updated successfully");
      fetchTasks();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  const handleEdit = (task: Task) => {
    openEditModal(task);
  };

  const handleDelete = async (taskId: number) => {
    const ok = await confirm();
    if (!ok) return;

    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();

    const handleTaskUpdate = () => {
      fetchTasks();
    };

    window.addEventListener("taskUpdated", handleTaskUpdate);

    return () => {
      window.removeEventListener("taskUpdated", handleTaskUpdate);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  const columns = createColumns(handleUpdateStatus, handleDelete, handleEdit);

  return (
    <>
      <ConfirmDialog />
      <DataTable
        columns={columns}
        data={tasks}
        searchKey="title"
        searchPlaceholder="Search tasks..."
      />
    </>
  );
};
