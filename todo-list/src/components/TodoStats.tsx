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
    <div
      style={{
        margin: "1rem 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <span>总计: {total} | </span>
        <span>已完成: {completed} | </span>
        <span>未完成: {active}</span>
      </div>
      {completed > 0 && <button onClick={onClearCompleted}>清除已完成</button>}
    </div>
  );
}

export default TodoStats;
