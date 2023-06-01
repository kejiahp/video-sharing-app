import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User.model";
import dbConnect from "@/utils/db-connect";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    await dbConnect();
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (err: any) {
    return null;
  }
}
