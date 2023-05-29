"use client";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import { Dialog } from "@headlessui/react";
import NavBarDisclosure from "./NavBarDisclosure";
import { NavBarItemType } from "./NavBar";
import { useRouter } from "next/navigation";

interface SideBarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NavBarItemType[];
}

const SideBar: React.FC<SideBarProps> = ({
  mobileMenuOpen,
  navigation,
  setMobileMenuOpen,
}) => {
  const router = useRouter();

  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <HiXMark className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            {/* <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div> */}
            {navigation.map((item, index) => (
              <NavBarDisclosure
                key={index}
                name={item.name}
                listings={item.listings}
              />
            ))}
            <div className="py-6">
              <p
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/login");
                }}
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Log in
              </p>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default SideBar;
