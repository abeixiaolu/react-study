import { LazyLoadingDemo } from "../components/performance/LazyLoadingDemo";
import { MemoizationDemo } from "../components/performance/MemoizationDemo";
import { VirtualListDemo } from "../components/performance/VirtualListDemo";

export const PerformanceOptimizationDemo = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">React 性能优化技术</h1>
        <p className="text-gray-600">
          React
          应用程序性能优化的关键技术包括避免不必要的渲染、代码分割、懒加载和高效处理大数据。
          以下示例展示了这些技术的实际应用。
        </p>
      </div>

      <LazyLoadingDemo />
      <VirtualListDemo />
      <MemoizationDemo />
    </div>
  );
};
