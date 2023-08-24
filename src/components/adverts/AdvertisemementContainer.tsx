import React, { PropsWithChildren } from "react";

type Props = {
  header: string;
  isCentered?: boolean;
};

function AdvertisemementContainer({
  header,
  children,
  isCentered,
}: PropsWithChildren<Props>) {
  return (
    <div className="my-10">
      <h1 className="text-center text-2xl font-semibold text-purple-700 mb-4">
        {header}
      </h1>

      {isCentered ? (
        <div className="text-center">{children}</div>
      ) : (
        <div className="flex gap-5 flex-col items-center">{children}</div>
      )}
    </div>
  );
}

export default AdvertisemementContainer;
