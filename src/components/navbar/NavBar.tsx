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
import fetcher from "@/libs/fetcher";
import useSWR from "swr";
import Loader from "../loader/Loader";

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

  const {
    isLoading,
    data: genreOptions,
    error,
  } = useSWR(`/api/genre`, fetcher);

  let genreAll: any[] = [];
  if (genreOptions) {
    genreAll = genreOptions?.map((item: any) => ({
      title: item.name,
      link: `/genre/${item.name}/${item._id}`,
    }));
  }

  return (
    <>
      <Loader loading={isLoading} />
      <div className="fixed top-0 left-0 w-[100%] z-50 ">
        <header className="bg-white absolute inset-x-0 top-0 z-50 shadow-sm shadow-blue-300">
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
                <AiOutlineBars className="h-10 w-10" aria-hidden="true" />
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

              <NavBarPopover
                title={"Genre"}
                listings={!error && genreAll.length > 0 ? genreAll : []}
              />

              <Link
                href={"/advertise-with-us"}
                className="font-semibold leading-6 text-gray-900 mr-12"
              >
                Advertise with us
              </Link>
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
