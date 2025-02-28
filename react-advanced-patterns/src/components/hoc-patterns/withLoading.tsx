import { ComponentType, useState, useEffect } from "react";

// 定义加载状态的 Props 接口
interface LoadingProps {
  isLoading?: boolean;
  error?: Error | null;
}

// 定义高阶组件，它将处理数据加载状态
export function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>,
  loadingMessage: string = "加载中..."
) {
  // 返回一个新的组件
  return function WithLoadingComponent(
    props: P & LoadingProps
  ) {
    const { isLoading, error, ...componentProps } = props;

    if (error) {
      return (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          错误: {error.message}
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="p-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">{loadingMessage}</span>
        </div>
      );
    }

    // 渲染原始组件，传入除 loading 和 error 之外的所有 props
    return <WrappedComponent {...(componentProps as P)} />;
  };
}

// 创建一个示例数据获取 HOC
export function withData<P extends object, T>(
  WrappedComponent: ComponentType<P & { data: T }>,
  fetchData: () => Promise<T>
) {
  // 修改返回的组件类型定义
  return function WithDataComponent(props: Omit<P, "data">) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      const loadData = async () => {
        try {
          setIsLoading(true);
          const result = await fetchData();
          setData(result);
          setError(null);
        } catch (e) {
          setError(e instanceof Error ? e : new Error("加载数据时出错"));
        } finally {
          setIsLoading(false);
        }
      };

      loadData();
    }, []);

    // 组合使用 withLoading HOC
    // 这里需要明确指定泛型参数来保持类型安全
    const LoadingWrappedComponent = withLoading<P & { data: T }>(WrappedComponent);

    // 创建一个类型安全的 props 对象
    const componentProps = {
      ...props,
      data: data as T,
      isLoading,
      error
    } as P & { data: T } & LoadingProps;

    // 使用类型安全的 props
    return <LoadingWrappedComponent {...componentProps} />;
  };
}
