import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Form from "../pages/SignIn/components/Form";

const SignInModal = ({ children, heartDesign = false, additionalText }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {heartDesign ? (
        <div className="flex items-center gap-2">
          <Button
            className={
              "sm:w-9 w-8 sm:h-9 h-8 sm:rounded-lg rounded-md group-hover:bg-opacity-60"
            }
            color={`${"danger"}`}
            type="button"
            isIconOnly
            onPress={onOpen}
          >
            {children}
          </Button>
          <div onClick={onOpen} className="cursor-pointer">
            {additionalText}
          </div>
        </div>
      ) : (
        <Button
          className={`!bg-transparent !p-0 !m-0 !shadow-none !h-auto !border-none !rounded-none text-base min-w-fit`}
          onPress={onOpen}
        >
          {children}
        </Button>
      )}

      <Modal
        classNames={{
          wrapper: "items-center z-[2147483647]",
          backdrop: "z-[2147483646]",
        }}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>

              <ModalBody className="py-8">
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
