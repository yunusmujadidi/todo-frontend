import { TitleAction } from "@/components/layout/title-action";
import { TasksTable } from "@/components/tasks/tasks-table";

const TasksPage = () => {
  return (
    <div className="p-6 space-y-6">
      <TitleAction />
      <TasksTable />
    </div>
  );
};

export default TasksPage;
