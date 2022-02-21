var TurndownService = require("turndown");
const jsonata = require("jsonata");
const { cssjs } = require("jotform-css.js/css.js");
const { encode, decode } = require("html-entities");

exports.parseCSS = (css) => {
  var parser = new cssjs();
  return parser.parseCSS(css);
};

exports.handleRTL = (root) => {
  root
    .querySelectorAll(
      'h1[dir="rtl"],h2[dir="rtl"],h3[dir="rtl"],h4[dir="rtl"],h5[dir="rtl"],h6[dir="rtl"], p[dir="rtl"],div[dir="rtl"],li[dir="rtl"]:nth-child(1)'
    )
    .forEach((el) => {
      let firstChar = el.innerText.replaceAll(/\s+/g, "")[0];
      let isUrdu =
        /[\u0590-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC]/g.test(
          firstChar
        );

      if (!isUrdu) {
        var tag = el.tagName.toLowerCase() + "-rtl";
        var newEl = `<${tag}>${el.innerHTML}</${tag}>`;
        el.replaceWith(newEl);
      }
    });
  return root;
};

exports.handleLTR = (root, parsedCSS) => {
  root.querySelectorAll("span").forEach((span) => {
    var className = span.classList.toString();
    let styles = jsonata(
      `**[selector=".${className}"].rules[directive="text-decoration" or directive="font-weight" or directive="font-style"]{directive: value}`
    ).evaluate(parsedCSS);

    if (styles["font-weight"] == "700") {
      span.innerHTML = `<b>${span.innerHTML}</b>`;
    }

    if (styles["font-style"] == "italic") {
      span.innerHTML = `<i>${span.innerHTML}</i>`;
    }

    if (styles["text-decoration"]) {
      let textDecoration = styles["text-decoration"];
      textDecoration
        .split(" ")
        .sort()
        .forEach((val) => {
          if (val == "underline") {
            span.innerHTML = `<u>${span.innerHTML}</u>`;
          }
          if (val == "line-through") {
            span.innerHTML = `<s>${span.innerHTML}</s>`;
          }
        });
    }

    span.classList.remove(className);
  });

  return decode(root.innerHTML);
};

exports.handleCodeBlocks = (root) => {
  root.querySelectorAll("table").forEach((table) => {
    let rowsCount = table.querySelectorAll("tr").length;
    let colsCount = table.querySelectorAll("td").length;

    if (rowsCount == 1 && colsCount == 1) {
      var value = table.querySelector("td").innerText;
      var regex = /^[\s]+/g;
      var spaces = value.match(regex);

      if (spaces) {
        spaces = spaces[0].replaceAll("\n", "");
        spaces = spaces.replaceAll("\r", "");
        value = value.replaceAll(spaces, "");
      }

      const codeContainer = "<pre>" + encode(value) + "</pre>";
      table.replaceWith(codeContainer);
    }
  });

  return root;
};

exports.convertMarkdown = (html) => {
  return turndownService.turndown(html);
};

var turndownService = new TurndownService({ headingStyle: "atx" });
turndownService.addRule("ltr", {
  filter: ["u"],
  replacement: function (content) {
    return '<span dir="ltr">' + content + "</span>";
  },
});

turndownService.addRule("inline-code", {
  filter: ["s"],
  replacement: function (content) {
    return "`" + content + "`";
  },
});

turndownService.addRule("mutliline-code", {
  filter: ["pre"],
  replacement: function (content) {
    var languages = [
      "html",
      "css",
      "js",
      "javascript",
      "python",
      "py",
      "php",
      "bash",
      "cmd",
    ];
    var firstLine = content.split("\n")[0].replaceAll(" ", "");
    if (languages.includes(firstLine)) {
      return "```" + content + "\n```";
    }
    return "```\n" + content + "\n```";
  },
});

turndownService.addRule("h1-rtl", {
  filter: ["h1-rtl"],
  replacement: function (content) {
    return "# &rlm; " + content + "\n\n";
  },
});

turndownService.addRule("h2-rtl", {
  filter: ["h2-rtl"],
  replacement: function (content) {
    return "## &rlm; " + content + "\n\n";
  },
});

turndownService.addRule("h3-rtl", {
  filter: ["h3-rtl"],
  replacement: function (content) {
    return "### &rlm; " + content + "\n\n";
  },
});

turndownService.addRule("h4-rtl", {
  filter: ["h4-rtl"],
  replacement: function (content) {
    return "#### &rlm; " + content + "\n\n";
  },
});

turndownService.addRule("h5-rtl", {
  filter: ["h5-rtl"],
  replacement: function (content) {
    return "##### &rlm; " + content + "\n\n";
  },
});

turndownService.addRule("h6-rtl", {
  filter: ["h6-rtl"],
  replacement: function (content) {
    return "###### &rlm; " + content + "\n\n";
  },
});

turndownService.addRule("p-rtl", {
  filter: ["p-rtl"],
  replacement: function (content) {
    return "&rlm; " + content + "\n\n";
  },
});

turndownService.addRule("div-rtl", {
  filter: ["div-rtl"],
  replacement: function (content) {
    return "&rlm; " + content + "\n\n";
  },
});

turndownService.addRule("li-rtl", {
  filter: ["li-rtl"],
  replacement: function (content) {
    return "* &rlm; " + content + "\n";
  },
});
