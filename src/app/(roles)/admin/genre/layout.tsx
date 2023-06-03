import AdminHeader from "@/components/admin/AdminHeader";
import AdminSearchBar from "@/components/admin/AdminSearchBar";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <AdminHeader
        header={"Genre"}
        linkText={"ADD GENRE"}
        subHeader="all genre's"
        href={"/admin/genre/add"}
      />
      <div className="mt-4">
        <AdminSearchBar />
        {children}
      </div>
    </div>
  );
};

export default layout;
