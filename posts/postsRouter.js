const express = require("express");
const router = express.Router();
const Posts = require("./db.js");

router.post("/", (req, res) => {
  const newPost = req.body;

  Posts.insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.error(error.message);
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post.",
      });
    });
});

router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  const text = req.body;
  const newComment = {
    text: text,
    post_id: id,
  };

  Posts.insertComment(newComment)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      console.error(error.message);
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

router.get("/", (req, res) => {
  Posts.find()
    .then((post) => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch((error) => {
      console.error(error.message);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.error(error.message);
      res
        .status(404)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((post) => {
      if (post > 0) {
        res.status(200).json({ message: "Post successfully deleted!" });
      }
    })
    .catch((error) => {
      console.error(error.message);
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

router.put("/:id", (req, res) => {
  const postChanges = req.body;

  if (postChanges.title && postChanges.contents) {
    Posts.update(req.params.id, postChanges)
      .then((post) => {
        if (post) {
          Posts.findById(req.params.id)
            .then((post) => {
              res.status(200).json(post);
            })
            .catch((err) => {
              res.status(500).json({
                errorMessage: "The post with the specified ID does not exist.",
              });
            });
        } else {
          res
            .status(404)
            .json({ error: "The post information could not be modified." });
        }
      })
      .catch((err) => {
        res
          .status(404)
          .json({ error: "The post information could not be modified." });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
});

module.exports = router;
