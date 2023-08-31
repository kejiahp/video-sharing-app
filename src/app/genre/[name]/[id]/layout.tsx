import { ResolvingMetadata } from "next";
import React, { PropsWithChildren } from "react";

type Props = {
  params: { name: string | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const genreName = params.name;

  return {
    title: `${genreName} - Tyler Moview Empire`,
    description: `All movies under the "${genreName}" genre are here for your choosing.`,
  };
}

function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export default Layout;
