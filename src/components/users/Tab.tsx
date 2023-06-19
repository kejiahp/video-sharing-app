"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

function Tab({}: Props) {
  const pathname = usePathname();

  return (
    <div className="flex items-center my-4 bg-blue-300 gap-2 sm:gap-5 py-3">
      <Link
        href={"/users/profile"}
        className={`text-2xl ${
          pathname === "/users/profile" ? "font-bold text-white" : "text-black"
        } cursor-pointer`}
      >
        Profile
      </Link>

      <Link
        href={"/users/favourite"}
        className={`text-2xl ${
          pathname === "/users/favourite"
            ? "font-bold text-white"
            : "text-black"
        } cursor-pointer`}
      >
        Favourites
      </Link>
    </div>
  );
}

export default Tab;
