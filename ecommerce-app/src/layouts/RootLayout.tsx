import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-Commerce</h1>
          <nav className="flex gap-4">
            <Button variant="link" asChild>
              <Link to="/">首页</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/products">产品</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/cart">购物车</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">登录</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-8">
        <Outlet />
      </main>
      <footer className="border-t py-6 bg-muted/50">
        <div className="container mx-auto text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
