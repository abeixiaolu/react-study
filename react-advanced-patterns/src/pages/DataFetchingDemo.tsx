/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";

// 模拟API
const api = {
  getUser: (
    id: number
  ): Promise<{ id: number; name: string; email: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id <= 0) {
          reject(new Error("无效的用户ID"));
        } else {
          resolve({
            id,
            name: `用户 ${id}`,
            email: `user${id}@example.com`,
          });
        }
      }, 1000);
    });
  },

  getPosts: (
    userId: number
  ): Promise<Array<{ id: number; title: string; body: string }>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          Array.from({ length: 3 }, (_, i) => ({
            id: i + 1,
            title: `用户 ${userId} 的文章 ${i + 1}`,
            body: `这是用户 ${userId} 的第 ${i + 1} 篇文章内容。`,
          }))
        );
      }, 1500);
    });
  },
};

/** 简单数据获取 */
const SimpleDataFetching = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const userData = await api.getUser(userId);
        if (isMounted) {
          setUser(userData);
        }
      } catch (e) {
        if (isMounted) {
          setError((e as Error).message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <div className="p-3 border rounded bg-gray-50 mb-4">
      <h3 className="font-semibold">简单数据获取</h3>
      {loading && <p>加载中...</p>}
      {error && <p className="text-red-500">错误: {error}</p>}
      {!loading && !error && user && (
        <div>
          <p>名称: {user.name}</p>
          <p>邮箱: {user.email}</p>
        </div>
      )}
    </div>
  );
};

const DependentDataFetching = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userData = await api.getUser(userId);
        if (!isMounted) return;

        setUser(userData);

        const postsData = await api.getPosts(userId);
        if (!isMounted) return;

        setPosts(postsData);
      } catch (e) {
        if (!isMounted) return;
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <div className="p-3 border rounded bg-gray-50">
      <h3 className="font-semibold">依赖数据获取</h3>
      {loading && <p>加载中...</p>}
      {error && <p className="text-red-500">错误: {error}</p>}
      {!loading && !error && user && (
        <div>
          <div className="mb-2">
            <p>用户: {user.name}</p>
            <p>邮箱: {user.email}</p>
          </div>

          <div>
            <h4 className="font-medium">用户文章:</h4>
            {posts.length > 0 ? (
              <ul className="list-disc pl-5">
                {posts.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
            ) : (
              <p>无文章</p>
            )}
          </div>
        </div>
      )}
      <p className="text-sm text-gray-500">
        处理依赖数据获取，一个请求依赖于另一个请求的结果
      </p>
    </div>
  );
};

// 自定义Hook进行数据获取
function useFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { data, loading, error };
}

const CustomHookDataFetching = ({ userId }: { userId: number }) => {
  const fetchUser = useCallback(() => api.getUser(userId), [userId]);
  const { data: user, loading, error } = useFetch(fetchUser);

  return (
    <div className="p-3 border rounded bg-gray-50 mb-4">
      <h3 className="font-semibold">自定义Hook数据获取</h3>
      {loading && <p>加载中...</p>}
      {error && <p className="text-red-500">错误: {error}</p>}
      {!loading && !error && user && (
        <div>
          <p>名称: {user.name}</p>
          <p>邮箱: {user.email}</p>
        </div>
      )}
      <p className="text-sm text-gray-500">使用自定义Hook封装数据获取逻辑</p>
    </div>
  );
};

export const DataFetchingDemo = () => {
  const [userId, setUserId] = useState(1);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">数据获取最佳实践</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          用户ID:
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </label>
      </div>

      <SimpleDataFetching userId={userId} />
      <CustomHookDataFetching userId={userId} />
      <DependentDataFetching userId={userId} />

      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-semibold">数据获取最佳实践:</h3>
        <ul className="list-disc pl-5">
          <li>使用isMounted标志防止内存泄漏</li>
          <li>使用useReducer管理复杂状态</li>
          <li>使用自定义Hook封装数据获取逻辑</li>
          <li>正确处理依赖数据获取</li>
          <li>使用React Query或SWR等库简化数据获取</li>
        </ul>
      </div>
    </div>
  );
};
