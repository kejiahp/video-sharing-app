"use client";

import AdvertBenefitCard from "@/components/adverts/AdvertBenefitCard";
import AdvertForm from "@/components/adverts/AdvertForm";
import AdvertiseWithUsHero from "@/components/adverts/AdvertiseWithUsHero";
import AdvertisemementContainer from "@/components/adverts/AdvertisemementContainer";
import Footer from "@/components/footer/Footer";
import Container from "@/components/utilities/container/Container";
import { advertbenefits } from "@/constants/adverst.constants";

function page() {
  return (
    <>
      <div className="mt-[32px]"></div>
      <AdvertiseWithUsHero />
      <Container>
        <AdvertisemementContainer header="Audience Profile" isCentered>
          <p className="text-center">
            Our audience consists of movie lovers spanning various age groups
            and geographical locations. They are tech-savvy individuals who
            enjoy exploring the world of cinema, from classic films to the
            latest blockbusters. Our visitors primarily hail from Africa, North
            America, Europe, and Asia, with a strong presence among the 18-35
            age bracket.
          </p>
        </AdvertisemementContainer>

        <AdvertisemementContainer header="Benefits of Advertising with us">
          <div className="flex gap-5 justify-center flex-wrap">
            {advertbenefits?.map((item, index) => (
              <AdvertBenefitCard
                key={index}
                icon={item.icon}
                text={item.text}
              />
            ))}
          </div>
        </AdvertisemementContainer>

        <AdvertisemementContainer header="Advertising Options">
          <p>
            <span className="text-purple-700 font-medium text-xl">
              Banner Ads:
            </span>{" "}
            Display your brand prominently with banner ads on our homepage,
            category pages, and individual movie pages.
          </p>

          <p>
            <span className="text-purple-700 font-medium text-xl">
              Sponsored Content:
            </span>{" "}
            Publish articles or reviews that align with your brand&apos;s
            message and reach our readers through our content.
          </p>

          <p>
            <span className="text-purple-700 font-medium text-xl">
              Newsletter Placements:
            </span>{" "}
            Feature your brand in our weekly newsletter that goes out to
            thousands of subscribers.
          </p>

          <p>
            <span className="text-purple-700 font-medium text-xl">
              Video Ads:
            </span>{" "}
            Engage our audience through captivating video ads that can be placed
            within our video content.
          </p>
        </AdvertisemementContainer>

        <AdvertisemementContainer header="Advertising Rates" isCentered>
          <p>
            Our advertising rates vary depending on the type of advertisement
            and placement. Please contact our advertising team at
            @TylerMoviesEmpire@gmail for a personalized quote.
          </p>
        </AdvertisemementContainer>

        <AdvertisemementContainer header="Testimonials and Case Studies">
          <div className="flex gap-5 justify-center flex-wrap">
            <AdvertBenefitCard
              image={"/no-user.png"}
              text={
                "Advertising on Tyler Movies Empire was a game-changer for our movie streaming service. Our click-through rates soared, and we saw a significant boost in subscriptions."
              }
              subText={"-Micheal O. U Marketing Director, CineHub."}
            />
          </div>
        </AdvertisemementContainer>

        <AdvertisemementContainer
          header="Customization and Collaboration"
          isCentered
        >
          <p>
            We understand that each brand is unique. Let&apos;s work together to
            create a tailored advertising package that aligns with your
            marketing goals.
          </p>
        </AdvertisemementContainer>

        <AdvertisemementContainer header="Media Kit" isCentered>
          <p>
            Download our media kit for detailed information, website
            screenshots, audience statistics, and more:{" "}
            <a className="text-purple-500 underline" href="#">
              click here
            </a>
          </p>
        </AdvertisemementContainer>

        <AdvertisemementContainer header="Terms and Conditions" isCentered>
          <p>
            Please review our{" "}
            <a
              className="text-purple-500 underline"
              href="/advertisement-terms-and-conditions"
            >
              Advertising Guidelines and Terms & Conditions
            </a>{" "}
            before proceeding with your advertising campaign.
          </p>
        </AdvertisemementContainer>

        <AdvertForm />
      </Container>

      <Footer />
    </>
  );
}

export default page;
