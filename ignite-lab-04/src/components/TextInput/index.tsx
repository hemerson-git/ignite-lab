import { Slot } from "@radix-ui/react-slot";
import { InputHTMLAttributes, ReactNode } from "react";
export interface TextInputRootProps {
  children: ReactNode;
}

function TextInputRoot({ children }: TextInputRootProps) {
  return (
    <div
      className="py-4 px-3 h-12 rounded bg-gray-800 outline-none 
      text-sm  w-full focus-within:ring-2 focus-within:ring-cyan-300
      flex items-center gap-3"
    >
      {children}
    </div>
  );
}

TextInputRoot.displayName = "TextInput.Root";

interface TextInputIconProps {
  children: ReactNode;
}

function TextInputIcon({ children }: TextInputIconProps) {
  return <Slot className="w-6 h-6 text-gray-400">{children}</Slot>;
}

TextInputIcon.displayName = "TextInput.Icon";

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

function TextInputInput({ ...rest }: TextInputInputProps) {
  return (
    <input
      className="
        bg-transparent flex-1 text-gray-100 outline-none placeholder:text-gray-400 
        "
      {...rest}
    />
  );
}

TextInputInput.displayName = "TextInput.Input";

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
};
