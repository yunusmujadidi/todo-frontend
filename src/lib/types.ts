export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

export type FilterStatus = "all" | "pending" | "in-progress" | "done";
