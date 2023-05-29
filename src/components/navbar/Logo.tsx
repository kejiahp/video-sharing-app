import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href={"/"} className="-m-1.5 p-1.5">
        <span className="sr-only">Clever video sharing</span>
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt=""
        />
      </Link>
    </>
  );
};

export default Logo;
