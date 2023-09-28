"use client";

import React from "react";
import Button from "../utilities/button/Button";

type Props = {
  pages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ pages, currentPage, setCurrentPage }: Props) {
  const nextPageHandler = () => {
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPageHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center my-3">
      <Button sec isSmall onClick={previousPageHandler}>
        Previous
      </Button>
      <Button sec isSmall onClick={nextPageHandler}>
        Next
      </Button>
    </div>
  );
}

export default Pagination;
