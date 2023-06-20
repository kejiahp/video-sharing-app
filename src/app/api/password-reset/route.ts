import UserModel from "@/models/User.model";
import dbConnect from "@/utils/db-connect";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    if (!body?.password || !body?.resetcode) {
      return new Response("bad request", { status: 400 });
    }

    const isUser = await UserModel.findOne({
      passwordResetCode: body.resetcode,
    });

    if (!isUser) {
      return new Response("failed to reset password", { status: 400 });
    }

    const hashPassword = await bcrypt.hash(body.password, 10);

    const updatedUser = await UserModel.findByIdAndUpdate(
      isUser._id,
      { $set: { password: hashPassword, passwordResetCode: "" } },
      { new: true }
    );

    if (!updatedUser) {
      return new Response("failed to reset password", { status: 400 });
    }

    return new Response("Successfully reset password", { status: 200 });
  } catch (err: any) {
    console.log("ERROR PASSWORD RESET");
    return new Response("Internal Error", { status: 500 });
  }
}
