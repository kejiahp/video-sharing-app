import getCurrentUser from "@/actions/getCurrentUser";
import HeroBgImageModel from "@/models/HeroBgImage.model";
import { SafeUser } from "@/types/SafeUser";

export async function GET(req: Request) {
  try {
    const heroImage = await HeroBgImageModel.find({});

    if (!heroImage) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify(heroImage), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GETTING HERO IMAGE");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "admin") {
      return new Response("Unauthorized User", { status: 404 });
    }
    const heroImage = await HeroBgImageModel.count();
    if (heroImage !== 0) {
      return new Response("Only one Hero Image can Exist at a time", {
        status: 400,
      });
    }

    const body = await req.json();

    if (!body?.image) {
      return new Response("bad request", { status: 400 });
    }

    const newHeroImage = await HeroBgImageModel.create({ image: body.image });

    if (!newHeroImage) {
      return new Response("failed to create Hero Background Image", {
        status: 400,
      });
    }

    return new Response(JSON.stringify(newHeroImage), { status: 200 });
  } catch (err: any) {
    console.log("ERROR CREATING HERO IMAGE");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "admin") {
      return new Response("Unauthorized User", { status: 404 });
    }

    const body = await req.json();

    if (!body?.id || !body?.image) {
      return new Response("bad request", { status: 400 });
    }

    const heroImage = await HeroBgImageModel.findByIdAndUpdate(
      body.id,
      { $set: { image: body.image } },
      { new: true }
    );

    if (!heroImage) {
      return new Response("hero image not found", { status: 404 });
    }

    return new Response(JSON.stringify(heroImage), { status: 200 });
  } catch (err: any) {
    console.log("ERROR UPDATING HERO IMAGE");
    return new Response("Internal Error", { status: 500 });
  }
}
