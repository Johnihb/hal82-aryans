'use server'

type TwilioCredentialsResult =
  | { success: true; accountSid: string; authToken: string; twilioPhoneNumber: string }
  | { success: false; message: string };

export const validateTwilioCredentials = async (): Promise<TwilioCredentialsResult> => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    return { success: false, message: "Twilio credentials not configured" };
  }

  return { success: true, accountSid, authToken, twilioPhoneNumber };
};