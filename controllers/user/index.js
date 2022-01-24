import { HttpCode } from "../../lib/consts";
import usersRepository from "../../repository/users";
import { EmailService, SenderSendGrid } from "../../service/email";
import { FileStorage, LocalStorage } from "../../service/file-storage";

const uploadAvatar = async (req, res, next) => {
  if (!req.user.token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      Status: `${HttpCode.UNAUTHORIZED} Unauthorized`,
      "Content-Type": "application/json",
      ResponseBody: {
        message: "Not authorized",
      },
    });
  }
  const uploadService = new FileStorage(LocalStorage, req.file, req.user);
  const avatarUrl = await uploadService.updateAvatar();
  res.status(HttpCode.OK).json({
    Status: `${HttpCode.OK} OK`,
    "Content-Type": "application/json",
    ResponseBody: {
      avatarURL: avatarUrl,
    },
  });
};

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.verificationToken;
  const userByToken = await usersRepository.findByVerifyToken(verifyToken);
  if (userByToken) {
    await usersRepository.updateVerify(userByToken.id, true);
    return res.status(HttpCode.OK).json({
      Status: `${HttpCode.OK} OK`,
      "Content-Type": "application/json",
      ResponseBody: {
        message: "Verification successful",
      },
    });
  }

  return res.status(HttpCode.UNAUTHORIZED).json({
    Status: `${HttpCode.NOT_FOUND} Not Found`,
    "Content-Type": "application/json",
    ResponseBody: {
      message: "Not Found",
    },
  });
};

const repeatEmailFromVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(HttpCode.OK).json({
      Status: `${HttpCode.BAD_REQUEST} bad request`,
      "Content-Type": "application/json",
      ResponseBody: {
        message: "missing required field email",
      },
    });
  }
  const user = await usersRepository.findByEmail(email);
  if (!user.verify) {
    const { email, name, verificationToken } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendGrid()
    );
    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verificationToken
    );
    if (isSend) {
      return res.status(HttpCode.OK).json({
        Status: `${HttpCode.OK} success`,
        "Content-Type": "application/json",
        ResponseBody: {
          message: "Verification email sent",
        },
      });
    }
  }
  return res.status(HttpCode.BAD_REQUEST).json({
    Status: `${HttpCode.BAD_REQUEST} bad request`,
    "Content-Type": "application/json",
    ResponseBody: {
      message: "Verification has already been passed",
    },
  });
};

export default { uploadAvatar, verifyUser, repeatEmailFromVerifyUser };
