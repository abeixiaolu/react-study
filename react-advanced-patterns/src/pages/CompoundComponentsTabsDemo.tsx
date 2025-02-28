import { useState } from "react";
import { Tabs } from "../components/compound-components/Tabs";
import { twMerge } from "tailwind-merge";

export function CompoundComponentsTabsDemo() {
  const [activeTab, setActiveTab] = useState("product1");

  // 这个函数演示如何从外部控制选项卡
  const handleExternalTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">复合组件模式 - Tabs 示例</h2>
      <p className="mb-4">
        复合组件模式通过 React Context
        共享状态，使相关组件能够协同工作，同时保持清晰的 API。
        这种模式特别适合构建具有多个相关部分的复杂 UI
        组件，如选项卡、下拉菜单、表单等。
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">基本用法</h3>
        <Tabs defaultTab="tab1">
          <Tabs.TabList>
            <Tabs.Tab id="tab1">个人信息</Tabs.Tab>
            <Tabs.Tab id="tab2">账户设置</Tabs.Tab>
            <Tabs.Tab id="tab3">通知偏好</Tabs.Tab>
          </Tabs.TabList>
          <Tabs.TabPanels>
            <Tabs.TabPanel id="tab1">
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">个人信息</h4>
                <p>这里是用户的个人信息内容。</p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    姓名
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="请输入姓名"
                  />
                </div>
              </div>
            </Tabs.TabPanel>
            <Tabs.TabPanel id="tab2">
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">账户设置</h4>
                <p>这里是用户的账户设置选项。</p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    <input type="checkbox" className="mr-2" />
                    启用两步验证
                  </label>
                </div>
              </div>
            </Tabs.TabPanel>
            <Tabs.TabPanel id="tab3">
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">通知偏好</h4>
                <p>这里是用户的通知设置选项。</p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    <input type="checkbox" className="mr-2" />
                    接收电子邮件通知
                  </label>
                </div>
              </div>
            </Tabs.TabPanel>
          </Tabs.TabPanels>
        </Tabs>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">外部控制</h3>
        <p className="mb-3">
          复合组件也可以通过外部状态控制，这展示了它们的灵活性。
        </p>

        <div className="mb-3">
          <div className="flex space-x-2">
            <button
              onClick={() => handleExternalTabChange("product1")}
              className={twMerge(
                "px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200",
                activeTab === "product1" && "bg-gray-200"
              )}
            >
              产品 1
            </button>
            <button
              onClick={() => handleExternalTabChange("product2")}
              className={twMerge(
                "px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200",
                activeTab === "product2" && "bg-gray-200"
              )}
            >
              产品 2
            </button>
            <button
              onClick={() => handleExternalTabChange("product3")}
              className={twMerge(
                "px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200",
                activeTab === "product3" && "bg-gray-200"
              )}
            >
              产品 3
            </button>
          </div>
        </div>

        <Tabs activeTab={activeTab} onChange={handleExternalTabChange}>
          <Tabs.TabList>
            <Tabs.Tab id="product1">产品 1</Tabs.Tab>
            <Tabs.Tab id="product2">产品 2</Tabs.Tab>
            <Tabs.Tab id="product3">产品 3</Tabs.Tab>
          </Tabs.TabList>
          <Tabs.TabPanels>
            <Tabs.TabPanel id="product1">
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">产品 1 详情</h4>
                <p>这是产品 1 的详细信息和规格。</p>
              </div>
            </Tabs.TabPanel>
            <Tabs.TabPanel id="product2">
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">产品 2 详情</h4>
                <p>这是产品 2 的详细信息和规格。</p>
              </div>
            </Tabs.TabPanel>
            <Tabs.TabPanel id="product3">
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">产品 3 详情</h4>
                <p>这是产品 3 的详细信息和规格。</p>
              </div>
            </Tabs.TabPanel>
          </Tabs.TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">复合组件模式的优势</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>声明式 API，使用直观且易读</li>
          <li>组件间共享状态，但对外隐藏实现细节</li>
          <li>灵活的组合方式，可以按需排列子组件</li>
          <li>良好的封装性，内部状态管理对使用者透明</li>
          <li>可扩展性强，易于添加新的子组件或功能</li>
        </ul>
      </div>
    </div>
  );
}
