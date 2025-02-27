import { useCallback, useEffect } from "react";
import { Priority, Todo } from "../lib/todo";
import useLocalStorage from "./useLocalStorage";
import useUndoRedo from "./useUndoRedo";
import useDragAndDrop from "./useDragAndDrop";

function useTodos() {
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>("todos", []);

  const {
    present: todos,
    updatePresent: updateTodosWithHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo(storedTodos);

  // 同步 todos 到 localStorage
  useEffect(() => {
    setStoredTodos(todos);
  }, [todos, setStoredTodos]);

  const {
    items: dragTodos,
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop(todos);

  // 包装拖拽结束的处理函数
  const handleDragEndWithHistory = useCallback(() => {
    handleDragEnd((newTodos) => {
      updateTodosWithHistory(newTodos);
    });
  }, [handleDragEnd, updateTodosWithHistory]);

  const addTodo = useCallback(
    (text: string, priority: Priority) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false,
        priority,
      };
      updateTodosWithHistory([newTodo, ...todos]);
    },
    [todos, updateTodosWithHistory]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      updateTodosWithHistory(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [todos, updateTodosWithHistory]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      updateTodosWithHistory(todos.filter((todo) => todo.id !== id));
    },
    [todos, updateTodosWithHistory]
  );

  const editTodo = useCallback(
    (id: string, text: string) => {
      updateTodosWithHistory(
        todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
      );
    },
    [todos, updateTodosWithHistory]
  );

  const changePriority = useCallback(
    (id: string, priority: Priority) => {
      updateTodosWithHistory(
        todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
      );
    },
    [todos, updateTodosWithHistory]
  );

  const clearCompleted = useCallback(() => {
    updateTodosWithHistory(todos.filter((todo) => !todo.completed));
  }, [todos, updateTodosWithHistory]);

  return {
    todos: dragTodos,
    draggedIndex,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    changePriority,
    clearCompleted,
    handleDragStart,
    handleDragOver,
    handleDragEnd: handleDragEndWithHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}

export default useTodos;
