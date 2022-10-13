import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {}

export function Checkbox({ ...rest }: CheckboxProps) {
  return (
    <>
      <CheckboxPrimitive.Root
        className="w-6 h-6 p-0.5 bg-gray-800 rounded"
        {...rest}
      >
        <CheckboxPrimitive.Indicator asChild>
          <Check weight="bold" className="h-5 w-5 text-cyan-500" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </>
  );
}
