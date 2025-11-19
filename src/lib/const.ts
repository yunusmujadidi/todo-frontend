import { LayoutDashboard, Settings, ListTodo } from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Overview and statistics",
  },
  {
    title: "My Tasks",
    url: "/tasks",
    icon: ListTodo,
    description: "Manage and track all orders",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "Application settings",
  },
];
