import { createContext, useContext, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

type SelectContextType = {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SelectContext = createContext<SelectContextType | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectContext must be used within a SelectContext");
  }
  return context;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

function Select({ value, onChange, children }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef, () => setIsOpen(false));

  return (
    <SelectContext.Provider
      value={{
        value,
        onChange,
        isOpen,
        setIsOpen,
      }}
    >
      <div ref={selectRef} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useSelectContext();

  return (
    <button
      className="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none"
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
    </button>
  );
}

function Options({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSelectContext();
  if (!isOpen) return null;
  return (
    <div className="absolute w-full mt-1 bg-white border rounded-md shadow">
      {children}
    </div>
  );
}

function Option({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { onChange, setIsOpen, value: selectedValue } = useSelectContext();

  return (
    <div
      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
        selectedValue === value ? "text-blue-500" : ""
      }`}
      onClick={() => {
        onChange(value);
        setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-b last:border-0">{children}</div>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 text-sm font-medium text-gray-500">
      {children}
    </div>
  );
}

Select.Trigger = Trigger;
Select.Options = Options;
Select.Option = Option;
Select.Group = Group;
Select.GroupLabel = GroupLabel;

export { Select };
