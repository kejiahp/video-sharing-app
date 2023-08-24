import Image from "next/image";
import React from "react";

type Props = {
  icon?: any;
  image?: string;
  text: string;
  subText?: string;
};

function AdvertBenefitCard({ icon: Icon, image, text, subText }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[300px]">
      {image ? (
        <Image
          src={image}
          alt="Customer Testimonial"
          width={100}
          height={100}
          className="rounded-full border border-black"
        />
      ) : (
        <Icon size={30} className="text-purple-700" />
      )}
      <p className="text-center">{text}</p>
      <small className="text-center">
        <em>{subText}</em>
      </small>
    </div>
  );
}

export default AdvertBenefitCard;
