var convertButton = document.querySelector("#convert");

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const dropArea = document.querySelector(".drag-area"),
  dragText = dropArea.querySelector(".drag-text"),
  input = dropArea.querySelector(".google-doc-file");

dropArea.onclick = () => {
  input.click();
};

input.addEventListener("change", function () {
  dropArea.classList.add("active");
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to upload the document";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drop the document here";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("active");
  input.files = event.dataTransfer.files;
  dragText.textContent = `${input.files[0].name}`;
  console.log("file dropped");
});

input.onchange = (e) => {
  dropArea.classList.remove("active");
  dragText.textContent = `${input.files[0].name}`;
};

function convertDoc(e) {
  var data = new FormData();
  data.append("google-doc", input.files[0]);

  convertButton.style.opacity = 0.8;
  convertButton.disabled = true;

  fetch("convert", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let { markdown, name } = data;
      convertButton.style.opacity = 1;
      convertButton.disabled = false;
      download(name.replace("zip", "md"), markdown);
    });
}

convertButton.addEventListener("click", convertDoc);
