import { TitleAction } from "@/components/layout/title-action";
import { TasksList } from "@/components/tasks/tasks-list";

const Page = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <TitleAction />

      {/* Tasks List */}
      <TasksList />
    </div>
  );
};

export default Page;
