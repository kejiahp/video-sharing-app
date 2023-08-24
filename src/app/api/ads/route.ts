import getCurrentUser from "@/actions/getCurrentUser";
import AdsModel from "@/models/Ads.model";
import { apicreateadvertvalidator } from "@/schema/ads.schema";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    const isAdmin = ["super-admin", "admin"].includes(currentUser?.type);
    if (!currentUser || !isAdmin) {
      return new Response("Unauthorized User", { status: 401 });
    }

    const body = await req.json();

    const cleanData = apicreateadvertvalidator.safeParse(body);

    if (!cleanData.success) {
      return new Response("bad request", { status: 400 });
    }

    const noOfAdsWithSamePage = await AdsModel.count({
      page: cleanData.data.page,
    });

    if (noOfAdsWithSamePage >= 4) {
      return new Response(`only four adverts per page`, { status: 400 });
    }

    const advert = await AdsModel.create(cleanData.data);

    if (!advert) {
      return new Response("failed to create advert", { status: 400 });
    }

    return new Response(JSON.stringify(advert), { status: 200 });
  } catch (err: any) {
    console.log("ERROR CREATING ADS");
    console.log(err);
    return new Response("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const searchParams = new URL(req.url).searchParams;

    let query: any = {};

    if (searchParams.get("page")) {
      query.page = {
        $regex: searchParams.get("page"),
        $options: "i",
      };
    }

    const ads = await AdsModel.find({ ...query }).sort({
      createdAt: "descending",
    });

    if (!ads) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify(ads), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GETTING ALL ADS");
    return new Response("Internal Error", { status: 500 });
  }
}
