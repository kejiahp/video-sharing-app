"use client";
import React from "react";
import Backdrop from "../backdrop/Backdrop";
import { ClimbingBoxLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: `#4e36d7`,
};

interface LoaderProps {
  color?: boolean;
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ color, loading }) => {
  return (
    <>
      {loading && (
        <Backdrop>
          <ClimbingBoxLoader
            color={`${color || "#fff"}`}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Backdrop>
      )}
    </>
  );
};

export default Loader;
