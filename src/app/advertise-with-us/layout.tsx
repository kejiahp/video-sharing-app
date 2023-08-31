import React, { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise With Us",
  description:
    "Our audience consists of movie lovers spanning various age groups and geographical locations. They are tech-savvy individuals who enjoy exploring the world of cinema, from classic films to the latest blockbusters. Our visitors primarily hail from Africa, North America, Europe, and Asia, with a strong presence among the 18-35 age bracket.",
  alternates: {
    canonical: `/advertise-with-us`,
  },
};

function layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export default layout;
