"use client";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";

import Logo from "./Logo";
import NavBarPopover from "./NavBarPopover";
import SideBar from "./SideBar";

export type NavBarItemType = {
  name: string;
  listings: {
    title: string;
    link: string;
  }[];
};

const navigation = [
  {
    name: "Genre",
    listings: [
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
    ],
  },
  {
    name: "Movies",
    listings: [
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
    ],
  },
  {
    name: "TV Shows",
    listings: [
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
      { title: "fallguys", link: "/about" },
    ],
  },
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <SideBar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          navigation={navigation}
        />
      </header>
    </div>
  );
}
