import getCurrentUser from "@/actions/getCurrentUser";
import UserModel from "@/models/User.model";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";

export async function GET(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    const isAdmin = ["super-admin", "admin"].includes(currentUser?.type);
    if (!currentUser || !isAdmin) {
      return new Response("Unauthorized User", { status: 401 });
    }
    await dbConnect();

    const newUrl = new URL(req.url);
    const searchParams = newUrl.searchParams;

    const page = Number(searchParams.get("p")) || 0;
    const usersPerPage = 12;
    const skip = page * usersPerPage;

    const count = await UserModel.estimatedDocumentCount();
    const pageCount = Math.ceil(count / usersPerPage);

    const users = await UserModel.find({ is_verified: true })
      .skip(skip)
      .limit(usersPerPage);

    if (!users) {
      return new Response("Can't find users", { status: 404 });
    }

    return new Response(JSON.stringify({ count, pageCount, users }), {
      status: 200,
    });
  } catch (err: any) {
    console.log("ERROR GETTING USERS");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "super-admin") {
      return new Response("Unauthorized User", { status: 401 });
    }
    await dbConnect();

    const body = await req.json();

    if (!body?.email || !body?.id) {
      return new Response("bad request", { status: 400 });
    }

    //make the user an admin
    const user = await UserModel.findById(body?.id);

    if (user?.type === "admin") {
      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $set: { type: "regular" } },
        { new: true }
      );

      if (!updatedUser) {
        return new Response("failed to update user", { status: 400 });
      }

      return new Response(JSON.stringify(updatedUser), { status: 200 });
    } else if (user?.type === "regular") {
      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $set: { type: "admin" } },
        { new: true }
      );

      if (!updatedUser) {
        return new Response("failed to update user", { status: 400 });
      }

      return new Response(JSON.stringify(updatedUser), { status: 200 });
    }
  } catch (err: any) {
    console.log("ERROR GETTING USERS");
    return new Response("Internal Error", { status: 500 });
  }
}
