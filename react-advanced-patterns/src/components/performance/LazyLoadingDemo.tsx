import { lazy, Suspense, useState } from "react";

const LazyComponent = lazy(() => import("./HeavyComponent"));

const AnotherLazyComponent = lazy(
  () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new Promise<any>((resolve) =>
      setTimeout(() => resolve(import("./AnotherHeavyComponent")), 2000)
    )
);

export const LazyLoadingDemo = () => {
  const [showComp, setShowComp] = useState(false);
  const [showAnotherComp, setShowAnotherComp] = useState(false);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">懒加载与代码分割</h2>

      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
          onClick={() => setShowComp(!showComp)}
        >
          {showComp ? "隐藏组件" : "加载组件"}
        </button>

        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setShowAnotherComp(!showAnotherComp)}
        >
          {showAnotherComp ? "隐藏组件" : "加载另一个组件 (2秒延迟)"}
        </button>
      </div>

      <div className="border p-4 rounded-lg">
        <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
          {showComp && <LazyComponent />}
        </Suspense>
      </div>

      <div className="border p-4 rounded-lg">
        <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
          {showAnotherComp && <AnotherLazyComponent />}
        </Suspense>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-semibold">懒加载的好处:</h3>
        <ul className="list-disc pl-5">
          <li>减少初始加载时间和包大小</li>
          <li>按需加载组件，提高应用性能</li>
          <li>与路由结合使用效果更佳</li>
        </ul>
      </div>
    </div>
  );
};
