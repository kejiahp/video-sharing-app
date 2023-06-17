import CreateAdvert from "@/components/admin/ads/CreateAdvert";
import DeleteAdvert from "@/components/admin/ads/DeleteAdvert";
import UpdateAdvert from "@/components/admin/ads/UpdateAdvert";
import DeleteGenre from "@/components/admin/genre/DeleteGenre";
import RenameGenre from "@/components/admin/genre/RenameGenre";
import DeleteMovie from "@/components/admin/movies/DeleteMovie";
import MakeAdminConfirmation from "@/components/admin/userdata/MakeAdminConfirmation";
import React from "react";

const ModalsContext = () => {
  return (
    <>
      <RenameGenre />
      <DeleteGenre />
      <DeleteMovie />
      <CreateAdvert />
      <DeleteAdvert />
      <UpdateAdvert />
      <MakeAdminConfirmation />
    </>
  );
};

export default ModalsContext;
