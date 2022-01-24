import { HttpCode } from "../../lib/consts";
import AuthService from "../../service/auth";
import { EmailService, SenderSendGrid } from "../../service/email";

const authService = new AuthService();

class AuthControllers {
  async registration(req, res, next) {
    try {
      const { email } = req.body;
      const isUserExist = await authService.isUserExist(email);
      if (isUserExist) {
        return res.status(HttpCode.CONFLICT).json({
          Status: `${HttpCode.CONFLICT} Conflict`,
          "Content-Type": "application/json",
          ResponseBody: {
            message: "Email in use",
          },
        });
      }

      const userData = await authService.createUser(req.body);
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new SenderSendGrid()
      );

      const isSend = await emailService.sendVerifyEmail(
        email,
        userData.name,
        userData.verificationToken
      );

      res.status(HttpCode.CREATED).json({
        Status: ` ${HttpCode.CREATED} Created`,
        "Content-Type": "application/json",
        ResponseBody: {
          user: {
            email,
            subscription: "started",
            status: isSend,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await authService.getUser(email, password);
    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        Status: `${HttpCode.UNAUTHORIZED} Unauthorized`,
        ResponseBody: {
          message: "Email or password is wrong",
        },
      });
    }
    const token = await authService.getToken(user);
    await authService.setToken(user.id, token);
    res.status(HttpCode.OK).json({
      Status: `${HttpCode.OK} OK`,
      "Content-Type": "application/json",
      ResponseBody: {
        token,
        user: {
          email,
          subscription: "starter",
        },
      },
    });
  }

  async logout(req, res, next) {
    await authService.setToken(req.user.id, null);
    return res.status(HttpCode.NO_CONTENT).json();
  }

  async current(req, res, next) {
    const user = await authService.getUserByToken(req.user.token);
    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        Status: `${HttpCode.UNAUTHORIZED} Unauthorized`,
        "Content-Type": "application/json",
        ResponseBody: {
          message: "Not authorized",
        },
      });
    }
    return res.status(HttpCode.OK).json({
      Status: `${HttpCode.OK} OK`,
      "Content-Type": "application/json",
      ResponseBody: {
        email: req.user.email,
        subscription: req.user.subscription,
      },
    });
  }
}

export default AuthControllers;
