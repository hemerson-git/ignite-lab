import { Button } from "./components/Button";
import { Heading } from "./components/Heading";
import { Text } from "./components/Text";
import { TextInput } from "./components/TextInput";
import "./styles/global.css";
import { EnvelopeSimple } from "phosphor-react";
import { Checkbox } from "./components/Checkbox";

export function App() {
  return (
    <div
      className="
      w-screen h-screen bg-gray-900 font-sans flex 
      items-center justify-center flex-col gap-4"
    >
      <Heading>Heading</Heading>
      <Text>Hello 2</Text>

      <Button>Create Account</Button>

      <TextInput.Root>
        <TextInput.Icon>
          <EnvelopeSimple />
        </TextInput.Icon>

        <TextInput.Input placeholder="Type your e-mail address" />
      </TextInput.Root>

      <Checkbox />
      <Checkbox />
    </div>
  );
}
