interface TodoSortProps {
  sortBy: "priority" | "none";
  onSortChange: (sort: "priority" | "none") => void;
}

function TodoSort({ sortBy, onSortChange }: TodoSortProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        className={`${
          sortBy === "priority" ? "bg-red-500 text-white" : ""
        } px-4 py-2 rounded-md bg-blue-500 text-white`}
        onClick={() =>
          onSortChange(sortBy === "priority" ? "none" : "priority")
        }
      >
        {sortBy === "priority" ? "取消排序" : "按优先级排序"}
      </button>
    </div>
  );
}

export default TodoSort;
