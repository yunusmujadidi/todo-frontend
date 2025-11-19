"use client";

import { useEffect, useState } from "react";
import { TaskCard } from "@/components/cards/task-card";
import { getTasks, updateTask, deleteTask } from "@/lib/api";
import { FilterStatus, Task } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEditTaskModal } from "@/hooks/use-task";

export const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const { onOpen: openEditModal } = useEditTaskModal();

  const fetchTasks = async (status?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTasks(status);
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

  const handleFilterChange = (status: FilterStatus) => {
    setFilterStatus(status);
    if (status === "all") {
      fetchTasks();
    } else {
      fetchTasks(status);
    }
  };

  const handleUpdateStatus = async (taskId: number, status: Task["status"]) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      await updateTask(taskId, task.title, task.description, status);
      toast.success("Task status updated successfully");
      handleFilterChange(filterStatus);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  const handleEdit = (task: Task) => {
    openEditModal(task);
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully");
      handleFilterChange(filterStatus);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  useEffect(() => {
    // Initial fetch
    if (filterStatus === "all") {
      fetchTasks();
    } else {
      fetchTasks(filterStatus);
    }

    // listen for task updates
    const handleTaskUpdate = () => {
      if (filterStatus === "all") {
        fetchTasks();
      } else {
        fetchTasks(filterStatus);
      }
    };

    window.addEventListener("taskUpdated", handleTaskUpdate);

    return () => {
      window.removeEventListener("taskUpdated", handleTaskUpdate);
    };
  }, [filterStatus]);

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filterStatus === "all" ? "default" : "outline"}
          onClick={() => handleFilterChange("all")}
          disabled={isLoading}
        >
          All Tasks
        </Button>
        <Button
          variant={filterStatus === "pending" ? "default" : "outline"}
          onClick={() => handleFilterChange("pending")}
          disabled={isLoading}
          className={
            filterStatus === "pending"
              ? ""
              : "hover:bg-yellow-500/10 hover:text-yellow-700 hover:border-yellow-500/50"
          }
        >
          Pending
        </Button>
        <Button
          variant={filterStatus === "in-progress" ? "default" : "outline"}
          onClick={() => handleFilterChange("in-progress")}
          disabled={isLoading}
          className={
            filterStatus === "in-progress"
              ? ""
              : "hover:bg-blue-500/10 hover:text-blue-700 hover:border-blue-500/50"
          }
        >
          In Progress
        </Button>
        <Button
          variant={filterStatus === "done" ? "default" : "outline"}
          onClick={() => handleFilterChange("done")}
          disabled={isLoading}
          className={
            filterStatus === "done"
              ? ""
              : "hover:bg-green-500/10 hover:text-green-700 hover:border-green-500/50"
          }
        >
          Done
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {filterStatus === "all"
              ? "No tasks yet. Create your first task!"
              : `No ${filterStatus.replace("-", " ")} tasks found.`}
          </p>
        </div>
      )}

      {/* Tasks Grid */}
      {!isLoading && !error && tasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={(status) => handleUpdateStatus(task.id, status)}
              onDelete={() => handleDelete(task.id)}
              onEdit={() => handleEdit(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
