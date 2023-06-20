import getCurrentUser from "@/actions/getCurrentUser";
import CommentsModel from "@/models/Comments.model";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.is_verified === false) {
      return new Response("Unauthorized user");
    }

    await dbConnect();

    if (!params?.id) {
      return new Response("bad request", { status: 400 });
    }

    const comment = await CommentsModel.findByIdAndDelete(params.id);

    if (!comment) {
      return new Response("comment not found", { status: 404 });
    }

    return new Response("comment deleted", { status: 200 });
  } catch (err: any) {
    console.log(err);
    console.log("ERROR DELETING MOVIE COMMENTS");
    return new Response("Internal Error", { status: 500 });
  }
}
