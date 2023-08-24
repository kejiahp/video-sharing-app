export interface SafeUser {
  _id: string;
  type: "regular" | "admin" | "super-admin";
  username: string;
  email: string;
  password: string;
  passwordResetCode: string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
