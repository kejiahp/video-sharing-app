import mongoose from "mongoose";

export interface IUser {
  type: string;
  username: string;
  email: string;
  password: string;
  passwordResetCode: string;
  is_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type UserDocument = mongoose.Document & IUser;

const UserSchema = new mongoose.Schema<IUser>(
  {
    type: {
      type: String,
      default: "regular",
      enum: {
        values: ["regular", "admin", "super-admin"],
        message: "{VALUE} is not supported",
      },
    },
    username: {
      type: String,
      unique: true,
      match: [/^[a-z0-9_\.]+$/, "invalid username"],
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

export default (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model("User", UserSchema);
