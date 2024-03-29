import { useState, useEffect } from "react";
import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Components

import Logo from "../../assets/logo_secondary.svg";
import { Filter } from "../../components/Filter";
import { Order, OrderProps } from "../../components/Order";
import { Button } from "../../components/Button";
import { Alert } from "../../components/Alert";
import { Loading } from "../../components/Loading";

import { dateFormat } from "../../utils/firestoreDateFormat";

export function Home() {
  const { colors } = useTheme();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<"open" | "closed">(
    "closed"
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  function handleCreateNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch((error) => {
        setIsAlertModalOpen(true);
        console.log(error);
      });
  }

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection("orders")
      .where("status", "==", selectedStatus)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimonyNumber, description, status, createdAt } =
            doc.data();

          return {
            id: doc.id,
            patrimony: patrimonyNumber,
            description,
            status,
            when: dateFormat(createdAt),
          };
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [selectedStatus]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <Alert
        isOpen={isAlertModalOpen}
        title="Ocorreu um erro ao tentar fazer logout"
        dismiss={() => setIsAlertModalOpen(false)}
      />

      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          onPress={handleLogout}
          icon={<SignOut size={26} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          mt={8}
        >
          <Heading color="gray.100">Solicitações</Heading>

          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title="Em Andamento"
            type="open"
            onPress={() => setSelectedStatus("open")}
            isActive={selectedStatus === "open"}
          />

          <Filter
            title="Finalizados"
            type="closed"
            onPress={() => setSelectedStatus("closed")}
            isActive={selectedStatus === "closed"}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText size={40} color={colors.gray[300]} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {"\n"}
                  solicitações{" "}
                  {selectedStatus === "open" ? "em aberto" : "finalizados"}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title="nova solicitação" onPress={handleCreateNewOrder} />
      </VStack>
    </VStack>
  );
}
