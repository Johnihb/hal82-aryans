import { sendOTPToUser } from "@/lib/action/OTP";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    
    
    // Check authentication
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized user." },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    
    const data = await req.json();
    const { to } = data;

    if (!to) {
      return NextResponse.json(
        { message: "Invalid Receiver Credentials." },
        { status: 400 }
      );
    }

    const res = await sendOTPToUser(to, userId  );

    return NextResponse.json(res, { status: res.success ? 200 : 400 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error || "Unknown error",
      },
      { status: 500 }
    );
  }
}