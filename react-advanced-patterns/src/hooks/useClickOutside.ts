import { useEffect, type RefObject } from "react";

// 创建一个通用的 clickOutside hook
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 检查点击事件是否发生在组件外部
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    // 添加全局点击事件监听
    document.addEventListener("mousedown", handleClickOutside);

    // 清理函数：组件卸载时移除事件监听
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]); // 依赖项：ref 和 handler
}
