import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Link href={"/"} className="-m-1.5 p-1.5">
        <span className="sr-only">Clever video sharing</span>
        <Image
          className="h-10 w-10 object-contain"
          src="/Logo.jpeg"
          alt=""
          width={100}
          height={100}
        />
      </Link>
    </>
  );
};

export default Logo;
