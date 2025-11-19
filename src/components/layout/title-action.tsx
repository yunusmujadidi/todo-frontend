"use client";
import { Button } from "@/components/ui/button";
import { useNewTaskModal } from "@/hooks/use-task";
import { PlusCircle } from "lucide-react";

export const TitleAction = () => {
  const { onOpen } = useNewTaskModal();
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
        <p className="text-muted-foreground mt-1">
          Easily manage and track your tasks
        </p>
      </div>
      <Button onClick={onOpen}>
        <PlusCircle />
        Add new task
      </Button>
    </div>
  );
};
