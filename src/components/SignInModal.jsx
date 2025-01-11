import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Form from "../pages/SignIn/components/Form";

const SignInModal = ({ children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {" "}
      <Button onPress={onOpen}>{children}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>

              <ModalBody>
                <Form onSuccess={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignInModal;
