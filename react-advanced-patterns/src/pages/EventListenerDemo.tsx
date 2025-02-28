/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";

export const EventListenerDemo = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">事件监听和解绑</h2>

      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? "隐藏组件" : "显示组件"}
        </button>
        <p className="text-sm text-gray-600 mt-2">
          点击按钮切换组件可以观察事件监听器的添加和移除
        </p>
      </div>

      {isVisible && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <WindowResizeExample />
          <ScrollPositionExample />
          <KeyboardEventsExample />
          <EventDelegationExample />
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-semibold">事件监听最佳实践:</h3>
        <ul className="list-disc pl-5">
          <li>总是在useEffect的清理函数中解绑事件监听器</li>
          <li>使用useRef保存事件处理函数，避免不必要的重新绑定</li>
          <li>考虑事件委托来减少事件监听器数量</li>
          <li>使用节流(throttle)和防抖(debounce)优化高频事件</li>
        </ul>
      </div>
    </div>
  );
};

// 窗口大小监听示例
const WindowResizeExample = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 使用useRef保存处理函数，避免每次渲染创建新函数
  const handleResizeRef = useRef(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  useEffect(() => {
    console.log("添加窗口大小变化监听器");

    // 防抖函数：限制高频事件触发频率
    const debounce = <T extends (...args: any[]) => any>(
      fn: T,
      delay: number
    ) => {
      let timer: number | null = null;
      return function (this: any, ...args: Parameters<T>) {
        if (timer) clearTimeout(timer);
        timer = window.setTimeout(() => fn.apply(this, args), delay);
      };
    };

    // 创建防抖处理函数
    const debouncedHandleResize = debounce(handleResizeRef.current, 100);

    // 添加事件监听器
    window.addEventListener("resize", debouncedHandleResize);

    // 清理函数 - 移除事件监听器
    return () => {
      console.log("移除窗口大小变化监听器");
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []); // 空依赖数组，只在挂载和卸载时执行

  return (
    <div className="p-3 border rounded bg-gray-50">
      <h3 className="font-semibold">窗口大小监听</h3>
      <p>宽度: {windowSize.width}px</p>
      <p>高度: {windowSize.height}px</p>
      <p className="text-sm text-gray-500 mt-2">
        使用防抖函数优化resize事件，减少不必要的状态更新
      </p>
    </div>
  );
};

// 滚动位置监听示例
const ScrollPositionExample = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    console.log("添加滚动事件监听器");

    // 节流函数：限制高频事件触发频率
    const throttle = <T extends (...args: any[]) => any>(
      fn: T,
      limit: number
    ) => {
      let inThrottle = false;
      return function (this: any, ...args: Parameters<T>) {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    // 创建节流处理函数
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 100);

    // 添加事件监听器，使用passive选项提高滚动性能
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 清理函数 - 移除事件监听器
    return () => {
      console.log("移除滚动事件监听器");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="p-3 border rounded bg-gray-50">
      <h3 className="font-semibold">滚动位置监听</h3>
      <p>滚动位置: {scrollY}px</p>
      <p className="text-sm text-gray-500 mt-2">
        使用节流函数优化scroll事件，使用passive选项提高性能
      </p>
    </div>
  );
};

// 键盘事件监听示例
const KeyboardEventsExample = () => {
  const [lastKey, setLastKey] = useState("");
  const [keysPressed, setKeysPressed] = useState<string[]>([]);

  // 使用useCallback创建稳定的引用
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setLastKey(e.key);
    setKeysPressed((prev) => {
      // 避免重复添加
      if (!prev.includes(e.key)) {
        return [...prev, e.key].slice(-5); // 只保留最后5个按键
      }
      return prev;
    });
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    setKeysPressed((prev) => prev.filter((key) => key !== e.key));
  }, []);

  useEffect(() => {
    console.log("添加键盘事件监听器");

    // 添加事件监听器
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // 清理函数 - 移除事件监听器
    return () => {
      console.log("移除键盘事件监听器");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]); // 依赖项包含回调函数

  return (
    <div className="p-3 border rounded bg-gray-50">
      <h3 className="font-semibold">键盘事件监听</h3>
      <p>最后按下的键: {lastKey || "无"}</p>
      <p>当前按下的键: {keysPressed.join(", ") || "无"}</p>
      <p className="text-sm text-gray-500 mt-2">
        使用useCallback创建稳定的事件处理函数引用
      </p>
    </div>
  );
};

// 事件委托示例
const EventDelegationExample = () => {
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    console.log("设置事件委托");

    const container = containerRef.current;
    if (!container) return;

    // 使用事件委托处理所有子元素的点击
    const handleClick = (e: Event) => {
      // 查找最近的li元素
      const target = e.target as HTMLElement;
      const listItem = target.closest("li");
      if (listItem && container.contains(listItem)) {
        setClickedItem(listItem.textContent);
      }
    };

    // 只在父元素上添加一个事件监听器
    container.addEventListener("click", handleClick);

    // 清理函数
    return () => {
      console.log("移除事件委托");
      container.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="p-3 border rounded bg-gray-50">
      <h3 className="font-semibold">事件委托</h3>
      <p className="mb-2">点击的项目: {clickedItem || "无"}</p>

      <ul ref={containerRef} className="list-disc pl-5">
        <li className="cursor-pointer hover:text-blue-500">项目 1</li>
        <li className="cursor-pointer hover:text-blue-500">项目 2</li>
        <li className="cursor-pointer hover:text-blue-500">项目 3</li>
        <li className="cursor-pointer hover:text-blue-500">项目 4</li>
        <li className="cursor-pointer hover:text-blue-500">项目 5</li>
      </ul>

      <p className="text-sm text-gray-500 mt-2">
        使用事件委托模式，只在父元素上添加一个事件监听器
      </p>
    </div>
  );
};
