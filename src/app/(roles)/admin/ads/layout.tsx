"use client";
import AdminHeader from "@/components/admin/AdminHeader";
import { useCreateAdvert } from "@/hooks/useAdvert";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const createAdvertModal = useCreateAdvert.getState().onOpen;
  return (
    <div>
      <AdminHeader
        header={"Advertisements"}
        linkText={"ADD ADVERT"}
        subHeader="all adverts's"
        href={""}
        noAddBtn={true}
        actionFn={createAdvertModal}
      />
      {children}
    </div>
  );
}

export default Layout;
