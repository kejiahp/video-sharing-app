import getCurrentUser from "@/actions/getCurrentUser";
import AdsModel from "@/models/Ads.model";
import { apiupdateadvertvalidator } from "@/schema/ads.schema";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "admin") {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const body = await req.json();

    const cleanData = apiupdateadvertvalidator.safeParse(body);

    if (!cleanData.success) {
      return new Response("bad request", { status: 400 });
    }

    const updatedAdvert = await AdsModel.findByIdAndUpdate(
      params.id,
      { $set: cleanData.data },
      { new: true }
    );

    if (!updatedAdvert) {
      return new Response("advert not updated", { status: 400 });
    }

    return new Response(JSON.stringify(updatedAdvert), { status: 200 });
  } catch (err: any) {
    console.log("ERROR UPDATE ADS");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "admin") {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const advert = await AdsModel.findById(params?.id);

    if (!advert) {
      return new Response("advert not found", { status: 404 });
    }

    const deletedAdvert = await AdsModel.deleteOne({ _id: params?.id });

    if (!deletedAdvert) {
      return new Response("advert not deleted", { status: 400 });
    }

    return new Response("advert deleted", { status: 200 });
  } catch (err: any) {
    console.log("ERROR DELETE ADS");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    if (!params?.id) {
      return new Response("Invalid id", { status: 400 });
    }

    const advert = await AdsModel.findById(params.id);

    if (!advert) {
      return new Response("advert not found", { status: 404 });
    }

    return new Response(JSON.stringify(advert), { status: 200 });
  } catch (err: any) {
    console.log(err);
    console.log("ERROR GET SINGLE ADVERT");
    return new Response("Internal Server Error", { status: 500 });
  }
}
