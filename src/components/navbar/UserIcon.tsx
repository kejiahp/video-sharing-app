"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import NavBarPopover from "./NavBarPopover";

const UserIcon = () => {
  const session = useSession();
  const toRender = (
    <div className="rounded-full cursor-pointer border border-black border-solid">
      <Image
        src={"/no-user.png"}
        width={30}
        height={30}
        alt="User Icon"
        className="p-2"
      />
    </div>
  );
  const listings = () => {
    if (session.data?.user.role === "regular") {
      return [
        { title: "Profile", link: "/users/profile" },
        { title: "Favourites", link: "/users/favourite" },
      ];
    } else {
      return [{ title: "Profile", link: "/admin" }];
    }
  };

  return (
    <NavBarPopover isVertical={true} title={toRender} listings={listings()} />
  );
};

export default UserIcon;
