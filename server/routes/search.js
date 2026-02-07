import express from "express";
import fs from "fs";
import path from "path";

const dataPath = path.resolve("data/posts.json");
const posts = JSON.parse(fs.readFileSync(dataPath, "utf-8"));


const router = express.Router();

router.get("/", (req, res) => {
  const q = (req.query.q || "").toLowerCase();

  const results = posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.tags.some(tag => tag.includes(q))
  );

  res.json(results);
});

export default router;
