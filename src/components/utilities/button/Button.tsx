import React from "react";

interface ButtonProps {
  onClick?: (data?: any) => void;
  isSmall?: boolean;
  isLink?: boolean;
  link?: string;
  sec?: boolean;
  disable?: boolean;
  className?: string;
}

const Button = ({
  children,
  onClick,
  isSmall,
  className = "",
  sec,
  disable,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={`${className} mx-auto lg:mx-0  font-bold rounded-full my-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out 
      ${sec ? "bg-blue-600" : "bg-white"} 
      ${sec ? "text-white" : "text-blue-900"} 
      ${sec ? "hover:text-black " : "hover:text-blue-500 "}
      ${isSmall ? "py-2 px-4 text-sm" : "py-4 px-8"}
      ${disable ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
