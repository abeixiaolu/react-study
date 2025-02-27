import { useState } from "react";
import { Priority, Todo } from "../lib/todo";
import PrioritySelect from "./PrioritySelect";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onPriorityChange: (id: string, priority: Priority) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onPriorityChange,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

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
    <div className="flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {isEditing ? (
          <input
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
}
