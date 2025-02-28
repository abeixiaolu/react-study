import { useState } from "react";

const HeavyComponent = () => {
  const [count, setCount] = useState(0);

  // 模拟大型组件
  const items = Array.from({ length: 50 }, (_, i) => (
    <div key={i} className="p-2 border-b">
      <h3 className="font-medium">项目 {i + 1}</h3>
      <p className="text-sm text-gray-600">这是一个懒加载的大型组件中的项目</p>
    </div>
  ));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">懒加载的大型组件</h2>
        <div>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            点击计数: {count}
          </button>
        </div>
      </div>
      <div className="max-h-60 overflow-auto border rounded">{items}</div>
    </div>
  );
};

export default HeavyComponent;
