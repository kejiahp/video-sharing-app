import getCurrentUser from "@/actions/getCurrentUser";
import CommentsModel from "@/models/Comments.model";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const searchParams = new URL(req.url).searchParams;

    if (!searchParams.get("movieId")) {
      return new Response("bad request", { status: 400 });
    }

    const comments = await CommentsModel.find({
      movieId: searchParams.get("movieId"),
      isDeleted: false,
    }).populate("userId", "_id username");

    if (!comments) {
      return new Response("failed to get comments", { status: 400 });
    }

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GETTING ALL MOVIE COMMENTS");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.is_verified === false) {
      return new Response("Unauthorized user");
    }

    await dbConnect();

    const body = await req.json();

    if (!body?.movieId || !body?.comment) {
      return new Response("bad request", { status: 400 });
    }

    const comment = await CommentsModel.create({
      userId: currentUser._id,
      movieId: body.movieId,
      comment: body.comment,
    });

    if (!comment) {
      return new Response("failed to create comment", { status: 400 });
    }

    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (err: any) {
    console.log("ERROR CREATING MOVIE COMMENTS");
    return new Response("Internal Error", { status: 500 });
  }
}
