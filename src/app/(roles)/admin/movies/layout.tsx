import AdminHeader from "@/components/admin/AdminHeader";
import AdminSearchBar from "@/components/admin/AdminSearchBar";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <AdminHeader
        header={"Movies"}
        linkText={"ADD MOVIES"}
        subHeader="all movies"
        href={"/admin/movies/add"}
      />
      <div className="mt-4">
        <AdminSearchBar
          url="/admin/movies/search/"
          placeholder="Enter the name of movies"
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
