"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const AuthContext = ({ children }: React.PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
