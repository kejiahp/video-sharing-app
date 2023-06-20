"use client";
import React, { useState } from "react";
import AdminSideBarItems from "./AdminSideBarItems";
import { HiXMark } from "react-icons/hi2";
import { MdOutlineLocalMovies } from "react-icons/md";
import { BiCategoryAlt, BiNews } from "react-icons/bi";
import { SiSteelseries } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { RiAdvertisementFill } from "react-icons/ri";
import Button from "../utilities/button/Button";

const AdminSideBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="md:hidden flex justify-center items-center my-1">
        <Button isSmall sec onClick={() => setShowMenu(!showMenu)}>
          navigate
        </Button>
      </div>

      <div
        className={`h-[calc(100vh-80px)] bg-blue-500 w-[200px] fixed bottom-0 left-0 z-50 p-4 pt-9 transition overflow-y-auto flex gap-2 flex-col md:translate-x-0 ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <HiXMark
          size={30}
          onClick={() => setShowMenu(!showMenu)}
          className="absolute top-2 right-2 font-bold text-white cursor-pointer md:hidden"
        />
        <AdminSideBarItems
          title={"Genre"}
          link={"/admin/genre"}
          icon={BiCategoryAlt}
        />
        <AdminSideBarItems
          title={"Movies"}
          link="/admin/movies"
          icon={MdOutlineLocalMovies}
        />
        <AdminSideBarItems
          title="Series"
          link="/admin/series"
          icon={SiSteelseries}
        />
        <AdminSideBarItems
          title="Advertisments"
          link="/admin/ads"
          icon={RiAdvertisementFill}
        />
        <AdminSideBarItems
          title="Users"
          link="/admin/userdata"
          icon={FiUsers}
        />
        <AdminSideBarItems
          title="NewsLetters"
          link="/admin/newsletters"
          icon={BiNews}
        />
      </div>
    </>
  );
};

export default AdminSideBar;
