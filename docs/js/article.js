import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { commentsData } from "./comments.js";

const API_BASE_URL =
  location.hostname.includes("github.io")
    ? "https://devnotes-1o1i.onrender.com"
    : "http://localhost:3000";
const API_POSTS = `${API_BASE_URL}/api/posts`;

// 1. Récupérer le slug
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (!slug) {
  document.body.textContent = "Article introuvable.";
  throw new Error("Slug manquant");
}

// 2. Fetch de l'article
const res = await fetch(`${API_POSTS}/${slug}`);

if (!res.ok) {
  document.body.textContent = "Article introuvable.";
  throw new Error("Article non trouvé");
}

const post = await res.json();

// 3. Injecter les données
document.getElementById("title").textContent = post.title;
document.getElementById("meta").textContent =
  `${post.author.name} · ${post.date}`;

const contentEl = document.getElementById("content");
contentEl.innerHTML = marked.parse(post.content);

// 4. Générer la TOC
const tocList = document.querySelector("#toc ul");
const headings = contentEl.querySelectorAll("h2, h3");

headings.forEach(h => {
  const id = h.textContent.toLowerCase().replace(/\s+/g, "-");
  h.id = id;

  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = `#${id}`;
  a.textContent = h.textContent;

  li.appendChild(a);
  tocList.appendChild(li);
});

// --- Articles liés ---
const relatedContainer = document.getElementById("related");

const resAll = await fetch(API_POSTS);
const allPosts = await resAll.json();

const relatedPosts = allPosts
  .filter(p =>
    p.slug !== post.slug &&
    p.tags.some(tag => post.tags.includes(tag))
  )
  .map(p => {
    const commonTags = p.tags.filter(tag => post.tags.includes(tag)).length;
    return { ...p, score: commonTags };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);

if (relatedPosts.length === 0) {
  relatedContainer.innerHTML = "<li>Aucun article lié.</li>";
} else {
  relatedPosts.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="article.html?slug=${p.slug}">
        ${p.title}
      </a>
    `;
    relatedContainer.appendChild(li);
  });
}

// --- Partage réseaux ---
const pageUrl = window.location.href;
const title = post.title;

const twitterLink = document.getElementById("shareTwitter");
const linkedinLink = document.getElementById("shareLinkedIn");

twitterLink.href =
  `https://twitter.com/intent/tweet?` +
  `text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`;

linkedinLink.href =
  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;

 // --- Commentaires factices ---
const commentsContainer = document.getElementById("comments");

const entry = commentsData.find(c => c.slug === post.slug);

if (!entry || entry.comments.length === 0) {
  commentsContainer.innerHTML = "<p>Aucun commentaire pour le moment.</p>";
} else {
  entry.comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";

    div.innerHTML = `
      <div class="comment-author">${c.author}</div>
      <div class="comment-date">${c.date}</div>
      <div class="comment-content">${c.content}</div>
    `;

    commentsContainer.appendChild(div);
  });
}
 
