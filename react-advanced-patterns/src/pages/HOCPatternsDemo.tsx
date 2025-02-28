import { withData } from "../components/hoc-patterns/withLoading";

// 模拟 API 调用
const fetchUserData = () =>
  new Promise<{ name: string; email: string }>((resolve) =>
    setTimeout(
      () => resolve({ name: "张三", email: "zhangsan@example.com" }),
      1500
    )
  );

// 基础用户信息组件
function UserProfile({ data }: { data: { name: string; email: string } }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold">{data.name}</h3>
      <p className="text-gray-600">{data.email}</p>
    </div>
  );
}

// 使用 HOC 增强的用户信息组件
const UserProfileWithData = withData(UserProfile, fetchUserData);

export function HOCPatternsDemo() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">高阶组件模式示例</h2>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">HOC 的优势：</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>代码复用：将通用逻辑抽象到 HOC 中</li>
            <li>关注点分离：数据获取逻辑与展示逻辑分离</li>
            <li>灵活性：可以组合多个 HOC</li>
          </ul>
        </div>

        <UserProfileWithData />
      </div>
    </div>
  );
}
