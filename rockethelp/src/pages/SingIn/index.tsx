import { useState } from "react";
import { Heading, VStack, Icon, useTheme, IconButton } from "native-base";
import { Envelope, Key, Eye, EyeClosed } from "phosphor-react-native";

import Logo from "../../assets/logo_primary.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignIn() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        mb={8}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        InputRightElement={
          <IconButton
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            mr={4}
            icon={
              !isPasswordVisible ? (
                <Eye color={colors.gray[300]} />
              ) : (
                <EyeClosed color={colors.gray[300]} />
              )
            }
          />
        }
        secureTextEntry={!isPasswordVisible}
      />

      <Button title="Entrar" w="full" />
    </VStack>
  );
}