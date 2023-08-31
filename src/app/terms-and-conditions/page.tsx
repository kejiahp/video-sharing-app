import Footer from "@/components/footer/Footer";
import NewsLetterSubscription from "@/components/newslettersubscription/NewsLetterSubscription";
import Container from "@/components/utilities/container/Container";
import { Metadata } from "next";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL as string;

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "These terms and conditions ('Terms') govern the use of our movie website ('Website') and the services provided through the Website. By accessing or using our Website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you should not use our Website.",
  alternates: {
    canonical: `${BASE_URL}/terms-and-conditions`,
  },
};

function page() {
  return (
    <>
      <div className="my-16">
        <Container>
          <h1 className="text-4xl text-blue-500 my-6">
            TERMS AND CONDITIONS FOR TYLER MOVIES EMPIRE WEBSITE.
          </h1>
          <p>
            These terms and conditions (&quot;Terms&quot;) govern the use of our
            movie website (&quot;Website&quot;) and the services provided
            through the Website. By accessing or using our Website, you agree to
            be bound by these Terms. If you do not agree with any part of these
            Terms, you should not use our Website.
          </p>

          <div className="my-7">
            <h3 className="font-semibold my-4">
              1. Ownership and Intellectual Property
            </h3>
            <p className="text-sm">
              1.1. All content, including but not limited to text, images,
              videos, audio, logos, trademarks, and software, displayed on the
              Website is the property of the website owner or its licensors and
              is protected by intellectual property laws.
            </p>
            <p className="text-sm">
              1.2. You may not reproduce, distribute, modify, transmit, or use
              any content from the Website without prior written permission from
              the website owner.
            </p>
          </div>

          <div className="my-7">
            <h3 className="font-semibold my-4">2. User Accounts</h3>
            <p className="text-sm">
              2.1. In order to access certain features or services on our
              Website you may be required to create a user account.
            </p>
            <p className="text-sm">
              2.2. You are responsible for maintaining the confidentiality of
              your account login credentials and for all activities that occur
              under your account.
            </p>
            <p className="text-sm">
              2.3. You must provide accurate and up-to-date information when
              creating your account and promptly update any changes.
            </p>
            <p className="text-sm">
              2.4. You must not use another person&apos;s account without their
              permission.
            </p>
          </div>
          <div className="my-7">
            <h3 className="font-semibold my-4">3. User Conduct</h3>
            <p className="text-sm">
              3.1. You agree to use the Website in compliance with all
              applicable laws and regulations.
            </p>
            <p className="text-sm">
              3.2. You must not engage in any conduct that is unlawful, harmful,
              abusive, defamatory, offensive, or violates the rights of others.
            </p>
            <p className="text-sm">
              3.3. You must not upload, post, or transmit any content that is
              infringing, misleading, or contains viruses or malicious code.
            </p>
            <p className="text-sm">
              3.4. You must not attempt to gain unauthorized access to any part
              of the Website or interfere with its functionality.
            </p>
          </div>
          <div className="my-7">
            <h3 className="font-semibold my-4">4. Content Submissions</h3>
            <p className="text-sm">
              4.1. By submitting any content to the Website, including but not
              limited to reviews, comments, or ratings, you grant the website
              owner a non-exclusive, worldwide, royalty-free license to use,
              reproduce, modify, adapt, publish, and distribute the content in
              any media.
            </p>
            <p className="text-sm">
              4.2. You are solely responsible for the content you submit and
              must ensure that it does not infringe upon the rights of any third
              party or violate any applicable laws.
            </p>
            <p className="text-sm">
              4.3. The website owner reserves the right to remove or modify any
              content submitted to the Website at its discretion.
            </p>
          </div>
          <div className="my-7">
            <h3 className="font-semibold my-4">5. Third-Party Links</h3>
            <p className="text-sm">
              5.1. The Website may contain links to third-party websites or
              resources that are not owned or controlled by the website owner.
            </p>
            <p className="text-sm">
              5.2. The website owner does not endorse or assume any
              responsibility for the content, privacy policies, or practices of
              any third-party websites.
            </p>
            <p className="text-sm">
              5.3. You acknowledge and agree that the website owner shall not be
              liable for any loss or damage caused by your use of any
              third-party websites or resources.
            </p>
          </div>

          <div className="my-7">
            <h3 className="font-semibold my-4">6. Disclaimer of Warranties</h3>
            <p className="text-sm">
              6.1. The Website and its content are provided on an &quot;as
              is&quot; and &quot;as available&quot; basis without any warranties
              of any kind, whether express or implied.
            </p>
            <p className="text-sm">
              6.2. The website owner does not warrant that the Website will be
              uninterrupted, error-free, or free from viruses or other harmful
              components.
            </p>
            <p className="text-sm">
              6.3. The website owner disclaims all warranties, including but not
              limited to the accuracy, reliability, completeness, or suitability
              of the content available on the Website.
            </p>
          </div>

          <div className="my-7">
            <h3 className="font-semibold my-4">7. Limitation of Liability</h3>
            <p className="text-sm">
              7.1. To the maximum extent permitted by law, the website owner
              shall not be liable for any direct, indirect, incidental,
              consequential, or special damages arising out of or in connection
              with the use of the Website.
            </p>
            <p className="text-sm">
              7.2. This includes, but is not limited to, damages for loss of
              profits, data, or other intangible losses, even if the website
              owner has been advised of the possibility of such damages.
            </p>
          </div>

          <div className="my-7">
            <h3 className="font-semibold my-4">8. Indemnification</h3>
            <p className="text-sm">
              8.1. You agree to indemnify and hold harmless the website owner,
              its affiliates, officers, directors, employees, and agents from
              any claims, liabilities, damages, losses, or expenses, including
              reasonable attorneys&apos; fees, arising out of your use of the
              Website or violation of these Terms.
            </p>
          </div>

          <div className="my-7">
            <h3 className="font-semibold my-4">9. Modification of Terms</h3>
            <p className="text-sm">
              9.1. The website owner reserves the right to modify or amend these
              Terms at any time without prior notice.
            </p>
            <p className="text-sm">
              9.2. Any changes to the Terms will be effective immediately upon
              posting on the Website.
            </p>
          </div>

          <div className="my-7">
            <h3 className="font-semibold my-4">
              10. Governing Law and Jurisdiction
            </h3>
            <p className="text-sm">
              10.1. These Terms shall be governed by and construed in accordance
              with the laws of the jurisdiction where the website owner is
              located.
            </p>
            <p className="text-sm">
              10.2. Any dispute arising out of or in connection with these Terms
              shall be subject to the exclusive jurisdiction of the courts in
              that jurisdiction.
            </p>
          </div>

          <p className="text-sm">
            By using our movie website, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions. If
            you do not agree with any part of these Terms, you should
            discontinue your use of the Website.
          </p>
        </Container>
      </div>
      <NewsLetterSubscription />
      <Footer />
    </>
  );
}

export default page;
