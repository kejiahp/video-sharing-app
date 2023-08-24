"use client";
import React from "react";
import PublicAdvertItem from "./PublicAdvertItem";
import { IAds } from "@/models/Ads.model";

type Props = {
  isLoading: boolean;
  error: any;
  advert: IAds;
};

function Adverts({ isLoading, error, advert }: Props) {
  if (isLoading) {
    return (
      <div className="text-center p-7">
        <p className="text-blue-400">Welcome to Tyler Movies Empire</p>
      </div>
    );
  }

  if (error || !advert) {
    return null;
  }

  return (
    <div className="w-full h-[200px] flex justify-center items-center flex-col">
      <PublicAdvertItem
        link={advert.link}
        image={advert.image}
        type={advert.advertType}
      />
      <small className="font-bold text-center px-4">{advert.text}</small>
    </div>
  );
}

export default Adverts;
