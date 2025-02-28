import { useState } from "react";
import { Select } from "../components/compound-components/Select";

export function CompoundComponentsDemo() {
  const [value, setValue] = useState("选择水果");

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">复合组件模式示例</h2>

      <Select value={value} onChange={setValue}>
        <Select.Trigger>{value}</Select.Trigger>
        <Select.Options>
          <Select.Group>
            <Select.GroupLabel>水果</Select.GroupLabel>
            <Select.Option value="苹果">苹果</Select.Option>
            <Select.Option value="香蕉">香蕉</Select.Option>
            <Select.Option value="橙子">橙子</Select.Option>
          </Select.Group>
          <Select.Group>
            <Select.GroupLabel>蔬菜</Select.GroupLabel>
            <Select.Option value="西红柿">西红柿</Select.Option>
            <Select.Option value="黄瓜">黄瓜</Select.Option>
            <Select.Option value="胡萝卜">胡萝卜</Select.Option>
          </Select.Group>
        </Select.Options>
      </Select>

      <div className="mt-4">
        <h3 className="font-semibold">为什么使用复合组件模式？</h3>
        <ul className="list-disc pl-5 mt-2">
          <li>提供了更灵活的 API</li>
          <li>组件之间共享状态更自然</li>
          <li>更好的类型提示和代码补全</li>
          <li>更容易自定义和扩展</li>
          <li>
            组件组合：通过 Select.Trigger、Select.Options 和 Select.Option
            创建了一个语义化的组件 API
          </li>
          <li>状态共享：使用 Context 在相关组件间共享状态</li>
          <li>关注点分离：每个子组件负责特定的功能</li>
          <li>类型安全：通过 TypeScript 确保正确使用组件</li>
        </ul>
      </div>
    </div>
  );
}
