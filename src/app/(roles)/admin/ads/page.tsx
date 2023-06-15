import React from "react";

interface Props {}

const Page = (props: Props) => {
  return (
    <>
      <div className="">
        <h1 className="text-2xl text-gray-500">Homepage Adverts</h1>
        <h1 className="text-2xl text-gray-500">Genre Adverts</h1>
        <h1 className="text-2xl text-gray-500">Series Adverts</h1>
        <h1 className="text-2xl text-gray-500">Movie Adverts</h1>
      </div>
    </>
  );
};

export default Page;
