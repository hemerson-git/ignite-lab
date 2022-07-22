import { useState } from "react";
import { Heading, VStack, Icon, useTheme, Pressable } from "native-base";
import { Envelope, Key, Eye, EyeClosed } from "phosphor-react-native";

import auth from "@react-native-firebase/auth";

import Logo from "../../assets/logo_primary.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "../../components/Alert";

export function SignIn() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSignIn() {
    const trimedEmail = email.trim();

    if (!trimedEmail || !password) {
      setAlertMessage(`Você deve informar \n Seu E-mail e senha`);
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(trimedEmail, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setIsLoading(false);

        if (error.code === "auth/user-not-found") {
          setAlertMessage(`Verifique o E-mail e senha informados`);
          setShowAlert(true);
          return;
        }

        if (error.code === "auth/wrong-password") {
          setAlertMessage(`Verifique o E-mail e senha informados`);
          setShowAlert(true);
          return;
        }

        if (error.code === "auth/invalid-email") {
          setAlertMessage(`Verifique o E-mail informado`);
          setShowAlert(true);
          return;
        }

        setAlertMessage(`Ocorreu um erro ao tentar fazer login`);
        setShowAlert(true);
        console.log(error);
      });
  }

  function handleCloseAlert() {
    setShowAlert(false);
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Alert
        isOpen={showAlert}
        title={alertMessage}
        dismiss={handleCloseAlert}
      />

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
          <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              mr={4}
              as={
                !isPasswordVisible ? (
                  <Eye color={colors.gray[300]} />
                ) : (
                  <EyeClosed color={colors.gray[300]} />
                )
              }
            />
          </Pressable>
        }
        secureTextEntry={!isPasswordVisible}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
