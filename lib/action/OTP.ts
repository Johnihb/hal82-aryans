'use server'
import prisma from "../prisma";
import { randomInt } from "node:crypto";
import { Twilio } from "twilio";
import { updateUser } from "./updateUser";

export const sendOTPToUser = async (to:string,userId:string )=>{

    // Environment variables
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

      if (!accountSid || !authToken || !twilioPhoneNumber) {
        return (
          { message: "Twilio credentials not configured" }
        );
      }


      // Validate phone number format
    const validPhoneNumberRegex = /^\+\d{1,3}\d{9,14}$/;
    const phoneNumber = to.startsWith('+') ? to : `+${to}`;
    const validatePhoneNumber = validPhoneNumberRegex.test(phoneNumber);

    if (!validatePhoneNumber) {
      return(
        { message: "Invalid phone number format. Use format: +1234567890" }
      );
    }


    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        phoneNumber: true,
      },
    })


    if (user?.phoneNumber === phoneNumber) {
      return (
        { message: "Phone number already exists." }
      );
    }

    // Generate 6-digit verification code
    const randomNumber = randomInt(100000, 1000000); // Ensures 6 digits

    // Update user with verification code
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        verificationCode: randomNumber,
        phoneNumber: phoneNumber,
        verificationCodesExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
        isVerified: false,
      },
      select: {
        id: true,
        email: true,
        verificationCode: true,
        verificationCodesExpiresAt: true
      },
    });

    // Initialize Twilio client
    const twilioClient = new Twilio(accountSid, authToken);

    
    // Send SMS
    try {
      const message = await twilioClient.messages.create({
        body: `Your verification code is: ${randomNumber}`,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });

      return ({
          success: true,
          message: "SMS sent successfully!",
          sid: message.sid,
          // Don't send full user object for security
          userId: updatedUser.id,
        })
    } catch (twilioError: any) {
      console.error("Twilio error:", twilioError);
      
      // Rollback: Remove verification code if SMS fails
      await prisma.user.update({
        where: { id: userId },
        data: { verificationCode: null },
      });

      return(
        {
          message: "Failed to send SMS",
          error: twilioError || "Unknown Twilio error",
        }
      );
    }
}

// !PENDING STATE IN DB