import { ReactNode, ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asChild?: boolean;
}

export function Button({ children, asChild }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={clsx(
        "text-black font-semibold py-4 px-3 bg-cyan-500 rounded font-sans" +
          "hover:bg-cyan-300 focus:ring-2 focus:ring-white transition-colors w-full"
      )}
    >
      {children}
    </Comp>
  );
}
