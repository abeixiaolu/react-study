import { FilterStatus } from "../lib/todo";
import styles from "../assets/Todo.module.css";

interface TodoFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}
export default function TodoFilter({
  currentFilter,
  onFilterChange,
}: TodoFilterProps) {
  return (
    <div className={styles.filterGroup}>
      <button
        className={`${styles.filterButton} ${
          currentFilter === "all" ? styles.active : ""
        }`}
        onClick={() => onFilterChange("all")}
      >
        全部
      </button>
      <button
        className={`${styles.filterButton} ${
          currentFilter === "active" ? styles.active : ""
        }`}
        onClick={() => onFilterChange("active")}
      >
        未完成
      </button>
      <button
        className={`${styles.filterButton} ${
          currentFilter === "completed" ? styles.active : ""
        }`}
        onClick={() => onFilterChange("completed")}
      >
        已完成
      </button>
    </div>
  );
}
