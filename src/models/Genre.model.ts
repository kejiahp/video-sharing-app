import mongoose from "mongoose";

export interface IGenre {
  name: string;
  createdAt: string;
  updatedAt: string;
}

type GenreDocument = mongoose.Document & IGenre;

const GenreSchema = new mongoose.Schema<IGenre>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "name is required"],
    },
  },
  { timestamps: true }
);

export default (mongoose.models.Genre as mongoose.Model<GenreDocument>) ||
  mongoose.model("Genre", GenreSchema);
