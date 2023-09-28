import MovieModel from "@/models/Movie.model";
import dbConnect from "@/utils/db-connect";

// export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const newURL = new URL(req.url);
    const searchParams = newURL.searchParams;

    const page = Number(searchParams.get("p")) || 0;
    const moviesPerPage = Number(searchParams.get("limit")) || 48;
    const skip = page * moviesPerPage;

    let count = 0;
    let pageCount = 0;

    let searchQuery: any = {
      createdAt: -1,
    };

    if (searchParams.has("trending")) {
      searchQuery = { viewCount: -1, ...searchQuery };
    }

    const moviesQuery = MovieModel.find().sort({
      ...searchQuery,
    });

    if (searchParams.get("exclude")) {
      moviesQuery.where("_id").ne(searchParams.get("exclude"));
    }

    if (searchParams.has("unavailable")) {
      moviesQuery.where("availability").equals("coming_soon");
    }

    if (searchParams.get("series")) {
      moviesQuery.where("isSeries").equals(searchParams.get("series"));

      if (searchParams.get("series") === "true") {
        count = await MovieModel.countDocuments({
          isSeries: { $eq: "true" },
        });

        pageCount = Math.ceil(count / moviesPerPage);
      } else {
        count = await MovieModel.countDocuments({
          isSeries: { $eq: "false" },
        });

        pageCount = Math.ceil(count / moviesPerPage);
      }

      if (searchParams.get("p")) {
        moviesQuery.skip(skip);
      }
    }

    if (searchParams.get("limit")) {
      const limit = Number(searchParams.get("limit"));
      moviesQuery.limit(limit);
    }

    if (searchParams.get("genre")) {
      count = await MovieModel.countDocuments({
        genre: { $elemMatch: { $eq: searchParams.get("genre") } },
      });
      pageCount = Math.ceil(count / moviesPerPage);

      moviesQuery.find({
        genre: { $elemMatch: { $eq: searchParams.get("genre") } },
      });

      if (searchParams.get("p")) {
        moviesQuery.skip(skip);
      }

      const moviesByGenre = await moviesQuery;

      if (!moviesByGenre) {
        return new Response(JSON.stringify([]), { status: 200 });
      }

      return new Response(
        JSON.stringify({ count, pageCount, movies: moviesByGenre }),
        { status: 200 }
      );
    }

    const movies = await moviesQuery;

    if (!movies) return new Response(JSON.stringify([]), { status: 200 });

    return new Response(JSON.stringify({ count, pageCount, movies }), {
      status: 200,
    });
  } catch (err: any) {
    console.log("ERROR GETTING FILTERED MOVIES");
    return new Response("Internal Error", { status: 500 });
  }
}
