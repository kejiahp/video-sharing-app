import DeleteGenre from "@/components/admin/genre/DeleteGenre";
import RenameGenre from "@/components/admin/genre/RenameGenre";
import DeleteMovie from "@/components/admin/movies/DeleteMovie";
import React from "react";

const ModalsContext = () => {
  return (
    <>
      <RenameGenre />
      <DeleteGenre />
      <DeleteMovie />
    </>
  );
};

export default ModalsContext;
