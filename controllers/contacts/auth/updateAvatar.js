/* const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../../models/user");
const avatarsDir = path.join(__dirname, "../../../", "public", "avatars");

const updateAvatars = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatars; */

const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../../models/user");
const avatarsDir = path.join(__dirname, "../../../", "public", "avatars");

const updateAvatars = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;

  await Jimp.read(`${tempUpload}`, async (err, fileName) => {
    if (err) throw err;
    fileName.resize(250, 250).write(`${tempUpload}`);
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
  });

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatars;

/* const Jimp = require("jimp");

// open a file called "lenna.png"
Jimp.read("lenna.png", (err, lenna) => {
  if (err) throw err;
  lenna
    .resize(250, 250) // resize
    .quality(60) // set JPEG quality
    .greyscale() // set greyscale
    .write("lena-small-bw.jpg"); // save
});
 */
