import "./styles/global.css";
import { EnvelopeSimple, Lock } from "phosphor-react";

// COMPONENTS
import { Checkbox } from "./components/Checkbox";
import { Button } from "./components/Button";
import { Heading } from "./components/Heading";
import { Text } from "./components/Text";
import { TextInput } from "./components/TextInput";

export function App() {
  return (
    <div
      className="
      w-screen min-h-screen bg-gray-900 font-sans flex 
      items-center justify-center flex-col gap-4"
    >
      <header className="flex flex-col items-center">
        <img className="w-[80px]" src="./react-2.svg" alt="React Logo" />

        <Heading size="lg" className="mt-4">
          Ignite Lab
        </Heading>

        <Text className="text-gray-400 mt-1">Faça login e comece a usar</Text>
      </header>

      <form
        action=""
        className="flex flex-col items-stretch w-full max-w-sm mt-10 gap-4"
      >
        <label htmlFor="email" className="flex flex-col gap-2">
          <Text className="font-semibold">Endereço de E-mail</Text>

          <TextInput.Root>
            <TextInput.Icon>
              <EnvelopeSimple />
            </TextInput.Icon>

            <TextInput.Input
              placeholder="jhondoe@example.com"
              type="email"
              id="email"
              autoComplete="email"
            />
          </TextInput.Root>
        </label>

        <label htmlFor="password" className="flex flex-col gap-2">
          <Text className="font-semibold">Sua Senha</Text>

          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>

            <TextInput.Input
              placeholder="*********"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </TextInput.Root>
        </label>

        <label className="flex items-center gap-2 select-none">
          <Checkbox />

          <Text size="sm" className="">
            Lembrar de mim por 30 dias
          </Text>
        </label>

        <Button type="submit" className="mt-4">
          Criar conta
        </Button>
      </form>

      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text size="sm" asChild>
          <a
            href=""
            className="text-gray-400 underline hover:text-gray-200 transition-colors"
          >
            Esqueceu sua senha?
          </a>
        </Text>

        <Text size="sm" asChild>
          <a
            href=""
            className="text-gray-400 underline hover:text-gray-200 transition-colors"
          >
            Não possui conta? crie uma agora
          </a>
        </Text>
      </footer>
    </div>
  );
}
