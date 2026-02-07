import express from "express";
import fs from "fs";
import path from "path";

const authorsPath = path.resolve("data/authors.json");
const authors = JSON.parse(fs.readFileSync(authorsPath, "utf-8"));


const router = express.Router();

router.get("/", (req, res) => {
  res.json(authors);
});

export default router;
