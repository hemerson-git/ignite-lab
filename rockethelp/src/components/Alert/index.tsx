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
  status?: "info" | "warning" | "success" | "error" | (string & {});
}

export function Alert({
  isOpen,
  title,
  dismiss,
  status = "error",
  ...rest
}: AlertProps) {
  const { colors } = useTheme();

  const textColor = {
    info: colors.primary[500],
    warning: colors.yellow[700],
    success: colors.green[500],
    error: colors.secondary[900],
  };

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
        colorScheme="info"
        status={status}
        opacity={0.7}
        {...rest}
      >
        <VStack space={2} flexShrink={1} w="full">
          <HStack alignItems="center">
            <NativeAlert.Icon size="xl" />

            <Text
              color={textColor[status]}
              ml={4}
              fontSize="md"
              flex={1}
              fontWeight="bold"
            >
              {title}
            </Text>

            <IconButton
              icon={<Icon as={<X color={textColor[status]} />} />}
              onPress={dismiss}
            />
          </HStack>
        </VStack>
      </NativeAlert>
    </Modal>
  );
}
