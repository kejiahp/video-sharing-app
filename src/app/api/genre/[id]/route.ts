import getCurrentUser from "@/actions/getCurrentUser";
import GenreModel from "@/models/Genre.model";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "admin") {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const genre = await GenreModel.findById(params.id);

    if (!genre) return new Response("genre not found", { status: 404 });

    const deletedGenre = await GenreModel.deleteOne({ _id: params.id });

    if (!deletedGenre) {
      return new Response("genre not deleted", { status: 200 });
    }

    return new Response("genre deleted", { status: 200 });
  } catch (err: any) {
    console.log("ERROR DELETE GENRE");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "admin") {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const body = await req.json();

    if (!body.name) return new Response("name is required", { status: 400 });

    const genre = await GenreModel.findByIdAndUpdate(params.id, {
      name: body.name,
    });

    if (!genre) return new Response("genre not found", { status: 404 });

    return new Response(JSON.stringify(genre), { status: 200 });
  } catch (err: any) {
    console.log("ERROR RENAME GENRE");
    return new Response("Internal Error", { status: 500 });
  }
}
