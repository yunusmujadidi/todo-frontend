"use client";

import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusColors, statusLabels } from "@/lib/utils";
import { useConfirm } from "@/hooks/use-confirm";

interface TaskCardProps {
  task: Task;
  onUpdateStatus: (status: Task["status"]) => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function TaskCard({
  task,
  onUpdateStatus,
  onDelete,
  onEdit,
}: TaskCardProps) {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "Are you sure you want to delete this task? This action cannot be undone."
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      onDelete();
    }
  };
  return (
    <>
      <ConfirmDialog />
      <Card className="border-border/50 hover:border-border transition-colors bg-card/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base line-clamp-2 text-foreground">
              {task.title}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="text-lg">⋮</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus("pending")}>
                  Mark Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus("in-progress")}>
                  Mark In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus("done")}>
                  Mark Done
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {task.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                statusColors[task.status]
              }`}
            >
              {statusLabels[task.status]}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
