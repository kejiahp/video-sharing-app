"use client";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";

import Logo from "./Logo";
import NavBarPopover from "./NavBarPopover";
import SideBar from "./SideBar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { navigation } from "@/constants/navbar.constants";
import { toast } from "react-hot-toast";
import UserIcon from "./UserIcon";

export type NavBarItemType = {
  name: string;
  listings: {
    title: string;
    link: string;
  }[];
};

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const session = useSession();
  console.log(session);

  return (
    <>
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Logo />
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <AiOutlineBars className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {/* {navigation.map((item) => (
      <a
        key={item.name}
        href={item.href}
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        {item.name}
      </a>
    ))} */}

              {navigation.map((item, index) => (
                <NavBarPopover
                  key={index}
                  title={item.name}
                  listings={item.listings}
                />
              ))}
            </div>

            {session.status === "authenticated" ? (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
                <UserIcon />
                <p
                  className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
                  onClick={() => {
                    signOut();
                    toast.success("Logged Out");
                  }}
                >
                  Logout <span aria-hidden="true">&rarr;</span>
                </p>
              </div>
            ) : (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link
                  href="/login"
                  className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </nav>
          <SideBar
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            navigation={navigation}
          />
        </header>
      </div>
      <div className="pt-14"></div>
    </>
  );
}
