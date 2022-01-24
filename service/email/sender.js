import sendgrid from "@sendgrid/mail";

class SenderSendGrid {
  async send(msg) {
    sendgrid.setApiKey(process.env.SENDGRID_KEY);
    return await sendgrid.send({ ...msg, from: process.env.SENDER_SENDGRID });
  }
}

export { SenderSendGrid };
