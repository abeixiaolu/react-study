import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">欢迎来到我们的商店</h2>
      <p className="mb-4">浏览我们的精选产品，享受优质购物体验。</p>
      <Button asChild>
        <Link to="/products">浏览产品</Link>
      </Button>
    </div>
  );
}
