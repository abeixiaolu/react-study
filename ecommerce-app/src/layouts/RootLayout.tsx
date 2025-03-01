import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container px-4 mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-Commerce</h1>
          {/* 桌面导航 */}
          <nav className="hidden md:flex gap-4">
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

          {/* 移动端导航 */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"icon"} aria-label="菜单">
                  <MenuIcon className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/" className="w-full">
                    首页
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/products" className="w-full">
                    产品
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/cart" className="w-full">
                    购物车
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full">
                    登录
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 mx-auto py-8">
        <Outlet />
      </main>
      <footer className="border-t py-6 bg-muted/50">
        <div className="container px-4 mx-auto text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
