const path = require("path");
const { uploadToCloudinary } = require("./cloudinaryFunctions");

exports.uploadImages = (images) => {
  const dataUris = [];

  var mime_mapping = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
  };

  images.forEach((image) => {
    let mime_type = mime_mapping[path.extname(image.name).substring(1)];
    let b64encoded =
      `data:${mime_type};base64,` + image.getData().toString("base64");

    dataUris.push({
      imageName: image.entryName,
      dataUri: b64encoded,
    });
  });

  let urls = uploadToCloudinary(dataUris);

  return urls;
};
