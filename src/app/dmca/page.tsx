import Container from "@/components/utilities/container/Container";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <>
      <div className="my-16">
        <Container>
          <h1 className="text-4xl text-blue-500 my-6">
            Digital Millennium Copyright Act ("DMCA")
          </h1>
          <p className="my-5">
            Tyler Movies Empire is in compliance with the Digital Millennium
            Copyright Act (“DMCA”). It is our policy to respond to any
            infringement notices and take appropriate actions under the Digital
            Millennium Copyright Act (“DMCA”) and other applicable intellectual
            property laws.
          </p>

          <p className="my-5">
            If your copyrighted material has been uploaded on Tyler Movies
            Empire or if hyperlinks to your copyrighted material are returned
            through our search engine and you want this material removed, you
            must provide a written communication that details the information
            listed in the following section.
          </p>

          <p className="my-5">
            Please be aware that you will be liable for damages (including costs
            and attorneys’ fees) if you misrepresent information listed on our
            site that is infringing on your copyrights. We suggest that you
            first contact an attorney for legal assistance on this matter.
          </p>

          <p className="my-5">
            The following elements must be included in your copyright
            infringement claim:
          </p>

          <p className="my-5">
            Provide evidence of the authorized person to act on behalf of the
            owner of an exclusive right that is allegedly infringed.
          </p>

          <p className="my-5">
            Provide sufficient contact information so that we may contact you.
          </p>

          <p className="my-5">You must also include a valid email address.</p>

          <p className="my-5">
            You must identify in sufficient detail the copyrighted work claimed
            to have been infringed and including at least one search term under
            which the material appears in Tyler Movies Empire search results.
          </p>

          <p className="my-5">
            A statement that the complaining party has a good faith belief that
            use of the material in the manner complained of is not authorized by
            the copyright owner, its agent, or the law.
          </p>

          <p className="my-5">
            A statement that the information in the notification is accurate,
            and under penalty of perjury, that the complaining party is
            authorized to act on behalf of the owner of an exclusive right that
            is allegedly infringed.
          </p>

          <p className="my-5">
            Must be signed by the authorized person to act on behalf of the
            owner of an exclusive right that is allegedly being infringed.
          </p>

          <p className="my-5">
            Send the infringement notice to us by filling out our DMCA
            Violations Form ( This will be a hyperlink leading to a form –
            Infringed Content Proof, Infringed Content Name, Email, Message )
          </p>

          <p className="my-5 font-semibold text-blue-500">
            Please allow us 48 hours to get back to you.
          </p>
        </Container>
      </div>
    </>
  );
}

export default Page;
