import React, { useState, useRef } from "react";

export function MouseTracker({
  render,
}: {
  render: (state: { x: number; y: number }) => React.ReactNode;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-64 border-2 border-gray-300 rounded-lg p-4 bg-gray-50 relative"
      onMouseMove={handleMouseMove}
    >
      {/* 调用 render prop 函数，传入当前鼠标位置 */}
      {render(mousePosition)}
    </div>
  );
}

// 另一种实现方式：使用 children 作为函数
export function MouseTrackerWithChildren({
  children,
  className,
}: {
  children: (state: { x: number; y: number }) => React.ReactNode;
  className?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-64 border-2 border-gray-300 rounded-lg p-4 bg-gray-50 mt-4 relative ${
        className || ""
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* 调用 children 函数，传入当前鼠标位置 */}
      {children(mousePosition)}
    </div>
  );
}
