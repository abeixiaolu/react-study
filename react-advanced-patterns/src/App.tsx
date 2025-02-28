import { CompoundComponentsDemo } from "./pages/CompoundComponentsDemo";
import { CompoundComponentsTabsDemo } from "./pages/CompoundComponentsTabsDemo";
import { HOCPatternsDemo } from "./pages/HOCPatternsDemo";
import { RenderPropsDemo } from "./pages/RenderPropsDemo";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            React 高级设计模式
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <CompoundComponentsDemo />
        <HOCPatternsDemo />
        <RenderPropsDemo />
        <CompoundComponentsTabsDemo />
      </main>
    </div>
  );
}

export default App;
