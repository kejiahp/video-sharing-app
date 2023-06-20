"use client";
import Button from "@/components/utilities/button/Button";
import { useMakeAdmin } from "@/hooks/useUserData";
import { dateformatter } from "@/utils/date-formatter";
import React from "react";

interface Props {
  _id: string;
  email: string;
  type: string;
  createdAt: string;
}

const UserDataItem = ({ email, _id, type, createdAt }: Props) => {
  const handleMakeAdminHandler = useMakeAdmin.getState().onOpen;
  return (
    <>
      <div className="my-1 px-2 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-gray-500 sm:w-1/5">{email}</h1>
        <p className="text-gray-500 text-sm">
          {dateformatter(new Date(createdAt))}
        </p>
        <p className="text-gray-500 text-sm">{type}</p>

        <div className="flex items-center gap-2">
          <Button
            sec
            isSmall
            onClick={() =>
              handleMakeAdminHandler({ email: email, _id: _id, type: type })
            }
          >
            UPDATE ROLE
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserDataItem;
