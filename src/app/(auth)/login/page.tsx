"use client";
import Login from "@/components/authentication/Login";
import Container from "@/components/utilities/container/Container";
import React from "react";

const Page = () => {
  return (
    <div>
      <Container>
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <Login />
        </div>
      </Container>
    </div>
  );
};

export default Page;
