import Footer from "@/components/footer/Footer";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import Container from "@/components/utilities/container/Container";
import { advertguidelineAndTerms } from "@/constants/adverst.constants";
import { Metadata } from "next";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL as string;

export const metadata: Metadata = {
  title: " Advertising Guidelines and Terms & Conditions",
  description:
    "By advertising on Tyler Movies Empire, you agree to abide by these Advertising Guidelines and Terms & Conditions. For inquiries or to discuss your advertising needs, please contact our advertising team",
  alternates: {
    canonical: `${BASE_URL}/advertisement-terms-and-conditions`,
  },
};

function Page() {
  return (
    <>
      <div className="my-16">
        <Container>
          <h1 className="text-4xl text-blue-500 my-6">
            Advertising Guidelines and Terms & Conditions.
          </h1>

          {advertguidelineAndTerms.map((item, index) => (
            <div className="my-7" key={index}>
              <h3 className="font-semibold my-4">{item.header}</h3>

              {item.items.map((itemChild, indexChild) => (
                <p className="text-sm" key={indexChild}>
                  {itemChild}
                </p>
              ))}
            </div>
          ))}

          <p className="text-sm">
            By advertising on Tyler Movies Empire, you agree to abide by these
            Advertising Guidelines and Terms & Conditions. For inquiries or to
            discuss your advertising needs, please contact our advertising team
            at{" "}
            <a
              className="text-blue-500 underline"
              href="mailto:tylermoviesempire@gmail.com"
            >
              tylermoviesempire@gmail.com
            </a>{" "}
            or call{" "}
            <a className="text-blue-500 underline" href="tel:+2347013255852">
              +2347013255852
            </a>
          </p>
        </Container>
      </div>
      <NewsLetterSubscription />
      <Footer />
    </>
  );
}

export default Page;
