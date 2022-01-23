import Mailgen from "mailgen";

export class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;
      case "test":
        this.link = "http://localhost:3000";
        break;
      case "production":
        this.link = "http://heroku/";
        break;
      default:
        this.link = "http://localhost:3000";
    }
  }

  createEmailTemplate(userName, verificationToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "hw06",
        link: this.link,
      },
    });

    const email = {
      body: {
        name: userName,
        intro: "Welcome to Mailgen! We're very excited to have you on board.",
        action: {
          instructions: "To get started with our API, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verificationToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, userName, verificationToken) {
    const emailBody = this.createEmailTemplate(userName, verificationToken);
    const message = {
      to: email,
      subject: "verify email",
      html: emailBody,
    };
    try {
      await this.sender.send(message);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}
