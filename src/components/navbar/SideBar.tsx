"use client";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import { Dialog } from "@headlessui/react";
import NavBarDisclosure from "./NavBarDisclosure";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import UserIcon from "./UserIcon";
import Link from "next/link";
import Logo from "./Logo";

interface SideBarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
}

const SideBar: React.FC<SideBarProps> = ({
  mobileMenuOpen,
  navigation,
  setMobileMenuOpen,
}) => {
  const router = useRouter();
  const session = useSession();

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
          <Logo />

          {session.status === "authenticated" ? <UserIcon /> : null}

          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <HiXMark className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-12 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div>
              <Link
                href={"/series"}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Series
              </Link>
            </div>
            <div>
              <Link
                href={"/movies"}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Movies
              </Link>
            </div>

            <NavBarDisclosure name={"Genre"} listings={navigation} />

            <div className="py-6">
              {session.status === "authenticated" ? (
                <p
                  onClick={() => {
                    signOut();
                    toast.success("Logged Out");
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                >
                  Log out
                </p>
              ) : (
                <p
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/login");
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                >
                  Log in
                </p>
              )}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default SideBar;
