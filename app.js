const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { getMarkdown } = require("./getMarkdown");

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, "uploads"),
  filename: (req, file, callback) =>
    callback(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.post("/convert", upload.single("google-doc"), (req, res) => {
  var { filename, originalname } = req.file;

  if (path.extname(filename) != ".zip") {
    return res.status(500).json({
      status: "fail",
      message: "The file must be an archive.",
    });
  }

  const markdown = getMarkdown(filename);

  res.status(200).json({
    status: "success",
    name: originalname,
    markdown,
  });
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
