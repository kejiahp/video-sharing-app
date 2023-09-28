import SeriesModel from "@/models/Series.model";
import dbConnect from "@/utils/db-connect";

// export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const newUrl = new URL(req.url);
    const searchParams = newUrl.searchParams;

    const page = Number(newUrl.searchParams.get("p")) || 0;
    const seriesPerPage = 12;
    const skip = page * seriesPerPage;

    const count = await SeriesModel.estimatedDocumentCount();
    const pageCount = Math.ceil(count / seriesPerPage);

    let query: any = {};

    if (searchParams.get("q")) {
      query.movieName = {
        $regex: searchParams.get("q"),
        $options: "i",
      };
    }

    const series = await SeriesModel.find({ ...query })
      .sort({
        createdAt: "descending",
      })
      .skip(skip)
      .limit(seriesPerPage);

    if (!series) return new Response(JSON.stringify([]), { status: 200 });

    return new Response(JSON.stringify({ count, pageCount, series }), {
      status: 200,
    });
  } catch (err: any) {
    console.log("ERROR GETTING ALL SERIES");
    return new Response("Internal Error", { status: 500 });
  }
}
