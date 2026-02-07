import express from "express";
import cors from "cors";
import postsRoutes from "./routes/posts.js";
import authorsRoutes from "./routes/authors.js";
import searchRoutes from "./routes/search.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔥 TRÈS IMPORTANT
app.use(express.static(path.join(__dirname, "../client")));

app.use("/api/posts", postsRoutes);
app.use("/api/authors", authorsRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`🚀 DevNotes API running on http://localhost:${PORT}`);
});
