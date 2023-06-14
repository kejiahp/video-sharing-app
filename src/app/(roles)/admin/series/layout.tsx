import AdminHeader from "@/components/admin/AdminHeader";
import AdminSearchBar from "@/components/admin/AdminSearchBar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <AdminHeader
        header={"Movies"}
        linkText={""}
        noAddBtn={true}
        subHeader="all movie series"
        href={""}
      />
      <div className="mt-4">
        <AdminSearchBar
          url="/admin/series/search/"
          placeholder="Search by movie name"
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
