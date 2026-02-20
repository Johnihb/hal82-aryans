'use server'

import prisma from "../prisma"

interface VerifyUserResult {
  success: boolean;
  message: string;
}

export const verifyCurrentUser = async (
  userId:string,
  verificationCode: number
): Promise<VerifyUserResult> => {
  
  try {
  

    // Fetch user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        verificationCode: true,
        updatedAt: true,
        isVerified: true,
        verificationCodesExpiresAt:true
      }
    });

    if (!user) {
      return {
        success: false,
        message: "User not found"
      };
    }

    if (user.isVerified) {
      return {
        success: true,
        message: "Already verified"
      };
    }

    if (!user.verificationCode) {
      return {
        success: false,
        message: "No verification code found"
      };
    }




    if(!user.verificationCodesExpiresAt) return {
      success: false,
      message: "No verification code found"
    }


    // Check expiration (15 minutes)
    const codeAge = user.verificationCodesExpiresAt.getTime();
    if (codeAge < Date.now()) {
      await prisma.user.update({
        where: { id: userId },
        data: { verificationCode: null }
      });

      return {
        success: false,
        message: "Code expired. Request a new one."
      };
    }

    // Verify code
    if (user.verificationCode !== verificationCode) {
      return {
        success: false,
        message: "Invalid verification code"
      };
    }

    // Mark as verified
    await prisma.user.update({
      where: { id: userId },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationCodesExpiresAt:null
      }
    });

    return {
      success: true,
      message: "Verification successful!"
    };

  } catch (error: any) {
    console.error("Verification error:", error);
    return {
      success: false,
      message: "Verification failed"
    };
  }
};