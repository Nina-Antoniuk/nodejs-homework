import Jimp from "jimp";

class FileStorage {
  constructor(Storage, file, user) {
    this.storage = new Storage(file, user);
    this.pathFile = file.path;
  }

  async transformAvatar(pathFile) {
    const avatar = await Jimp.read(pathFile);
    await avatar
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
  }

  async updateAvatar() {
    await this.transformAvatar(this.pathFile);
    const avatarUrl = await this.storage.save();
    return avatarUrl;
  }
}

export default FileStorage;
