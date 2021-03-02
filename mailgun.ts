import * as Mailgun from "mailgun-js";

const isLocal = process.env.REGION === "us-east-1-fake";

const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  testMode: isLocal,
});

export const sendMessage = async (
  message: Mailgun.messages.SendData
): Promise<Mailgun.messages.SendResponse | Mailgun.Error> => {
  try {
    const res = await mailgun.messages().send(message);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};