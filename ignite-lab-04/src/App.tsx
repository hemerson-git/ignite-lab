import { Button } from "./components/Button";
import { Heading } from "./components/Heading";
import { Text } from "./components/Text";
import "./styles/global.css";

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
    </div>
  );
}
