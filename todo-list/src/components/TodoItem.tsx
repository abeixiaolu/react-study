import { memo, useEffect, useRef, useState } from "react";
import { Priority, Todo } from "../lib/todo";
import PrioritySelect from "./PrioritySelect";

interface TodoItemProps {
  todo: Todo;
  index: number;
  isDragging: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onPriorityChange: (id: string, priority: Priority) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}

const TodoItem = memo(function TodoItem({
  todo,
  index,
  isDragging,
  onToggle,
  onDelete,
  onEdit,
  onPriorityChange,
  onDragStart,
  onDragOver,
  onDragEnd,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const priorityStyles = {
    high: "border-l-4 border-red-500 bg-red-50",
    medium: "border-l-4 border-yellow-500 bg-yellow-50",
    low: "border-l-4 border-green-500 bg-green-50",
  };

  const handleSubmit = () => {
    const trimmedText = editedText.trim();
    if (trimmedText) {
      onEdit(todo.id, trimmedText);
    } else {
      setEditedText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setEditedText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e, index)}
      className={`
      flex items-center gap-2 justify-between text-gray-800 p-4
      transition-all duration-200 ease-in-out
      ${priorityStyles[todo.priority]}
      ${isDragging ? "opacity-50 scale-105 shadow-lg" : "opacity-100"}
      ${!isDragging && "hover:shadow-md transform hover:-translate-y-0.5"}
      cursor-move rounded-lg
    `}
    >
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-400 cursor-move"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6h18M3 12h18M3 18h18"
          />
        </svg>

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            className={`${todo.completed ? "line-through" : ""}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="space-x-2">
        <PrioritySelect
          value={todo.priority}
          onChange={(priority) => onPriorityChange(todo.id, priority)}
        />

        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          删除
        </button>
      </div>
    </div>
  );
});

export default TodoItem;
