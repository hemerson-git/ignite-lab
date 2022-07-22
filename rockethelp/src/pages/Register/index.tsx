import { useState } from "react";
import { VStack } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

// Components
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Alert } from "../../components/Alert";

export function Register() {
  const [patrimonyNumber, setPatrimonyNumber] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState<
    "info" | "warning" | "success" | "error"
  >("error");

  const navigation = useNavigation();

  function handleRegister() {
    if (!patrimonyNumber.trim() || !description.trim()) {
      setAlertMessage("Preencha todos os campos!");
      setIsAlertModalOpen(true);
      return;
    }

    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimonyNumber,
        description,
        status: "open",
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setIsLoading(false);
        setPatrimonyNumber("");
        setDescription("");
        setAlertStatus("success");
        setAlertMessage("Pedido criado com sucesso!");
        setIsAlertModalOpen(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setAlertMessage("Erro ao registrar o pedido!");
        setIsAlertModalOpen(true);
        console.log(error);
      });

    console.log(patrimonyNumber, description);
  }

  function handleCloseAlert() {
    setIsAlertModalOpen(false);

    if (alertStatus === "success") {
      navigation.goBack();
    }
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Alert
        isOpen={isAlertModalOpen}
        title={alertMessage}
        dismiss={handleCloseAlert}
        status={alertStatus}
      />

      <Header title="Nova Solicitação" />

      <Input
        placeholder="Número do Patrimônio"
        mt={4}
        value={patrimonyNumber}
        onChangeText={setPatrimonyNumber}
      />

      <Input
        placeholder="Descrição do problema"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        onPress={handleRegister}
        isLoading={isLoading}
      />
    </VStack>
  );
}
