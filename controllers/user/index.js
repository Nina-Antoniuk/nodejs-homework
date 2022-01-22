import { HttpCode } from "../../lib/consts";
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

export default uploadAvatar;
