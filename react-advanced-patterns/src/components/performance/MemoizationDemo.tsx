import React, { useState, useCallback, useMemo } from "react";

// 未优化的组件
const ExpensiveComponent = ({
  value,
  onClick,
}: {
  value: number;
  onClick: () => void;
}) => {
  console.log("ExpensiveComponent 渲染");

  // 模拟耗时计算
  const startTime = performance.now();
  while (performance.now() - startTime < 10) {
    // 空循环，模拟耗时操作
  }

  return (
    <div className="p-3 border rounded bg-gray-50">
      <p>未优化组件 (值: {value})</p>
      <button
        onClick={onClick}
        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
      >
        点击
      </button>
    </div>
  );
};

// 使用 React.memo 优化的组件
const MemoizedComponent = React.memo(
  ({ value, onClick }: { value: number; onClick: () => void }) => {
    console.log("MemoizedComponent 渲染");

    // 模拟耗时计算
    const startTime = performance.now();
    while (performance.now() - startTime < 10) {
      // 空循环，模拟耗时操作
    }

    return (
      <div className="p-3 border rounded bg-gray-50">
        <p>使用 React.memo 优化 (值: {value})</p>
        <button
          onClick={onClick}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          点击
        </button>
      </div>
    );
  }
);

export const MemoizationDemo = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  // 未优化的函数，每次渲染都会创建新的引用
  const incrementCount1 = () => {
    setCount1(count1 + 1);
  };

  // 使用 useCallback 优化的函数，依赖项不变时保持相同引用
  const incrementCount2 = useCallback(() => {
    setCount2((prev) => prev + 1);
  }, []);

  // 使用 useMemo 计算耗时值
  const expensiveValue = useMemo(() => {
    console.log("计算 expensiveValue");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result + count1;
  }, [count1]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">
        React.memo, useCallback 和 useMemo
      </h2>

      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
          onClick={() => setUnrelatedState((prev) => prev + 1)}
        >
          更新无关状态 ({unrelatedState})
        </button>
        <p className="text-sm text-gray-600 mt-2">
          点击此按钮会导致组件重新渲染，观察控制台中各组件的渲染日志
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-semibold mb-2">未优化组件</h3>
          <ExpensiveComponent value={count1} onClick={incrementCount1} />
          <p className="text-sm text-gray-500 mt-1">
            每次父组件渲染时都会重新渲染
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">使用 React.memo 优化的组件</h3>
          <MemoizedComponent value={count2} onClick={incrementCount2} />
          <p className="text-sm text-gray-500 mt-1">
            只有在 props 变化时才会重新渲染
          </p>
        </div>
      </div>

      <div className="mb-4 p-3 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">useMemo 示例</h3>
        <p>计算结果: {expensiveValue}</p>
        <p className="text-sm text-gray-500 mt-1">
          使用 useMemo 缓存计算结果，只有依赖项变化时才重新计算
        </p>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-semibold">性能优化技巧:</h3>
        <ul className="list-disc pl-5">
          <li>使用 React.memo 避免组件不必要的重渲染</li>
          <li>使用 useCallback 缓存函数引用，防止子组件不必要的重渲染</li>
          <li>使用 useMemo 缓存计算结果，避免昂贵的重复计算</li>
          <li>注意: 过度优化可能导致代码复杂性增加，应该在必要时使用</li>
        </ul>
      </div>
    </div>
  );
};
