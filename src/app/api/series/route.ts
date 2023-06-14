import SeriesModel from "@/models/Series.model";
import dbConnect from "@/utils/db-connect";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const newUrl = new URL(req.url);
    const searchParams = newUrl.searchParams;
    let query: any = {};

    if (searchParams.get("q")) {
      query.movieName = {
        $regex: searchParams.get("q"),
        $options: "i",
      };
    }

    const series = await SeriesModel.find({ ...query });

    if (!series) return new Response(JSON.stringify([]), { status: 200 });

    return new Response(JSON.stringify(series), { status: 200 });
  } catch (err: any) {
    console.log("ERROR GETTING ALL SERIES");
    return new Response("Internal Error", { status: 500 });
  }
}
