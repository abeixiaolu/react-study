import { useState, useEffect } from "react";

const AnotherHeavyComponent = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      const newData = Array.from({ length: 20 }, (_, i) => `数据项 ${i + 1}`);
      setData(newData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="p-4 text-center">加载数据中...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">另一个懒加载的组件</h2>
      <div className="grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <div key={index} className="p-3 bg-gray-100 rounded">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnotherHeavyComponent;
