import { useRoute } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import { Header } from "../../components/Header";

interface DetailsProps {
  orderId: string;
}

export function Details() {
  const { params } = useRoute();
  const { orderId } = params as DetailsProps;

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />

      <Text color="white">{orderId}</Text>
    </VStack>
  );
}
