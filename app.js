const express = require("express");
const postsRouter = require("./posts/postsRouter");

const app = express();

app.use(express.json());
app.use("/api/posts", postsRouter);

app.get("/", (req, res) => {
  res.send(`
    <h2>Blog App</h2>
    <p>Welcome to Blog App!</p>
  `);
});

module.exports = app;
