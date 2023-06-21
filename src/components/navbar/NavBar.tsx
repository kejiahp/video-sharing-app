"use client";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";

import Logo from "./Logo";
import NavBarPopover from "./NavBarPopover";
import SideBar from "./SideBar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import UserIcon from "./UserIcon";
import { IGenre } from "@/models/Genre.model";

export type NavBarItemType = {
  name: string;
  listings: {
    title: string;
    link: string;
  }[];
};

interface NavBarProps {
  genreAll: (IGenre & { _id: string })[];
}

export default function NavBar({ genreAll }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const session = useSession();

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

            <div className="hidden lg:flex items-center lg:gap-x-12">
              <Link
                href={"/series"}
                className="font-semibold leading-6 text-gray-900 mr-12"
              >
                Series
              </Link>
              <Link
                href={"/movies"}
                className="font-semibold leading-6 text-gray-900 mr-12"
              >
                Movies
              </Link>
              {/*@ts-ignore */}
              <NavBarPopover title={"Genre"} listings={genreAll} />
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
            navigation={genreAll}
          />
        </header>
      </div>
      <div className="pt-14"></div>
    </>
  );
}
