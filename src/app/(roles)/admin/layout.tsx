import AdminSideBar from "@/components/admin/AdminSideBar";
import React from "react";

const layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="pt-8">
      <AdminSideBar />
      <section className="md:ml-[200px] md:w-[calc(100%-200px)] p-2">
        {children}
      </section>
    </div>
  );
};

export default layout;
