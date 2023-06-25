import mongoose from "mongoose";

export interface IHeroBgImageSchema {
  image: string;
  createdAt: string;
  updatedAt: string;
}

type IHeroBgImageSchemaDocument = mongoose.Document & IHeroBgImageSchema;

const HeroBgImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "image is required"],
    },
  },
  { timestamps: true }
);

export default (mongoose.models
  .HeroBgImage as mongoose.Model<IHeroBgImageSchemaDocument>) ||
  mongoose.model("HeroBgImage", HeroBgImageSchema);
