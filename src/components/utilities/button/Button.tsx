import React from "react";

interface ButtonProps {
  onClick?: () => void;
  isSmall?: boolean;
  isLink?: boolean;
  link?: string;
  sec?: boolean;
}

const Button = ({
  children,
  onClick,
  isSmall,
  isLink,
  link,
  sec,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={`mx-auto lg:mx-0  font-bold rounded-full my-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out 
      ${sec ? "bg-blue-600" : "bg-white"} 
      ${sec ? "text-white" : "text-blue-900"} 
      ${sec ? "hover:text-black " : "hover:text-blue-500 "}
      ${isSmall ? "py-2 px-4" : "py-4 px-8"}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
