const { parseZipFile } = require("./zipHandler");
const { uploadImages } = require("./uploadHandler");
const { convertToMarkdown, replaceUrls } = require("./convertToMarkdown");

exports.getMarkdown = (filename) => {
  // 1. Extract the ZIP archive, get the images and HTML content
  const { html, images } = parseZipFile(`uploads/${filename}`);

  // 2. Upload Images
  const imageUrls = uploadImages(images);

  // 3. Convert to Markdown
  let markdown = convertToMarkdown(html);

  // 4. Replace image urls
  markdown = replaceUrls(markdown, imageUrls);

  return markdown;
};
