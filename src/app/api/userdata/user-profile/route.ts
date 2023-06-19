import getCurrentUser from "@/actions/getCurrentUser";
import UserModel from "@/models/User.model";
import { registerschema } from "@/schema/authentication.schema";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "regular") {
      return new Response("Unauthorized User", { status: 401 });
    }
    return new Response(JSON.stringify(currentUser), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GETTING USERS");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "regular") {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const body = await req.json();

    const cleanData = registerschema.safeParse(body);

    if (!cleanData.success) {
      return new Response("Bad Request", { status: 400 });
    }

    const { password, ...payload } = cleanData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBody = {
      password: hashedPassword,
      username: payload.username,
      email: payload.email,
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      currentUser._id,
      { $set: newBody },
      { new: true }
    );

    if (!updatedUser) {
      return new Response("failed to update user", { status: 400 });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GETTING USERS");
    return new Response("Internal Error", { status: 500 });
  }
}
