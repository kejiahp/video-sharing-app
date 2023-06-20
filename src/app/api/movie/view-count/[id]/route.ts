import MovieModel from "@/models/Movie.model";
import dbConnect from "@/utils/db-connect";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const movie = await MovieModel.findByIdAndUpdate(params.id, {
      $inc: { viewCount: 1 },
    });

    if (!movie) {
      return new Response("view count increment failed", { status: 500 });
    }

    return new Response("view count increased", { status: 200 });
  } catch (err: any) {
    console.log("ERROR VIEW COUNT");
    return new Response("Internal Error", { status: 500 });
  }
}
