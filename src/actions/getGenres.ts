import GenreModel from "@/models/Genre.model";
import dbConnect from "@/utils/db-connect";
import getCurrentUser from "./getCurrentUser";

interface IGenre {
  name?: string;
}

export default async function getGenres(params?: IGenre) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized User", { status: 401 });
    }

    await dbConnect();

    let query: any = {};

    if (params?.name) {
      query.name = {
        $regex: params.name,
        $options: "i",
      };
    }

    const genres = await GenreModel.find({ ...query }).sort({
      createdAt: "descending",
    });

    if (!genres) return [];

    return JSON.parse(JSON.stringify(genres));
  } catch (err: any) {
    throw new Error(err);
  }
}
