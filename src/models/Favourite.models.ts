import mongoose from "mongoose";

// interface IMovieShortened {
//   movieId: mongoose.Types.ObjectId;
//   name: string;
// mainImg: string;
// duration: number;
// quality: string;
// isSeries: string;
// createdAt: Date;
// }

export interface IFavourites {
  userId: mongoose.Types.ObjectId;
  movies: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

type FavouritesDocument = mongoose.Document & IFavourites;

// const MovieShortendedSchema = new mongoose.Schema<IMovieShortened>({
//   movieId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Movie",
//   },
//   name: {
//     type: String,
//     required: [true, "name is required"],
//   },
//   mainImg: {
//     type: String,
//     required: [true, "mainImg is required"],
//   },
//   duration: {
//     type: Number,
//     required: [true, "duration is required"],
//   },
//   quality: {
//     type: String,
//     required: [true, "quality is required"],
//   },
//   isSeries: {
//     type: String,
//     required: [true, "isSeries is required"],
//   },
//   createdAt: {
//     type: Date,
//     required: [true, "createdAt is required"],
//   },
// });

const FavouriteSchema = new mongoose.Schema<IFavourites>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

export default (mongoose.models
  .Favourite as mongoose.Model<FavouritesDocument>) ||
  mongoose.model("Favourite", FavouriteSchema);
