import MovieModel from "@/models/Movie.model";
import dbConnect from "@/utils/db-connect";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const newURL = new URL(req.url);
    const searchParams = newURL.searchParams;

    //   let query: any = {};

    const moviesQuery = MovieModel.find({}).sort({
      createdAt: "descending",
    });

    if (searchParams.get("exclude")) {
      moviesQuery.where("_id").ne(searchParams.get("exclude"));
    }

    if (searchParams.has("unavailable")) {
      moviesQuery.where("availability").equals("coming_soon");
    }

    if (searchParams.get("series")) {
      moviesQuery.where("isSeries").equals(searchParams.get("series"));
    }

    if (searchParams.get("limit")) {
      const limit = Number(searchParams.get("limit"));
      moviesQuery.limit(limit);
    } else if (searchParams.get("genre")) {
      const moviesByQuery = (await moviesQuery).filter(function (item) {
        return item.genre.includes(
          searchParams.get("genre") as unknown as mongoose.Types.ObjectId
        );
      });

      if (!moviesByQuery) {
        return new Response(JSON.stringify([]), { status: 200 });
      }

      return new Response(JSON.stringify(moviesByQuery), { status: 200 });
    }

    const movies = await moviesQuery;

    if (!movies) return new Response(JSON.stringify([]), { status: 200 });

    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GETTING MOVIES");
    return new Response("Internal Error", { status: 500 });
  }
}
