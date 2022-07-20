import { useState } from "react";
import {
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
  TextField,
  VStack,
} from "native-base";
import { SignOut } from "phosphor-react-native";
import { useTheme } from "native-base";

import Logo from "../../assets/logo_secondary.svg";
import { Filter } from "../../components/Filter";

export function Home() {
  const { colors } = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<"open" | "closed">(
    "open"
  );

  const orders = [
    {
      id: "123",
      patrimony: "123456",
      when: "18/05/2022",
      status: "open",
    },
  ];

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
      </VStack>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.patrimony}</Text>}
      />
    </VStack>
  );
}
