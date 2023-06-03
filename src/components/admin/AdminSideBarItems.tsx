import Link from "next/link";
import React from "react";

interface AdminSideBarItems {
  title: string;
  link: string;
  icon?: any;
}

const AdminSideBarItems: React.FC<AdminSideBarItems> = ({
  title,
  link,
  icon: Icon,
}) => {
  return (
    <Link
      href={link}
      className="p-1 hover:bg-white group transition duration-200 rounded-md"
    >
      <span className="group-hover:text-blue-400 text-white font-semibold flex gap-2 items-center">
        <Icon className="text-white group-hover:text-blue-400" />
        {title}
      </span>
    </Link>
  );
};

export default AdminSideBarItems;
