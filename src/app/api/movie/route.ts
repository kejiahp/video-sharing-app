import MovieModel from "@/models/Movie.model";
import { apimoviecreationschema } from "@/schema/movie.schema";
import dbConnect from "@/utils/db-connect";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const cleanData = apimoviecreationschema.safeParse(body);

    if (!cleanData.success) {
      return new Response("bad request", { status: 400 });
    }

    const { mainImg, coverImg } = cleanData.data;

    const movie = await MovieModel.create(cleanData);

    if (!movie) {
      return new Response("failed to create movie", { status: 400 });
    }

    return new Response(JSON.stringify(movie), { status: 201 });
  } catch (err: any) {
    console.log("CREATE MOVIE ERROR");
    return new Response("Internal Error", { status: 500 });
  }
}
