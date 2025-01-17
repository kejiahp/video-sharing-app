import React from "react";

interface Props {
  image: string;
  type: string;
  link: string;
}

function PublicAdvertItem({ link, image, type }: Props) {
  return (
    <>
      {type === "banner" ? (
        <div
          onClick={() => window.open(link, "_blank")}
          className="cursor-pointer relative overflow-hidden w-full rounded-2xl"
        >
          <img
            src={image}
            className="w-full h-full object-contain"
            alt={type}
          />
        </div>
      ) : (
        <div
          onClick={() => window.open(link, "_blank")}
          className="cursor-pointer relative overflow-hidden bg-no-repeat bg-cover max-w-[250px] sm:max-w-xs rounded-2xl"
        >
          <img src={image} className="max-w-xs" alt={type} />
          <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden opacity-0 transition duration-700 ease-in-out bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-100 flex justify-center items-center">
            <p className="text-white font-semibold">advertisment</p>
          </div>
        </div>
      )}
    </>
  );
}

export default PublicAdvertItem;
