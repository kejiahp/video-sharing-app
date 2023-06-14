import Link from "next/link";
import React from "react";
import Button from "../utilities/button/Button";

interface AdminHeaderProps {
  header: string;
  subHeader?: string;
  linkText: string;
  href: string;
  noAddBtn?: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  header,
  subHeader,
  linkText,
  noAddBtn,
  href,
}) => {
  return (
    <>
      <section className="flex justify-between items-center py-2">
        <div className="">
          <h1 className="text-xl text-gray-600 font-bold">{header}</h1>
          <h4 className="text-gray-600">{subHeader}</h4>
        </div>

        {noAddBtn ? null : (
          <Link href={href}>
            <Button isSmall>{linkText}</Button>
          </Link>
        )}
      </section>
      <hr />
    </>
  );
};

export default AdminHeader;
