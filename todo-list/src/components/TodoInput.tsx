import { useState } from "react";
import { Priority } from "../lib/todo";
import PrioritySelect from "./PrioritySelect";

interface TodoInputProps {
  onSubmit: (text: string, priority: Priority) => void;
}

export default function TodoInput({ onSubmit }: TodoInputProps) {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input, priority);
      setInput("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="添加待办任务"
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <PrioritySelect value={priority} onChange={setPriority} />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        添加
      </button>
    </form>
  );
}
