import mongoose from "mongoose";

export interface IMovie {
  name: string;
  isSeries: string;
  mainImg: string;
  coverImg: string;
  trailer: string;
  description: string;
  releaseDate: Date;
  genre: mongoose.Types.ObjectId[];
  casts: string;
  duration: number;
  country: string;
  production: string;
  likes: mongoose.Types.ObjectId[];
  quality: string;
  imdbRating: number;
  downloadLink: string;
  availability: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

type MovieDocument = IMovie & mongoose.Document;

const MovieSchema = new mongoose.Schema<IMovie>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    isSeries: {
      type: String,
      default: "false",
      enum: {
        values: ["true", "false"],
        message: "{VALUE} is not supported",
      },
    },
    mainImg: { type: String, required: [true, "mainImg is required"] },
    coverImg: { type: String, required: [true, "coverImg is required"] },
    trailer: {
      type: String,
      required: [true, "trailer is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    releaseDate: {
      type: Date,
      required: [true, "releaseDate is required"],
    },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    casts: {
      type: String,
      required: [true, "casts is required"],
    },
    duration: {
      type: Number,
      required: [true, "duration is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    production: {
      type: String,
      required: [true, "production is required"],
    },
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    ],
    quality: {
      type: String,
      default: "HD",
      enum: {
        values: ["POOR", "AVERAGE", "GOOD", "EXCELLENT"],
        message: "{VALUE} is not supported",
      },
    },
    imdbRating: {
      type: Number,
      required: false,
    },
    downloadLink: {
      type: String,
      required: false,
    },
    availability: {
      type: String,
      default: "available",
      enum: {
        values: ["available", "coming_soon"],
        message: "{VALUE} is not supported",
      },
    },
    viewCount: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  { timestamps: true }
);

export default (mongoose.models.Movie as mongoose.Model<MovieDocument>) ||
  mongoose.model("Movie", MovieSchema);
