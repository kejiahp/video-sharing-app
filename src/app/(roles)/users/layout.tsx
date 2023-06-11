"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const layout = () => {
  const session = useSession();
  const router = useRouter();

  //   if (
  //     session.status !== "authenticated" ||
  //     session.data.user.role !== "regular"
  //   ) {
  //     toast.error("unauthorized user");
  //     router.push("/");
  //   }

  useEffect(() => {
    if (
      session.status !== "authenticated" ||
      session.data.user.role !== "regular"
    ) {
      toast.error("unauthorized user");
      router.push("/");
    }
  }, [session?.status, router]);

  return <div>layout</div>;
};

export default layout;
