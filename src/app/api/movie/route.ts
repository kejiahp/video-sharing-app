import getCurrentUser from "@/actions/getCurrentUser";
import MovieModel from "@/models/Movie.model";
import SeriesModel from "@/models/Series.model";
import { apimoviecreationschema } from "@/schema/movie.schema";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";

// export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    const isAdmin = ["super-admin", "admin"].includes(currentUser?.type);
    if (!currentUser || !isAdmin) {
      return new Response("Unauthorized User", { status: 401 });
    }
    await dbConnect();

    const body = await req.json();

    const cleanData = apimoviecreationschema.safeParse(body);

    if (!cleanData.success) {
      return new Response("bad request", { status: 400 });
    }

    const movie = await MovieModel.create(cleanData.data);

    if (!movie) {
      return new Response("failed to create movie", { status: 400 });
    }

    if (movie.isSeries === "true") {
      const series = await SeriesModel.create({
        movieId: movie._id,
        movieName: movie.name,
      });

      if (series) {
        return new Response("movie and series created", { status: 201 });
      }

      return new Response("movie created, series not created", { status: 201 });
    }

    return new Response("movie created", { status: 201 });
  } catch (err: any) {
    console.log("CREATE MOVIE ERROR");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const newURL = new URL(req.url);
    const searchName = newURL.searchParams.get("q");

    const page = Number(newURL.searchParams.get("p")) || 0;
    const moviesPerPage = 12;
    const skip = page * moviesPerPage;

    const count = await MovieModel.estimatedDocumentCount();
    const pageCount = Math.ceil(count / moviesPerPage);

    let query: any = {};

    if (searchName) {
      query.name = {
        $regex: searchName,
        $options: "i",
      };
    }

    const movies = await MovieModel.find({ ...query })
      .sort({
        createdAt: "descending",
      })
      .skip(skip)
      .limit(moviesPerPage);

    if (!movies) return new Response(JSON.stringify([]), { status: 200 });

    return new Response(JSON.stringify({ count, pageCount, movies }), {
      status: 200,
    });
  } catch (err: any) {
    console.log("ERROR GETTING MOVIES");
    return new Response("Internal Error", { status: 500 });
  }
}
