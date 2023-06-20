"use client";
import { IComment } from "@/models/Comments.model";
import React from "react";
import Container from "../utilities/container/Container";
import CommentsItems from "./CommentsItems";
import { useSession } from "next-auth/react";
import EmptyState from "../utilities/EmptyState";
import CreateComment from "./CreateComment";

type Props = {
  movieId: string;
  isLoading: boolean;
  error: any;
  comments: (Omit<IComment, "userId"> & {
    _id: string;
    userId: { username: string; _id: string };
  })[];
};

const Comments = ({ isLoading, movieId, error, comments }: Props) => {
  const session = useSession();
  if (isLoading) {
    return (
      <section className="my-7">
        <Container>
          <h1 className="text-3xl text-blue-500 my-3">Comments</h1>
          <EmptyState
            header="Comments still loading"
            subHeader="Please be patient 😊"
          />
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-7">
        <Container>
          <h1 className="text-3xl text-blue-500 my-3">Comments</h1>
          <EmptyState
            header="No comments here"
            subHeader="There seems to be no comments here 😟"
          />
        </Container>
      </section>
    );
  }

  if (!comments || comments.length <= 0) {
    return (
      <section className="my-7">
        <Container>
          <h1 className="text-3xl text-blue-500 my-3">Comments</h1>
          <CreateComment movieId={movieId} session={session} />
          <EmptyState
            header="No comments here"
            subHeader="There seems to be no comments here 😟"
          />
        </Container>
      </section>
    );
  }

  return (
    <section className="my-7">
      <Container>
        <h1 className="text-3xl text-blue-500 my-3">Comments</h1>
        <CreateComment movieId={movieId} session={session} />
        <div className="">
          {comments.map((item, index) => (
            <CommentsItems
              key={index}
              userId={item.userId._id}
              commentId={item._id}
              username={item.userId.username}
              comment={item.comment}
              session={session}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Comments;
