import { useState, useCallback, useRef, useEffect } from "react";

function useDragAndDrop<T>(initialItems: T[]) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const startItemsRef = useRef<T[]>([]);

  // 当外部 items 更新时同步状态
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleDragStart = useCallback(
    (index: number) => {
      setDraggedIndex(index);
      startItemsRef.current = [...items];
    },
    [items]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (draggedIndex === null || draggedIndex === index) return;

      const newItems = [...items];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      setDraggedIndex(index);
      setItems(newItems);
    },
    [draggedIndex, items]
  );

  const handleDragEnd = useCallback(
    (onComplete: (items: T[]) => void) => {
      if (draggedIndex !== null) {
        const hasChanged =
          JSON.stringify(startItemsRef.current) !== JSON.stringify(items);
        if (hasChanged) {
          onComplete(items);
        }
      }
      setDraggedIndex(null);
      startItemsRef.current = [];
    },
    [draggedIndex, items]
  );

  return {
    draggedIndex,
    items,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}

export default useDragAndDrop;
