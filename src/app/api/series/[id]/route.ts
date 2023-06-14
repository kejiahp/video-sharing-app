import getCurrentUser from "@/actions/getCurrentUser";
import SeriesModel from "@/models/Series.model";
import { updateseriesvalidator } from "@/schema/series.schema";
import { SafeUser } from "@/types/SafeUser";
import dbConnect from "@/utils/db-connect";

export async function PATCH(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const currentUser: SafeUser = await getCurrentUser();
    if (!currentUser || currentUser.type !== "admin") {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    const body = await req.json();

    const cleanData = updateseriesvalidator.safeParse(body);

    if (!cleanData.success) {
      return new Response("bad request", { status: 400 });
    }

    const series = await SeriesModel.findById(params?.id);

    if (!series) {
      return new Response("series not found", { status: 404 });
    }

    const updatedSeries = await SeriesModel.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!updatedSeries) {
      return new Response("failed to update series", { status: 400 });
    }

    return new Response(JSON.stringify(updatedSeries), { status: 200 });
  } catch (err: any) {
    console.log("ERROR UPDATING SERIES");
    return new Response("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const series = await SeriesModel.findById(params.id);

    if (!series) {
      return new Response("series not found", { status: 404 });
    }

    return new Response(JSON.stringify(series), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GETTING SINGLE SERIES");
    return new Response("Internal Error", { status: 500 });
  }
}
