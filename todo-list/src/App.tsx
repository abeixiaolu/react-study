import { useMemo, useState } from "react";
import TodoInput from "./components/TodoInput";
import { FilterStatus, sortTodos } from "./lib/todo";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import TodoStats from "./components/TodoStats";
import TodoSort from "./components/TodoSort";
import useTodos from "./hooks/useTodos";

function App() {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<"priority" | "none">("none"); // 新增
  const {
    todos,
    draggedIndex,
    addTodo,
    toggleTodo,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    undo,
    redo,
    canUndo,
    canRedo,
    clearCompleted,
    deleteTodo,
    editTodo,
    changePriority,
  } = useTodos();

  const processedTodos = useMemo(() => {
    return sortTodos(
      todos.filter((todo) => {
        if (filter === "all") return true;
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return false;
      }),
      sortBy
    );
  }, [todos, filter, sortBy]);

  return (
    <div className="max-w-2xl h-[80vh] mt-4 overflow-auto mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Todo List {draggedIndex}
        </h1>
        <div className="space-x-2">
          {canUndo && (
            <button
              onClick={undo}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              title="撤销"
            >
              ↩️ 撤销
            </button>
          )}
          {canRedo && (
            <button
              onClick={redo}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              title="重做"
            >
              ↪️ 重做
            </button>
          )}
        </div>
      </div>
      <TodoStats todos={todos} onClearCompleted={clearCompleted} />
      <TodoInput onSubmit={addTodo} />
      <div className="flex justify-between items-center my-4">
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        <TodoSort sortBy={sortBy} onSortChange={setSortBy} />
      </div>
      <div className="space-y-2">
        {processedTodos.map((todo, index) => (
          <TodoItem
            index={index}
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onPriorityChange={changePriority}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            isDragging={draggedIndex === index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
