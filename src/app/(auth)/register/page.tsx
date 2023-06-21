"use client";
import Register from "@/components/authentication/Register";
import Container from "@/components/utilities/container/Container";
import React from "react";

const Page = () => {
  return (
    <div>
      <Container>
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <Register />
        </div>
      </Container>
    </div>
  );
};

export default Page;
