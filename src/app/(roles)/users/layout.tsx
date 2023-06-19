import Tab from "@/components/users/Tab";
import React from "react";

const layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Tab />
      <div className="p-4">{children}</div>
    </>
  );
};

export default layout;
