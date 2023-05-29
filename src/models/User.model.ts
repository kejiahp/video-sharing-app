import mongoose from "mongoose";

export interface UserDocument {
  type: string;
  username: string;
  email: string;
  password: string;
  passwordResetCode: string;
  is_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    type: {
      type: String,
      default: "regular",
      enum: {
        values: ["regular", "admin"],
        message: "{VALUE} is not supported",
      },
    },
    username: {
      type: String,
      unique: true,
      match: [
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
      ],
      required: [true, "username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    passwordResetCode: {
      type: String,
      default: "",
    },
    is_verified: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//@ts-ignore
const User = mongoose.model.User || mongoose.model("User", UserSchema);

export default User;
