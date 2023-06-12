import getCurrentUser from "@/actions/getCurrentUser";
import MovieModel from "@/models/Movie.model";
import { apimovieupdateschema } from "@/schema/movie.schema";
import dbConnect from "@/utils/db-connect";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const movie = await MovieModel.findById(params.id);

    if (!movie) return new Response("movie not found");

    const deletedMovie = await MovieModel.deleteOne({ _id: params.id });

    if (!deletedMovie) {
      return new Response("movie not deleted", { status: 200 });
    }

    return new Response("movie deleted", { status: 200 });
  } catch (err: any) {
    console.log("ERROR AT DELETE MOVIE");
    return new Response("INTERNAL ERROR", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const body = await req.json();

    const cleanData = apimovieupdateschema.safeParse(body);

    if (!cleanData.success) {
      return new Response("bad request", { status: 400 });
    }

    const movie = await MovieModel.findById(params.id);

    if (!movie) return new Response("movie not found");

    const updatedMovie = await MovieModel.findByIdAndUpdate(
      params.id,
      { $set: cleanData.data },
      { new: true }
    );

    if (!updatedMovie) {
      return new Response("movie not updated", { status: 400 });
    }

    return new Response(JSON.stringify(updatedMovie), { status: 200 });
  } catch (err: any) {
    console.log("ERRRO AT UPDATE MOVIES");
    console.log(err);
    return new Response("INTERNAL ERROR", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const movie = await MovieModel.findById(params.id);

    if (!movie) return new Response("moive not found", { status: 404 });

    return new Response(JSON.stringify(movie), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GET SINGLE MOVIE");
    return new Response("Internal Error", { status: 500 });
  }
}
