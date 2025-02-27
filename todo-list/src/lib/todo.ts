export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
}

export type FilterStatus = "all" | "active" | "completed";

export type Priority = "high" | "medium" | "low";

const priorityWeight = {
  high: 3,
  medium: 2,
  low: 1,
};

export const sortTodos = (
  todos: Todo[],
  sortBy: "priority" | "none"
): Todo[] => {
  if (sortBy === "none") return todos;

  return [...todos].sort((a, b) => {
    // 优先级排序：高 -> 中 -> 低
    return priorityWeight[b.priority] - priorityWeight[a.priority];
  });
};
