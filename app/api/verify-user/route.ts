
import { verifyCurrentUser } from '@/lib/action/verify-user';
import { auth } from '@/lib/auth';
import { success } from 'better-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
try {
    const {  code } = await req.json();
  
    if ( !code) {
      return NextResponse.json(
        { message: "Missing verification code" },
        { status: 400 }
      );
    }
  
      // Get current session
      const session = await auth.api.getSession({
        headers:  req.headers
      });
  
      if (!session) {
        return  NextResponse.json(
         { success: false, message: "Unauthorized. Please log in." },
         { status: 401 }
        );
      }
  
      const userId = session.user.id;
      const result = await verifyCurrentUser(userId, Number(code));
  
    return NextResponse.json(result, {
      status: result.success ? 200 : 400
    });
} catch (error) {
  console.error("Internal server error",error)
  return NextResponse.json({
    success:false,
    message:"Internal server error",
  },{
    status:500
  })
}
}