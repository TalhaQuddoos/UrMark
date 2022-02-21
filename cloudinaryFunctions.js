const cloudinary = require("cloudinary").v2;
const syncPromise = require("synchronized-promise");
require("dotenv").config()

var options = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
}

cloudinary.config(options);

const uploadSync = syncPromise((file) =>
  cloudinary.uploader.upload(file).then((response) => {
    return response;
  })
);

exports.uploadToCloudinary = (images) => {
  const urls = [];

  images.forEach((image) => {
    let { imageName, dataUri } = image;
    let url = uploadSync(dataUri)["secure_url"];
    urls.push({ imageName, url });
  });

  return urls;
};
