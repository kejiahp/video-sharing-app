import UserModel from "@/models/User.model";
import dbConnect from "@/utils/db-connect";
import { mailTransporter } from "@/utils/mailer-setup";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    if (!body?.email) {
      return new Response("bad request", { status: 400 });
    }

    const isUser = await UserModel.findOne({ email: body.email });

    if (!isUser) {
      return new Response("failed to send email", { status: 400 });
    }

    const userResetCode = nanoid();

    const giveUserResetCode = await UserModel.findByIdAndUpdate(isUser._id, {
      $set: { passwordResetCode: userResetCode },
    });

    if (!giveUserResetCode) {
      return new Response("failed to send email", { status: 400 });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: body.email,
    };

    const passwordResetLink = `${req.headers.get(
      "x-forwarded-proto"
    )}://${req.headers.get(
      "x-forwarded-host"
    )}/password-reset?code=${userResetCode}`;

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
        <h3>Hello ${body.email} click the link below to reset your email</h3>
        <div style="margin: 20px 0px;font-size:20px;">
            <a href="${passwordResetLink}">Click Here</a>
        </div>
    </body>
    </html>
    `;

    await mailTransporter.sendMail({
      ...mailOptions,
      subject: `Password reset mail`,
      text: `heres the password reset mail you requested`,
      html: EMAILHTML,
    });

    return new Response("email sent", { status: 200 });
  } catch (err: any) {
    console.log("ERROR SEND RESET EMAIL");
    return new Response("Internal Error", { status: 500 });
  }
}
