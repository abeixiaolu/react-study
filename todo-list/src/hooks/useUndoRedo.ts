import { useCallback, useRef, useState } from "react";

interface History<T> {
  past: T[];
  future: T[];
}

function useUndoRedo<T>(initialPresent: T) {
  const historyRef = useRef<History<T>>({
    past: [],
    future: [],
  });

  const [present, setPresent] = useState(initialPresent);

  const canUndo = historyRef.current.past.length > 0;
  const canRedo = historyRef.current.future.length > 0;

  const updatePresent = useCallback(
    (newPresent: T) => {
      historyRef.current = {
        past: [...historyRef.current.past, present],
        future: [],
      };
      setPresent(newPresent);
    },
    [present]
  );

  const undo = useCallback(() => {
    const { past, future } = historyRef.current;

    if (past.length === 0) return present;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    historyRef.current = {
      past: newPast,
      future: [present, ...future],
    };
    setPresent(previous);
  }, [present]);

  const redo = useCallback(() => {
    const { past, future } = historyRef.current;

    if (future.length === 0) return present;

    const next = future[0];
    const newFuture = future.slice(1);

    historyRef.current = {
      past: [...past, present],
      future: newFuture,
    };

    setPresent(next);
  }, [present]);

  return {
    present,
    updatePresent,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}

export default useUndoRedo;
