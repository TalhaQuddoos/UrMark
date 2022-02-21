const fs = require("fs");
const { parse } = require("node-html-parser");
const htmlFormatter = require("html");

const {
  parseCSS,
  handleLTR,
  handleCodeBlocks,
  handleRTL,
  convertMarkdown,
} = require("./markdownFunctions");

exports.convertToMarkdown = (html) => {
  html = htmlFormatter.prettyPrint(html, { indent_size: 4 });

  var document = parse(html);
  var css = document.querySelector("style").innerText;
  var body = parse(document.querySelector("body").innerHTML);

  const parsedCSS = parseCSS(css);

  body = parse(handleLTR(body, parsedCSS));
  body = parse(handleRTL(body));

  body = handleCodeBlocks(body);

  var markdown = convertMarkdown(body.innerHTML);

  return markdown;
};

exports.replaceUrls = (markdown, images) => {
  images.forEach((image) => {
    markdown = markdown.replaceAll(
      `![](${image.imageName})`,
      `![](${image.url})`
    );
  });

  return markdown;
};
