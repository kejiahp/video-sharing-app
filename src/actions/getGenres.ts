import GenreModel from "@/models/Genre.model";
import dbConnect from "@/utils/db-connect";

interface IGenre {
  name?: string;
}

export default async function getGenres(params?: IGenre) {
  try {
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

    return JSON.parse(JSON.stringify(genres));
  } catch (err: any) {
    throw new Error(err);
  }
}
