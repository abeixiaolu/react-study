import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// 模拟产品数据
const products = [
  {
    id: 1,
    name: "高品质T恤",
    price: 99,
    description: "舒适透气的纯棉T恤，适合日常穿着。",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 2,
    name: "牛仔裤",
    price: 199,
    description: "经典款式牛仔裤，耐穿又百搭。",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 3,
    name: "运动鞋",
    price: 299,
    description: "轻便舒适的运动鞋，适合各种运动场景。",
    image: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "休闲外套",
    price: 399,
    description: "时尚休闲外套，保暖又有型。",
    image: "https://via.placeholder.com/300x300",
  },
];

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">产品列表</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="font-medium text-primary">
                  ¥{product.price}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/products/${product.id}`}>查看详情</Link>
                </Button>
                <Button size="sm">加入购物车</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
