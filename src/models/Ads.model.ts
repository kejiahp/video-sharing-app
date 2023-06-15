import mongoose from "mongoose";

export interface IAds {
  text: string;
  image: string;
  link: string;
  page: string;
  createdAt: Date;
  updatedAt: Date;
}

type AdsDocument = IAds & mongoose.Document;

const AdsSchema = new mongoose.Schema<IAds>(
  {
    text: {
      type: String,
      required: [true, "text is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    link: {
      type: String,
      required: [true, "link is required"],
    },
    page: {
      type: String,
      required: [true, "page is required"],
      enum: {
        values: ["home", "genre", "movie", "series"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

export default (mongoose.models.Ads as mongoose.Model<AdsDocument>) ||
  mongoose.model("Ads", AdsSchema);
