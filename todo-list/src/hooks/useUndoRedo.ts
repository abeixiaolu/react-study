import { useCallback, useRef, useState } from "react";

interface History<T> {
  past: T[];
  present: T;
  future: T[];
}

function useUndoRedo<T>(initialPresent: T) {
  const historyRef = useRef<History<T>>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const [present, setPresent] = useState(initialPresent);

  const canUndo = historyRef.current.past.length > 0;
  const canRedo = historyRef.current.future.length > 0;

  const updatePresent = useCallback((newPresent: T) => {
    historyRef.current = {
      past: [...historyRef.current.past, historyRef.current.present],
      present: newPresent,
      future: [],
    };
    setPresent(newPresent);
  }, []);

  const undo = useCallback(() => {
    const { past, present, future } = historyRef.current;

    if (past.length === 0) return present;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    historyRef.current = {
      past: newPast,
      present: previous,
      future: [present, ...future],
    };
    setPresent(previous);
  }, []);

  const redo = useCallback(() => {
    const { past, present, future } = historyRef.current;

    if (future.length === 0) return present;

    const next = future[0];
    const newFuture = future.slice(1);

    historyRef.current = {
      past: [...past, present],
      present: next,
      future: newFuture,
    };

    setPresent(next);
  }, []);

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
