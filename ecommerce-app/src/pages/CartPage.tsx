import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

// 模拟购物车数据
const initialCartItems = [
  {
    id: 1,
    name: "高品质T恤",
    price: 99,
    quantity: 2,
    image: "https://via.placeholder.com/100x100",
  },
  {
    id: 3,
    name: "运动鞋",
    price: 299,
    quantity: 1,
    image: "https://via.placeholder.com/100x100",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">购物车为空</h2>
        <p className="text-muted-foreground mb-6">您的购物车中没有商品</p>
        <Button asChild>
          <Link to="/products">浏览产品</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">购物车</h2>

      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center border rounded-lg p-4 gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-muted-foreground">¥{item.price}</p>
            </div>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>

            <div className="flex flex-col items-end gap-2 mt-2 sm:mt-0">
              <span className="font-medium">¥{item.price * item.quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => removeItem(item.id)}
              >
                删除
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">总计：</span>
          <span className="text-lg font-bold">¥{calculateTotal()}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button variant="outline" asChild>
            <Link to="/products">继续购物</Link>
          </Button>
          <Button>结算</Button>
        </div>
      </div>
    </div>
  );
}
