const path = require("path");
const AdmZip = require("adm-zip");

exports.parseZipFile = (filename) => {
  try {
    const zip = new AdmZip(filename);
    const images = [];
    var html = "";

    for (const entry of zip.getEntries()) {
      let extension = path.extname(entry.name).substring(1);

      let imgExtensions = ["jpg", "png", "jpeg", "jfif", "gif", "webp"];
      
      if (extension == "html") {
        html = entry.getData().toString("utf8");

      } else if (imgExtensions.includes(extension)) {
        images.push(entry);
      }

    }

    return { html, images };

  } catch (e) {
    console.log("Something went wrong - ", e);
  }
};
