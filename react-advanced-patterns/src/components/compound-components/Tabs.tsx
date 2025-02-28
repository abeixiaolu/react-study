import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsContext");
  }
  return context;
}

interface TabsProps {
  defaultTab?: string;
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
  onChange?: (tab: string) => void;
}

function Tabs({
  defaultTab,
  children,
  className,
  activeTab,
  onChange,
}: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || "");

  const currentActiveTab = activeTab || internalActiveTab;

  const handleTabChange = useCallback(
    (tab: string) => {
      if (onChange) {
        onChange(tab);
      }
      if (activeTab === undefined) {
        setInternalActiveTab(tab);
      }
    },
    [activeTab, onChange]
  );

  useEffect(() => {
    if (
      !defaultTab &&
      !activeTab &&
      React.Children.toArray(children).some(
        (child) => React.isValidElement(child) && child.type === TabList
      )
    ) {
      const tabList = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === TabList
      ) as React.ReactElement<TabListProps>;
      // 从 TabList 中找到第一个 Tab
      if (tabList && tabList.props.children) {
        const firstTab = React.Children.toArray(tabList.props.children).find(
          (child) => React.isValidElement(child) && child.type === Tab
        ) as React.ReactElement<TabProps>;

        if (firstTab && firstTab.props.id) {
          handleTabChange(firstTab.props.id);
        }
      }
    }
  }, [defaultTab, children, activeTab, handleTabChange]);

  return (
    <TabsContext.Provider
      value={{ activeTab: currentActiveTab, setActiveTab: handleTabChange }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// TabList 组件 - 包含所有选项卡按钮
interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

function TabList({ children, className = "" }: TabListProps) {
  return <div className={`flex border-b ${className}`}>{children}</div>;
}

// Tab 组件 - 包含标签页内容
interface TabProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

function Tab({ id, children, className = "" }: TabProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 font-medium border-b-2 -mb-px ${
        isActive
          ? "text-blue-600 border-blue-600"
          : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
      } ${className}`}
    >
      {children}
    </button>
  );
}

// TabPanels 组件 - 包含所有面板内容
interface TabPanelsProps {
  children: React.ReactNode;
  className?: string;
}

function TabPanels({ children, className = "" }: TabPanelsProps) {
  return <div className={`py-4 ${className}`}>{children}</div>;
}

// TabPanel 组件 - 单个面板内容
interface TabPanelProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

function TabPanel({ id, children, className = "" }: TabPanelProps) {
  const { activeTab } = useTabsContext();

  if (activeTab !== id) {
    return null;
  }

  return <div className={className}>{children}</div>;
}

// 将子组件附加到 Tabs 上
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

export { Tabs };
