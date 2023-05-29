"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import Link from "next/link";
import { NavBarItemType } from "./NavBar";

const NavBarDIsclosure = ({ name, listings }: NavBarItemType) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="py-2 flex items-center gap-1">
            <span>{name}</span>
            <HiChevronDown
              className={`inline ${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-blue-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            {listings.map((item, index) => (
              <p className="p-1" key={index}>
                <Link href={item.link || "#"} className="hover:text-blue-600">
                  {item.title}
                </Link>
              </p>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBarDIsclosure;
