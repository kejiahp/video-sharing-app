import React from "react";

interface MovieCategoryProps {
  header: string;
  subheader?: string;
  movies: any;
}

const MovieCategory: React.FC<MovieCategoryProps> = ({
  header,
  subheader,
  movies,
}) => {
  return (
    <section className="">
      <div className="">
        <h1>{header}</h1>
      </div>
      <div></div>
    </section>
  );
};

export default MovieCategory;
