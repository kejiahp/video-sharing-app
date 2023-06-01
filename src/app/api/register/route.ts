import {
  RegisterSchemaType,
  registerschema,
} from "@/schema/authentication.schema";
import dbConnect from "@/utils/db-connect";
import bcrypt from "bcrypt";
import User from "../../../models/User.model";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body: RegisterSchemaType = await req.json();
    const cleanData = registerschema.safeParse(body);

    if (!cleanData.success) {
      return new Response("bad request", { status: 400 });
    }

    const existingUser = await User.findOne({
      $or: [
        { email: cleanData.data.email },
        { username: cleanData.data.username },
      ],
    });

    if (existingUser) {
      return new Response("User with this email or username already exists", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(cleanData.data.password, 10);

    const user = await User.create({
      email: cleanData.data.email,
      username: cleanData.data.username,
      password: hashedPassword,
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (err: any) {
    console.log("registration failed");
    return new Response("Internal Error", { status: 500 });
  }
}
