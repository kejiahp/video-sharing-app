import React from "react";
import Button from "../button/Button";

interface ModalProps {
  header?: string;
  subHeader?: string;
  closeText: string;
  bodyContent: React.JSX.Element;
  submitText?: string;
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
  closeText,
}) => {
  return (
    <section>
      <div className="">
        <h1>{header}</h1>
        <p>{subHeader}</p>
      </div>
      {bodyContent}
      <div className="">
        {submitText ? (
          <Button sec isSmall onClick={onSubmitfn}>
            {submitText}
          </Button>
        ) : null}
        <Button isSmall onClick={onClosefn}>
          {closeText}
        </Button>
      </div>
    </section>
  );
};

export default Modal;
