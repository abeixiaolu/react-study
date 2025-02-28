/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState } from "react";

interface ItemProps {
  index: number;
  style: React.CSSProperties;
}

const Item = ({ style, index }: ItemProps) => {
  return (
    <div
      style={style}
      className={`p-4 border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="font-medium">Item {index}</div>
      <div className="text-sm text-gray-600">
        这是虚拟列表中的第 {index + 1} 项内容
      </div>
    </div>
  );
};

interface VirtualListProps {
  itemCount: number;
  itemHeight: number;
  windowHeight: number;
  renderItem: (props: ItemProps) => React.ReactNode;
}

const VirtualList = ({
  itemCount,
  itemHeight,
  windowHeight,
  renderItem,
}: VirtualListProps) => {
  // 将 useState 和 useRef 放在组件顶层，确保它们不在循环中调用
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // 计算可见区域的起始和结束索引
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
  const endIndex = Math.min(
    itemCount - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );

  // 创建要渲染的项目数组
  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(
      renderItem({
        index: i,
        style: {
          position: "absolute",
          top: i * itemHeight,
          width: "100%",
          height: `${itemHeight}px`,
        },
      })
    );
  }

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ overflow: "auto", height: windowHeight, position: "relative" }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${itemHeight * itemCount}px` }}>{items}</div>
    </div>
  );
};

export const VirtualListDemo = () => {
  const [itemCount, setItemCount] = useState(10000);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">虚拟列表</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          数据项数量: {itemCount}
        </label>
        <input
          type="range"
          min="100"
          max="100000"
          step="100"
          value={itemCount}
          onChange={(e) => setItemCount(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="border rounded-lg">
        <VirtualList
          itemCount={itemCount}
          itemHeight={70}
          windowHeight={400}
          renderItem={({ index, style }) => (
            <Item key={index} index={index} style={style} />
          )}
        />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-semibold">虚拟列表的优势:</h3>
        <ul className="list-disc pl-5">
          <li>只渲染可见区域的数据，大幅减少 DOM 节点数量</li>
          <li>处理大数据集时保持流畅的滚动体验</li>
          <li>减少内存使用和提高渲染性能</li>
        </ul>
      </div>
    </div>
  );
};
