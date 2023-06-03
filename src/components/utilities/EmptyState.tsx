"use client";
import React from "react";
import Container from "./container/Container";
import Button from "./button/Button";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  header: string;
  subHeader: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ header, subHeader }) => {
  const router = useRouter();
  return (
    <Container>
      <div className="h-[50vh] flex flex-col justify-center items-center gap-3">
        <h1 className="text-2xl text-gray-500">{header}</h1>
        <h5 className="text-lg text-gray-500">{subHeader}</h5>
        <Button isSmall onClick={() => router.refresh()}>
          Refresh Page
        </Button>
      </div>
    </Container>
  );
};

export default EmptyState;
