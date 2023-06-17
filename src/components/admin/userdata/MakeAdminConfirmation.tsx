"use client";
import React, { useState } from "react";
import Modal from "../../utilities/modal/Modal";
import { useMakeAdmin } from "../../../hooks/useUserData";
import { toast } from "react-hot-toast";
import axios from "axios";
import { mutate } from "swr";
import { useRouter } from "next/navigation";

export default function MakeAdminConfirmation() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const makeAdminConfirmationCtrl = useMakeAdmin((state) => ({
    isOpen: state.isOpen,
    data: state.data,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));

  const roleChecker = () => {
    if (makeAdminConfirmationCtrl?.data?.type === "admin") {
      return "regular";
    }
    if (makeAdminConfirmationCtrl?.data?.type === "regular") {
      return "admin";
    } else {
      return "admin";
    }
  };

  const bodyContent = (
    <div className="">
      <div className="mb-2">
        <p className="font-semibold">Name: </p>
        <span>{makeAdminConfirmationCtrl.data?.email}</span>
      </div>
      <div>
        <p className="font-semibold">Id: </p>
        <span>{makeAdminConfirmationCtrl.data?._id}</span>
      </div>
      <div>
        <p className="font-semibold text-rose-500">
          this user role will be updated from "
          {makeAdminConfirmationCtrl.data?.type}" to "{roleChecker()}"
        </p>
      </div>
    </div>
  );

  const onSubmitHandler = () => {
    try {
      setIsLoading(true);

      axios
        .patch(`/api/userdata`, {
          id: makeAdminConfirmationCtrl.data?._id,
          email: makeAdminConfirmationCtrl.data?.email,
        })
        .then(() => {
          toast.success("User role updated");
          mutate(`/api/userdata`);
          router.refresh();
          makeAdminConfirmationCtrl.onClose();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    } catch (err: any) {
      console.log(err);
      toast.error("FAILED TO UPDATE ROLE");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      closeText={"Cancel"}
      submitText="Update"
      header="Update User Role"
      subHeader="Are you sure you want to update this user's role ?"
      bodyContent={bodyContent}
      isOpen={makeAdminConfirmationCtrl.isOpen}
      disabled={isLoading}
      onSubmitfn={onSubmitHandler}
      onClosefn={makeAdminConfirmationCtrl.onClose}
    />
  );
}
