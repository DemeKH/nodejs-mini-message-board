const express = require("express");
const app = express();
const port = 3000;

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Define a route that renders an EJS template
app.get("/new", (req, res) => {
  res.render("form", { title: "Mini Messageboard", messages: messages });
});
app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/message/:index", (req, res) => {
  const messageIndex = req.params.index;
  const message = messages[messageIndex];

  if (message) {
    res.render("message", { message });
  } else {
    res.status(404).send("Message not found");
  }
});

app.use(express.urlencoded({ extended: true }));

app.post("/new", (req, res) => {
  const { messageText, authorName } = req.body;
  messages.push({ text: messageText, user: authorName, added: new Date() });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
