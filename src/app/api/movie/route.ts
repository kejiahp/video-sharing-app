import getCurrentUser from "@/actions/getCurrentUser";
import MovieModel from "@/models/Movie.model";
import { apimoviecreationschema } from "@/schema/movie.schema";
import dbConnect from "@/utils/db-connect";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
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

    return new Response(JSON.stringify(movie), { status: 201 });
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

    let query: any = {};

    if (searchName) {
      query.name = {
        $regex: searchName,
        $options: "i",
      };
    }

    const movies = await MovieModel.find({ ...query }).sort({
      createdAt: "descending",
    });

    if (!movies) return [];

    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GETTING MOVIES");
    return new Response("Internal Error", { status: 500 });
  }
}
