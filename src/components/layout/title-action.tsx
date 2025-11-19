import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const TitleAction = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
        <p className="text-muted-foreground mt-1">
          Easily manage and track your tasks
        </p>
      </div>
      <Button>
        <PlusCircle />
        Add new task
      </Button>
    </div>
  );
};
