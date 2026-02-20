import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { validateTwilioCredentials } from "@/lib/twilio";
import { Twilio } from "twilio";

type Session = typeof auth.$Infer.Session

export async function POST(request: NextRequest) {
  try {
    const session: Session | null = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userData = await request.json()
    console.log('user location data in the backend', userData)
       
    
    const userId = session.user.id

    const userDataInDb = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        closeOnePhoneNumbers: true
      }
    })
    
    // console.log('user data in the backend', userDataInDb)
    console.log('session.user.name' , session.user.name)


    const result = await validateTwilioCredentials();

      if (!result.success) {
        return (
          { message: result.message }
        );
      }
      
      const {accountSid, authToken, twilioPhoneNumber} = result;

      const twilioClient = new Twilio(accountSid, authToken);


      const [lat, lon] = userData.userLocation;

      const message = `Emergency Alert! ${session.user.name} needs urgent help. Their current location is at coordinates: Latitude ${lat}, Longitude ${lon}. Please check on them immediately. If this is a life-threatening emergency, contact local emergency services.`;
    const phoneNumbers = userDataInDb?.closeOnePhoneNumbers.map((closeOne) => closeOne.phoneNumber)

    if(!phoneNumbers) {
      return NextResponse.json({ message: "No phone numbers found" }, { status: 400 })
    }
    
      Promise.all(
        phoneNumbers.map(number => {
          return twilioClient.messages.create({
            to: number,
            from: twilioPhoneNumber,
            body: message
          });
        })
      )
    .then(messages => {
      console.log('Messages sent!');
    })
    .catch(err => console.error(err));



    return NextResponse.json({ message: "Hello World", userDataInDb, phoneNumbers });
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}