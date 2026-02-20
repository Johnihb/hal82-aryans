import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { validateTwilioCredentials } from "@/lib/twilio";
import { randomInt } from "crypto";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Twilio } from "twilio";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { to, name } = data;

    if (!to || !name) {
      return NextResponse.json(
        {
          message: "Please provide all the credentials details.",
        },
        {
          status: 403,
        },
      );
    }

    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const validPhoneNumberRegex = /^\+\d{1,3}\d{9,14}$/;
    const phoneNumber = to.startsWith("+") ? to : `+${to}`;
    const validatePhoneNumber = validPhoneNumberRegex.test(phoneNumber);
    if (!validatePhoneNumber) {
      return NextResponse.json(
        { message: "Invalid phone number format. Use format: +1234567890" },
        { status: 400 },
      );
    }

    // checks users closeone does exceeds the total number of 5
    let user;
    try {
      user = await prisma.user.findFirst({
        where: { id: session.user.id },
        include: {
          closeOnePhoneNumbers: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 },
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Internal server error while fetching user" },
        { status: 500 },
      );
    }

    const userPhone = user?.phoneNumber;

    const userCloseOneCount = user?.closeOnePhoneNumbers.length;
    if (userCloseOneCount >= 5) {
      return NextResponse.json(
        { message: "You have reached the maximum number of phone numbers." },
        { status: 400 },
      );
    }

    const isAlreadyVerifiedCloseOne = user?.closeOnePhoneNumbers.find(
      (closeOne) => closeOne.phoneNumber === phoneNumber,
    );
    if (isAlreadyVerifiedCloseOne?.isVerified) {
      return NextResponse.json(
        { message: "Phone number already verified" },
        { status: 400 },
      );
    }

    const randomNumber = randomInt(100000, 1000000);


     const result = await validateTwilioCredentials();

      if (!result.success) {
        return (
          { message: result.message }
        );
      }
      
      const {accountSid, authToken, twilioPhoneNumber} = result;


    try {
      /* //! for parallel processing which can be useful in future
     const [closeOneResult] = await Promise.allSettled([
       prisma.closeOne.upsert({
         where: {
           userId_phoneNumber: {
             userId: session.user.id,
             phoneNumber,
           },
         },
         update: {
           verificationCode: randomNumber,
           isVerified: false,
         },
         create: {
           phoneNumber,
           isVerified: false,
           verificationCode: randomNumber,
           userId: session.user.id,
           name: name,
         },
       }),
     ]);

     //! use while using promise.allSetteled Check if the CloseOne upsert was successful
     if (closeOneResult.status === "rejected") {
       console.error("Failed to upsert CloseOne:", closeOneResult.reason);
       return NextResponse.json(
         {
           message: "Failed to save verification data",
           error: closeOneResult.reason.message,
         },
         { status: 500 },
       );
     }
     
     */

      await prisma.closeOne.upsert({
        where: {
          userId_phoneNumber: {
            userId: session.user.id,
            phoneNumber,
          },
        },
        update: {
          verificationCode: randomNumber,
          isVerified: false,
        },
        create: {
          phoneNumber,
          isVerified: false,
          verificationCode: randomNumber,
          userId: session.user.id,
          name: name,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to save verification data" },
        { status: 500 },
      );
    }

    try {
      // Send SMS(Twilio SetUp)

      const twilioClient = new Twilio(accountSid, authToken);
    
      // !comment this line if u want to see working
      const message = await twilioClient.messages.create({
        body: `Your verification code is: ${randomNumber}. If you did not request this code, please ignore this message${userPhone ? ` or you can report this user ${userPhone}` : ""}.`,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });

      return NextResponse.json(
        {
          success: true,
          message: "SMS sent successfully!",
          sid: message.sid,
          // Don't send full user object for security
        },
        { status: 200 },
      );
    } catch (twilioError: any) {
      console.error("Twilio error:", twilioError);

      try {
        // Rollback: Remove verification code from CloseOne if SMS fails
        await prisma.closeOne.update({
          where: {
            userId_phoneNumber: {
              userId: session.user.id,
              phoneNumber,
            },
          },
          data: { verificationCode: null },
        });
      } catch (error) {
        console.error("Failed to rollback verification code:", error);
      }

      return NextResponse.json(
        { message: "Failed to send SMS", error: twilioError.message },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
