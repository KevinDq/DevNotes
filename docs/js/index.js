const API_BASE_URL =
  location.hostname.includes("github.io")
    ? "https://devnotes-1o1i.onrender.com"
    : "http://localhost:3000";

const API_POSTS = `${API_BASE_URL}/api/posts`;
const API_SEARCH = `${API_BASE_URL}/api/search`;
const POSTS_PER_PAGE = 5;

const container = document.getElementById("posts");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");

const params = new URLSearchParams(window.location.search);
let currentPage = parseInt(params.get("page") || "1", 10);

// --- Utils ---
function renderPosts(posts) {
  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML = "<p>Aucun article trouvé.</p>";
    return;
  }

  posts.forEach(post => {
    const article = document.createElement("article");
    article.className = "post";

    const excerpt =
      post.content.replace(/[#*_`]/g, "").slice(0, 140) + "...";

    article.innerHTML = `
      <h2>
        <a href="article.html?slug=${post.slug}">
          ${post.title}
        </a>
      </h2>

      <div class="meta">
        ${post.author?.name ?? "Auteur inconnu"} · ${post.date}
      </div>

      <p class="excerpt">${excerpt}</p>

      <div class="tags">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
    `;

    container.appendChild(article);
  });
}

const authorFilter = params.get("author");

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / POSTS_PER_PAGE);

  pagination.innerHTML = `
    <a href="?page=${currentPage - 1}"
       class="${currentPage <= 1 ? "disabled" : ""}">
       ← Précédent
    </a>

    <span>Page ${currentPage} / ${totalPages}</span>

    <a href="?page=${currentPage + 1}"
       class="${currentPage >= totalPages ? "disabled" : ""}">
       Suivant →
    </a>
  `;
}

// --- Initial load ---
const res = await fetch(API_POSTS);
const allPosts = await res.json();

let filteredPosts = allPosts;

if (authorFilter) {
  filteredPosts = allPosts.filter(
    post => post.authorId === parseInt(authorFilter, 10)
  );
}

const tagFilter = params.get("tag");

if (tagFilter) {
  filteredPosts = filteredPosts.filter(post =>
    post.tags.includes(tagFilter)
  );
}


const start = (currentPage - 1) * POSTS_PER_PAGE;
const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

renderPosts(paginatedPosts);
renderPagination(filteredPosts.length);

// --- Recherche ---
let searchTimeout;

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    const query = searchInput.value.trim();

    if (query === "") {
      renderPosts(paginatedPosts);
      renderPagination(allPosts.length);
      return;
    }

    const res = await fetch(`${API_SEARCH}?q=${encodeURIComponent(query)}`);
    const results = await res.json();

    pagination.innerHTML = ""; // pas de pagination en mode recherche
    renderPosts(results);
  }, 300);
});
