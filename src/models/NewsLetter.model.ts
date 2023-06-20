import mongoose from "mongoose";
import { string } from "zod";

export interface INewLetter {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

type INewLetterDocument = mongoose.Document & INewLetter;

const NewLetterSchema = new mongoose.Schema<INewLetter>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
  },
  { timestamps: true }
);

export default (mongoose.models
  .NewLetter as mongoose.Model<INewLetterDocument>) ||
  mongoose.model("NewLetter", NewLetterSchema);
