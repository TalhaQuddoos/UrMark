# UrMark

### An Urdu-focused Google Docs to Markdown Converter

## What is it?

This is a web app which converts Google Docs to Markdown, making necessary corrections and adjustments for Urdu language.

## How to Use?

1.  In <span dir="ltr">[Google Docs](https://docs.google.com)</span>, open the **File** menu, point the mouse over **Download** and click **Web Page (.html, zipped)** . A **.zip**   file will be downloaded into your computer.

![](https://res.cloudinary.com/talhaquddoos/image/upload/v1645634361/qfavo74qvbfho2hsbzwj.png)

2.  Now go to <span dir="ltr">[https://ur-mark.herokuapp.com/](https://ur-mark.herokuapp.com/)</span> and upload the downloaded file by dragging it over the upload area, and click **Convert** .

        A markdown file will be downloaded into your computer.

![](https://res.cloudinary.com/talhaquddoos/image/upload/v1645634354/elsekwunvuihyc01qikq.png)

Here’s how the generated markdown looks:

![](https://res.cloudinary.com/talhaquddoos/image/upload/v1645634364/ofa1b8t5h9lobx8fp88p.png)

If your links appear incorrect, you can change them manually :).

## Guidelines for Google Docs:

These are the guidelines you should follow while writing your article in Google Docs, so that the converter can handle them correctly.

### Headings:

To create a heading (`H1` for example), open the **Format** menu, point the mouse over **Paragraph styles**  → **Heading 1**  and click **Apply ‘Heading 1’**  .

![](https://res.cloudinary.com/talhaquddoos/image/upload/v1645634359/d2p4a6dkldlhmdjbvhyj.png)

### Inline Code:

To put inline code, format it as striked-through text, and the app will wrap it inside `\`` and `\``. I know it’s weird, but Google Docs doesn’t provide the ability to add code blocks by default.

![](https://res.cloudinary.com/talhaquddoos/image/upload/v1645634352/uwrlpig1ulguehx6dx8m.png)

### Multi-line Code Block:

To add a code block, create a table with a single cell (one row and one column) and put your code inside it. You can also specify the language in  the first line (optional).

![](https://res.cloudinary.com/talhaquddoos/image/upload/v1645634358/myladn88ehuq2umxmcxw.png)

* * *

![](https://res.cloudinary.com/talhaquddoos/image/upload/v1645634362/k9jvw5xgujbphobahtmy.png)

### LTR (Left-to-Right) Text in Urdu Line:

When we write English text or code inside an RTL line, for example:

> &rlm; فنکشن کو کال کرنے کے لیے function() لکھا جاتا ہے۔

The parentheses appear left to the `function` , while they should be on its right. To avoid this problem, format the text as underlined, like this:

![](https://res.cloudinary.com/talhaquddoos/image/upload/v1645634356/sx2lwr4gegesqlll4az5.png)

And that’s it for the rules.

## Tech Stack

This web app is built using Node.js, and uses the following libraries:

*   node-html-parser
*   turndown
*   adm-zip
*   cloudinary
*   express
*   jotform-css.js
*   multer
*   jsonata
*   html-entities

## Contributing

Make a pull request if you have any idea :).