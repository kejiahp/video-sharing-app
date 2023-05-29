import Link from "next/link";
import React from "react";
interface FooterListItemsProps {
  title: string;
  link?: string;
}

const FooterListItems: React.FC<FooterListItemsProps> = ({ title, link }) => {
  return (
    <li className="mt-2 inline-block mr-2 md:block md:mr-0">
      <Link
        href={link || "#"}
        className="no-underline hover:underline text-black hover:text-pink-500"
      >
        {title}
      </Link>
    </li>
  );
};

export default FooterListItems;
