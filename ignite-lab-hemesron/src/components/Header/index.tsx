import { Logo } from "../Logo";
import { List, X } from "phosphor-react";

interface HeaderProps {
  isOpen?: boolean;
  setIsOpen: () => void;
}

export function Header({ isOpen, setIsOpen }: HeaderProps) {
  return (
    <header
      className="
        w-full py-5 px-6 flex items-center justify-between bg-gray-700 border-b border-gray-600
        md:justify-center md:px-0
      "
    >
      <Logo />

      <button
        className="text-blue-500 w-12 h-12 flex items-center justify-center md:hidden"
        onClick={setIsOpen}
      >
        {isOpen ? <X size={32} /> : <List size={32} />}
      </button>
    </header>
  );
}
