import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  header?: string;
};

export default function CurrentImg({ image, header }: Props) {
  return (
    <div className="flex items-center justify-center w-full my-4 flex-col gap-1">
      <Image
        src={image}
        alt=""
        width={100}
        height={200}
        className="object-contain"
      />
      <p>{header ? header : "Current Image"}</p>
    </div>
  );
}
