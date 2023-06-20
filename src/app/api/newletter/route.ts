import getCurrentUser from "@/actions/getCurrentUser";
import NewsLetterModel from "@/models/NewsLetter.model";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";

export async function GET(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "admin") {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const newsletters = await NewsLetterModel.find({});

    if (!newsletters) {
      return new Response("failed to get newsletters", { status: 400 });
    }

    return new Response(JSON.stringify(newsletters), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GET NEWSLETTER");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    if (!body?.email) {
      return new Response("bad request", { status: 400 });
    }

    const newsletterExists = await NewsLetterModel.findOne({
      email: body.email,
    });

    if (newsletterExists) {
      return new Response("you have already subscribed to our newsletter", {
        status: 400,
      });
    }

    const newsletter = await NewsLetterModel.create({ email: body.email });

    if (!newsletter) {
      return new Response("failed to create newsletter", { status: 400 });
    }

    return new Response(JSON.stringify(newsletter), { status: 201 });
  } catch (err: any) {
    console.log("ERROR GET NEWSLETTER");
    return new Response("Internal Error", { status: 500 });
  }
}
