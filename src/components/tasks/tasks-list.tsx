"use client";

import { useEffect, useState } from "react";
import { TaskCard } from "@/components/cards/task-card";
import { getTasks, updateTask, deleteTask } from "@/lib/api";
import { Task } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleDelete = async (taskId: number) => {
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

    // listen for task updates
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

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tasks yet. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdateStatus={(status) => handleUpdateStatus(task.id, status)}
          onDelete={() => handleDelete(task.id)}
        />
      ))}
    </div>
  );
};
