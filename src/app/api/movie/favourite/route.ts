import getCurrentUser from "@/actions/getCurrentUser";
import FavouriteModels from "@/models/Favourite.models";
import MovieModel from "@/models/Movie.model";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.is_verified === false) {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const body = await req.json();

    if (!body?.movieId) {
      return new Response("bad request", { status: 400 });
    }

    const favouriteFind = await FavouriteModels.findOne({
      userId: currentUser._id,
    });

    if (!favouriteFind) {
      const favourite = await FavouriteModels.create({
        userId: currentUser._id,
      });

      const favouriteAddMovie = await FavouriteModels.findByIdAndUpdate(
        favourite._id,
        { $push: { movies: body.movieId } },
        { new: true }
      );

      return new Response(JSON.stringify(favouriteAddMovie), { status: 200 });
    }

    const movieAlreadyInFavourites = (await FavouriteModels.find({})).filter(
      function (item) {
        return item.movies.includes(
          body.movieId as unknown as mongoose.Types.ObjectId
        );
      }
    );

    if (movieAlreadyInFavourites.length > 0) {
      return new Response("Movie already in Favourite", { status: 400 });
    }

    const favouriteAddMovie = await FavouriteModels.findByIdAndUpdate(
      favouriteFind._id,
      { $push: { movies: body.movieId } },
      { new: true }
    );

    return new Response(JSON.stringify(favouriteAddMovie), { status: 200 });
  } catch (err: any) {
    console.log(err);
    console.log("ERROR AT ADD TO FAVOURITES");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.is_verified === false) {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const favourite = await FavouriteModels.findOne({
      userId: currentUser._id,
    });

    if (!favourite) {
      return new Response("User as no favourite", { status: 400 });
    }

    const favouriteMovies = await MovieModel.find({
      _id: { $in: favourite.movies },
    });

    return new Response(
      JSON.stringify({ ...favourite.toJSON(), movies: favouriteMovies }),
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err);
    console.log("ERROR AT GET FAVOURITES");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.is_verified === false) {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const body = await req.json();

    if (!body?.movieId) {
      return new Response("bad request", { status: 400 });
    }

    const favouriteFind = await FavouriteModels.findOne({
      userId: currentUser._id,
    });

    if (!favouriteFind) {
      return new Response("User as no favourite", { status: 400 });
    }

    const favouriteUpdated = await FavouriteModels.findByIdAndUpdate(
      favouriteFind._id,
      { $pull: { movies: body.movieId } },
      { new: true }
    );

    if (!favouriteUpdated) {
      return new Response("failed to updated favourite", { status: 400 });
    }

    return new Response(JSON.stringify(favouriteUpdated), { status: 200 });
  } catch (err: any) {
    console.log(err);
    console.log("ERROR AT REMOVE FROM FAVOURITES");
    return new Response("Internal Error", { status: 500 });
  }
}
