import MovieModel from "@/models/Movie.model";
import dbConnect from "@/utils/db-connect";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
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
    await dbConnect();

    const body = await req.json();

    const movie = await MovieModel.findById(params.id);

    if (!movie) return new Response("movie not found");

    const updatedMovie = await MovieModel.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!updatedMovie) {
      return new Response("movie not updated", { status: 400 });
    }

    return new Response(JSON.stringify(updatedMovie), { status: 200 });
  } catch (err: any) {
    console.log("ERRRO AT UPDATE MOVIES");
    return new Response("INTERNAL ERROR", { status: 500 });
  }
}
