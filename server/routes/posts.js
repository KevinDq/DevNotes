import express from "express";
import fs from "fs";
import path from "path";

const postsPath = path.resolve("data/posts.json");
const authorsPath = path.resolve("data/authors.json");

const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
const authors = JSON.parse(fs.readFileSync(authorsPath, "utf-8"));


const router = express.Router();

// Tous les posts (pagination plus tard)
router.get("/", (req, res) => {
  const enrichedPosts = posts.map(post => {
    const author = authors.find(a => a.id === post.authorId);
    return { ...post, author };
  });

  res.json(enrichedPosts);
});


// Post par slug
router.get("/:slug", (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) {
    return res.status(404).json({ message: "Article introuvable" });
  }

  const author = authors.find(a => a.id === post.authorId);

  res.json({
    ...post,
    author
  });
});

export default router;
