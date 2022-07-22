import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import {
  CircleWavyCheck,
  Clipboard,
  DesktopTower,
  Hourglass,
} from "phosphor-react-native";

import firestore from "@react-native-firebase/firestore";

// Components
import { Header } from "../../components/Header";
import { OrderProps } from "../../components/Order";
import { Loading } from "../../components/Loading";
import { CardDetails } from "../../components/CardDetails";
import { Input } from "../../components/Input";

// DTOs
import { OrderFirebaseDTO } from "../../DTOs/OrderFirebaseDTO";
import { dateFormat } from "../../utils/firestoreDateFormat";
import { Button } from "../../components/Button";
import { Alert } from "../../components/Alert";

interface DetailsProps {
  orderId: string;
}

interface OrderDetails extends OrderProps {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const { params } = useRoute();
  const { orderId } = params as DetailsProps;
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState("");
  const [alertModalStatus, setAlertModalStatus] = useState<
    "success" | "error" | "warning"
  >("error");

  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleFinishOrder() {
    if (!solution.trim()) {
      setAlertModalMessage("Preencha o campo de solução");
      setIsAlertModalOpen(true);
      return;
    }

    firestore()
      .collection<OrderFirebaseDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setAlertModalMessage("Ordem Finalizada com sucesso");
        setAlertModalStatus("success");
        setIsAlertModalOpen(true);
      })
      .catch((error) => {
        setAlertModalMessage("Erro ao finalizar a Solicitação");
        setIsAlertModalOpen(true);
        console.log(error);
      });
  }

  function handleCloseModal() {
    setIsAlertModalOpen(false);

    if (alertModalStatus === "success") {
      navigation.goBack();
    }
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirebaseDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          description,
          patrimonyNumber,
          status,
          createdAt,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony: patrimonyNumber,
          description,
          status,
          closed,
          solution,
          when: dateFormat(createdAt),
        });

        setIsLoading(false);
      });
  }, []);

  return (
    <VStack flex={1} bg="gray.700">
      <Alert
        isOpen={isAlertModalOpen}
        dismiss={handleCloseModal}
        title={alertModalMessage}
        status={alertModalStatus}
      />

      <Header title="Solicitação" />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HStack bg="gray.500" justifyContent="center" p={4}>
            {order.status === "closed" ? (
              <CircleWavyCheck size={22} color={colors.green[300]} />
            ) : (
              <Hourglass size={22} color={colors.secondary[700]} />
            )}

            <Text
              fontSize="sm"
              color={
                order.status === "closed"
                  ? colors.green[300]
                  : colors.secondary[700]
              }
              ml={2}
              textTransform="uppercase"
            >
              {order.status === "closed" ? "Finalizada" : "Em Andamento"}
            </Text>
          </HStack>

          <ScrollView mx={5} showsVerticalScrollIndicator={false}>
            <CardDetails
              title="Equipamento"
              icon={DesktopTower}
              description={`Patrimônio ${order.patrimony}`}
              footer={order.when}
            />

            <CardDetails
              title="Descrição do Problema"
              icon={Clipboard}
              description={`${order.description}`}
              footer={order.when}
            />

            <CardDetails
              title="Solução"
              icon={CircleWavyCheck}
              footer={order.closed && `Finalizada em ${order.closed}`}
            >
              {order.status === "closed" ? (
                <Input isDisabled value={order.solution} />
              ) : (
                <Input
                  multiline
                  placeholder="Digite a solução aqui"
                  onChangeText={setSolution}
                  h={24}
                  textAlignVertical="top"
                />
              )}
            </CardDetails>
          </ScrollView>

          {order.status === "open" && (
            <Button
              title="Encerrar Solicitação"
              onPress={handleFinishOrder}
              m={5}
            />
          )}
        </>
      )}
    </VStack>
  );
}
