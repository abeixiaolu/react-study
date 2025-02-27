import styles from "../assets/Todo.module.css";
import { Priority } from "../lib/todo";

interface PrioritySelectProps {
  value: Priority;
  onChange: (priority: Priority) => void;
}

export default function PrioritySelect({
  value,
  onChange,
}: PrioritySelectProps) {
  const priorityColors = {
    high: "#ff4757",
    medium: "#ffa502",
    low: "#2ed573",
  };
  return (
    <>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Priority)}
        className={styles.prioritySelect}
        style={{ color: priorityColors[value] }}
      >
        <option value="high">高优先级</option>
        <option value="medium">中优先级</option>
        <option value="low">低优先级</option>
      </select>
    </>
  );
}
