import {
  Alert as NativeAlert,
  Text,
  VStack,
  Modal,
  IAlertProps,
  HStack,
  IconButton,
  Icon,
  useTheme,
} from "native-base";
import { X } from "phosphor-react-native";

interface AlertProps extends IAlertProps {
  isOpen: boolean;
  title: string;
  dismiss: () => void;
}

export function Alert({ isOpen, title, dismiss, ...rest }: AlertProps) {
  const { colors } = useTheme();

  return (
    <Modal
      isOpen={isOpen}
      overlayVisible
      onClose={dismiss}
      _backdrop={{
        bg: colors.gray[100],
      }}
      animationPreset="slide"
    >
      <NativeAlert
        w="90%"
        variant="left-accent"
        colorScheme="secondary.100"
        status="error"
        opacity={0.7}
        {...rest}
      >
        <VStack space={2} flexShrink={1} w="full">
          <HStack alignItems="center">
            <NativeAlert.Icon size="xl" />

            <Text
              color="secondary.900"
              ml={4}
              fontSize="md"
              flex={1}
              fontWeight="bold"
            >
              {title}
            </Text>

            <IconButton
              icon={<Icon as={<X color={colors.secondary[900]} />} />}
              onPress={dismiss}
            />
          </HStack>
        </VStack>
      </NativeAlert>
    </Modal>
  );
}
