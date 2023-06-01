import React from "react";

const Backdrop = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-y-scroll flex justify-center items-center z-[5000] bg-black bg-opacity-80">
      {children}
    </div>
  );
};

export default Backdrop;
