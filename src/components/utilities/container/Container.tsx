"use Client";
import React from "react";

const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className="
        max-w-[2520px]
        mx-auto
        xl:px-20
        md:px-20
        sm:px-2
        px-4
    "
    >
      {children}
    </div>
  );
};

export default Container;
