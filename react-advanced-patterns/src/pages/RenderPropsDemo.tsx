import { useState } from "react";
import {
  MouseTracker,
  MouseTrackerWithChildren,
} from "../components/render-props/MouseTracker";

export function RenderPropsDemo() {
  const [showCat, setShowCat] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Render Props 模式</h2>
      <p className="mb-4">
        Render Props 是一种在 React
        组件之间共享代码的技术，其中一个组件通过一个函数 prop
        来决定要渲染什么内容。
        这种模式允许组件将其内部状态或行为暴露给其他组件，而不需要使用继承或高阶组件。
      </p>
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShowCat(!showCat)}
        >
          {showCat ? "隐藏猫咪" : "显示猫咪"}
        </button>
      </div>

      <div className="mt-4">
        <p className="font-medium mb-2">鼠标追踪器示例：</p>
        <p className="text-gray-600 mb-4">
          将鼠标移动到下面的区域中，观察坐标变化。
        </p>

        <MouseTracker
          render={({ x, y }) => (
            <p>
              当前鼠标位置: {x}, {y}
            </p>
          )}
        />

        <MouseTrackerWithChildren className="relative">
          {({ x, y }) => (
            <div>
              <p>
                当前鼠标位置: {x}, {y}
              </p>
              {showCat && (
                <img
                  src="https://cataas.com/cat"
                  alt="Cat"
                  width={100}
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          )}
        </MouseTrackerWithChildren>
      </div>
    </div>
  );
}
