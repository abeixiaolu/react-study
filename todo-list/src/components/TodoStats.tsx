import { Todo } from "../lib/todo";

interface TodoStatsProps {
  todos: Todo[];
  onClearCompleted: () => void;
}

function TodoStats({ todos, onClearCompleted }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-gray-600 space-x-3">
        <span>总计: {total} </span>
        <span>已完成: {completed}</span>
        <span>未完成: {active}</span>
      </div>
      {completed > 0 && (
        <button
          className="text-red-500 hover:text-red-600"
          onClick={onClearCompleted}
        >
          清除已完成
        </button>
      )}
    </div>
  );
}

export default TodoStats;
