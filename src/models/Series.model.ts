import mongoose from "mongoose";

interface IEpisodes {
  episodeName: string;
  downloadLink: string;
}

export interface ISeasons {
  seasonName: string;
  episodes: IEpisodes[];
}

export interface ISeries {
  movieId: mongoose.Types.ObjectId;
  movieName: string;
  seasons: ISeasons[];
  createdAt: Date;
  updatedAt: Date;
}

type SeriesDocument = mongoose.Document & ISeries;

const EpisodesSchema = new mongoose.Schema<IEpisodes>({
  episodeName: {
    type: String,
    required: [true, "episodeName is required"],
  },
  downloadLink: {
    type: String,
    required: [true, "downloadLink is required"],
  },
});

const SeasonSchema = new mongoose.Schema<ISeasons>({
  seasonName: {
    type: String,
    required: [true, "seasonName is required"],
  },
  episodes: [EpisodesSchema],
});

const SeriesSchema = new mongoose.Schema<ISeries>(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: [true, "movieId is required"],
    },
    movieName: {
      type: String,
      required: [true, "name is required"],
    },
    seasons: [SeasonSchema],
  },
  { timestamps: true }
);

export default (mongoose.models.Series as mongoose.Model<SeriesDocument>) ||
  mongoose.model("Series", SeriesSchema);
