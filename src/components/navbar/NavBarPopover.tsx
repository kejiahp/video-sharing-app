"use client";
import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";

interface NavBarPopoverProps {
  title: string | React.JSX.Element;
  listings: { title: string; link: string }[];
  isVertical?: boolean;
}

const NavBarPopover: React.FC<NavBarPopoverProps> = ({
  title,
  listings,
  isVertical,
}) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`outline-none 
          ${open ? "text-blue-400" : ""}
           hover:text-blue-400 font-bold transition duration-200 p-1 rounded-sm`}
          >
            {title}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`absolute z-10 ${
                isVertical ? "w-[120px]" : "w-[400px]"
              } top-10`}
            >
              <div
                className={`grid bg-white rounded-md p-3 shadow-md ${
                  isVertical ? "grid-cols-1" : "grid-cols-3"
                }`}
              >
                {listings.map((item, index) => (
                  <Link
                    href={item.link || "#"}
                    className="p-2 hover:text-blue-600"
                    key={index}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default NavBarPopover;
