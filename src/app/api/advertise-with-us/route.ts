import {
  AdvertisewithUsFormType,
  advertiswithusformvalidator,
} from "@/schema/ads.schema";
import { mailTransporter } from "@/utils/mailer-setup";

export async function POST(req: Request) {
  try {
    const body: AdvertisewithUsFormType = await req.json();

    const cleanData = advertiswithusformvalidator.safeParse(body);

    if (!cleanData.success) {
      return new Response("Bad Request", { status: 400 });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
    };

    const EMAILHTML = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset Mail</title>
          </head>
          <body>
              <h3>Hello Admin, ${body.name} is interested in advertising with us</h3>
              <p>Leads details below</p>
              <div style="margin: 20px 0px;font-size:20px;">
                <p>
                    <span style="font-weight: 700; margin-left:10px;">Name:</span> ${body.name} 
                </p>
                
                <p>
                    <span style="font-weight: 700; margin-left:10px;">Company:</span> ${body.company} 
                </p>

                <p>
                    <span style="font-weight: 700; margin-left:10px;">Email:</span> ${body.email}
                </p>


                <p>
                    <span style="font-weight: 700; margin-left:10px;">Message:</span> ${body.message} 
                </p>

                <p>
                    <span style="font-weight: 700; margin-left:10px;">Number:</span> ${body.number} 
                </p>
              </div>
          </body>
          </html>
          `;

    await mailTransporter.sendMail({
      ...mailOptions,
      subject: `Advertise with us`,
      text: `${body.email} is interested in advertising with Us`,
      html: EMAILHTML,
    });

    return new Response("email sent", { status: 200 });
  } catch (error: any) {
    console.log("ERROR ADVERT WITH US");
    return new Response("Internal Error", { status: 500 });
  }
}
