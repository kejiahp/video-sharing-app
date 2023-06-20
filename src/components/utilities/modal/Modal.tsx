import React, { useCallback } from "react";
import Button from "../button/Button";
import Backdrop from "@/components/backdrop/Backdrop";

interface ModalProps {
  header?: string;
  subHeader?: string;
  closeText: string;
  bodyContent: React.ReactElement;
  submitText?: string;
  isOpen: boolean;
  disabled: boolean;
  onSubmitfn: () => void;
  onClosefn: () => void;
}

const Modal: React.FC<ModalProps> = ({
  header,
  subHeader,
  onClosefn,
  onSubmitfn,
  bodyContent,
  submitText,
  isOpen,
  disabled,
  closeText,
}) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmitfn();
  }, [onSubmitfn, disabled]);
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClosefn();
  }, [onClosefn, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <Backdrop>
      <section className="bg-white rounded-md p-4">
        <div className="">
          <h1 className="text-2xl font-semibold text-blue-500">{header}</h1>
          <p className="">{subHeader}</p>
          <hr className="my-4" />
        </div>
        {bodyContent}
        <div className="mt-4 flex items-center justify-center">
          {submitText ? (
            <Button disable={disabled} sec isSmall onClick={handleSubmit}>
              {submitText}
            </Button>
          ) : null}
          <Button disable={disabled} isSmall onClick={handleClose}>
            {closeText}
          </Button>
        </div>
      </section>
    </Backdrop>
  );
};

export default Modal;
