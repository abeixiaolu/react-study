import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import { FilterStatus, Priority, sortTodos, Todo } from "./lib/todo";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import TodoStats from "./components/TodoStats";
import TodoSort from "./components/TodoSort";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Priority) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
    };
    setTodos([...todos, newTodo]);
  };

  const changePriority = (id: string, priority: Priority) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
    );
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  const [filter, setFilter] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<"priority" | "none">("none"); // 新增
  // 先过滤，再排序
  const processedTodos = sortTodos(
    todos.filter((todo) => {
      switch (filter) {
        case "active":
          return !todo.completed;
        case "completed":
          return todo.completed;
        default:
          return true;
      }
    }),
    sortBy
  );

  const editTodo = (id: string, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Todo List
      </h1>
      <TodoStats todos={todos} onClearCompleted={clearCompleted} />
      <TodoInput onSubmit={addTodo} />
      <div className="flex justify-between items-center my-4">
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        <TodoSort sortBy={sortBy} onSortChange={setSortBy} />
      </div>
      <div className="space-y-2">
        {processedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onPriorityChange={changePriority}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
