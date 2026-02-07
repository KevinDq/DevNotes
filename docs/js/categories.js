const API_BASE_URL =
  location.hostname.includes("github.io")
    ? "https://devnotes-1o1i.onrender.com"
    : "http://localhost:3000";

const API_POSTS = `${API_BASE_URL}/api/posts`;

const container = document.getElementById("categories");

const res = await fetch(API_POSTS);
const posts = await res.json();

// Construire la map des tags
const tagsMap = {};

posts.forEach(post => {
  post.tags.forEach(tag => {
    tagsMap[tag] = (tagsMap[tag] || 0) + 1;
  });
});

// Transformer en tableau trié
const tags = Object.entries(tagsMap)
  .sort((a, b) => b[1] - a[1]);

tags.forEach(([tag, count]) => {
  const div = document.createElement("div");
  div.className = "category";

  div.innerHTML = `
    <a href="../pages/index.html?tag=${encodeURIComponent(tag)}">
      ${tag}
    </a>
    <span>${count} article(s)</span>
  `;

  container.appendChild(div);
});
