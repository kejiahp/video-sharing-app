import mongoose from "mongoose";

export interface IComment {
  movieId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  comment: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type CommentDocument = mongoose.Document & IComment;

const CommentSchema = new mongoose.Schema<IComment>(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: [true, "comment is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default (mongoose.models.Comment as mongoose.Model<CommentDocument>) ||
  mongoose.model("Comment", CommentSchema);
