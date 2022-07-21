import { useState } from "react";
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

// Components

import Logo from "../../assets/logo_secondary.svg";
import { Filter } from "../../components/Filter";
import { Order, OrderProps } from "../../components/Order";
import { Button } from "../../components/Button";

export function Home() {
  const { colors } = useTheme();
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: "123",
      patrimony: "123456",
      when: "18/05/2022",
      status: "open",
    },

    {
      id: "124",
      patrimony: "123456",
      when: "18/05/2022",
      status: "closed",
    },

    {
      id: "125",
      patrimony: "123456",
      when: "18/05/2022",
      status: "open",
    },

    {
      id: "126",
      patrimony: "123456",
      when: "18/05/2022",
      status: "open",
    },

    {
      id: "127",
      patrimony: "123456",
      when: "18/05/2022",
      status: "open",
    },
  ]);
  const [selectedStatus, setSelectedStatus] = useState<"open" | "closed">(
    "closed"
  );
  const navigation = useNavigation();

  function handleCreateNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
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

        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          mt={8}
        >
          <Heading color="gray.100">Meus Chamados</Heading>

          <Text color="gray.200">3</Text>
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
                {selectedStatus === "open" ? "em abert" : "finalizados"}
              </Text>
            </Center>
          )}
        />

        <Button title="nova solicitação" onPress={handleCreateNewOrder} />
      </VStack>
    </VStack>
  );
}
