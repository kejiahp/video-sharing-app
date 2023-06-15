import CreateAdvert from "@/components/admin/ads/CreateAdvert";
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
      <CreateAdvert />
    </>
  );
};

export default ModalsContext;
