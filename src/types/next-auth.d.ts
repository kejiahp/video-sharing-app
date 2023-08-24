import { User } from "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "regular" | "admin" | "super-admin" | string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      role: "regular" | "admin" | "super-admin" | string;
      id: string;
    };
  }
}
