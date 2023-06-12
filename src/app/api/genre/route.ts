import getCurrentUser from "@/actions/getCurrentUser";
import GenreModel from "@/models/Genre.model";
import dbConnect from "@/utils/db-connect";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const body = await req.json();

    if (!body.name) return new Response("name is required", { status: 400 });

    const existingGenre = await GenreModel.findOne({ name: body.name });

    if (existingGenre)
      return new Response("genre with this name already exists");

    const genre = await GenreModel.create({ name: body.name });

    return new Response(JSON.stringify(genre), { status: 201 });
  } catch (err: any) {
    console.log("ERROR CREATE GENRE");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const genres = await GenreModel.find();

    return new Response(JSON.stringify(genres), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GET ALL GENRE");
    return new Response("Internal Error", { status: 500 });
  }
}
