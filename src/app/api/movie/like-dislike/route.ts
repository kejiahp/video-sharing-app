import getCurrentUser from "@/actions/getCurrentUser";
import MovieModel from "@/models/Movie.model";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";
import mongoose from "mongoose";
import { isArray } from "util";

export async function PATCH(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.is_verified === false) {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const body: { movieId?: string; action?: string } = await req.json();

    if (!body?.movieId || !body?.action) {
      return new Response("bad request", { status: 400 });
    }

    const movie = await MovieModel.findById(body.movieId);

    if (!movie) {
      return new Response("movie not found", { status: 404 });
    }

    if (body.action === "like") {
      if (
        movie.likes.includes(
          currentUser._id as unknown as mongoose.Types.ObjectId
        )
      ) {
        return new Response("You've already liked this video", { status: 200 });
      }

      const updatedMovie = await MovieModel.findByIdAndUpdate(body.movieId, {
        $push: {
          likes: currentUser._id,
        },
      });

      return new Response(JSON.stringify(updatedMovie), { status: 200 });
    }

    if (body.action === "dislike") {
      if (
        !movie.likes.includes(
          currentUser._id as unknown as mongoose.Types.ObjectId
        )
      ) {
        return new Response("You've haven't liked this video", { status: 200 });
      }

      const updateMovie = await MovieModel.findByIdAndUpdate(body.movieId, {
        $pull: {
          likes: currentUser._id,
        },
      });

      return new Response(JSON.stringify(updateMovie), { status: 200 });
    }

    return new Response("invalid action", { status: 400 });
  } catch (err: any) {
    console.log(err);
    console.log("ERROR LIKING OR DISLIKING");
    return new Response("Internal Error", { status: 500 });
  }
}
