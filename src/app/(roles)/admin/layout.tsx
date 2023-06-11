"use client";
import AdminSideBar from "@/components/admin/AdminSideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const layout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (
      session.status !== "authenticated" ||
      session.data.user.role !== "admin"
    ) {
      toast.error("unauthorized user");
      router.push("/");
    }
  }, [session?.status, router]);

  return (
    <div className="pt-8">
      <AdminSideBar />
      <section className="md:ml-[200px] md:w-[calc(100%-200px)] p-2">
        {children}
      </section>
    </div>
  );
};

export default layout;
