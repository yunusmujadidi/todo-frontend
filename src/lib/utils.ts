import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  "in-progress": "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  done: "bg-green-500/20 text-green-700 dark:text-green-400",
};

export const statusLabels = {
  pending: "Pending",
  "in-progress": "In Progress",
  done: "Done",
};
