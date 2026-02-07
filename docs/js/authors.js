onst API_BASE_URL =
  location.hostname.includes("github.io")
    ? "https://devnotes-1o1i.onrender.com"
    : "http://localhost:3000";

const API_AUTHORS = `${API_BASE_URL}/api/authors`;
const API_POSTS = `${API_BASE_URL}/api/posts`;

const container = document.getElementById("authors");

const [authorsRes, postsRes] = await Promise.all([
  fetch(API_AUTHORS),
  fetch(API_POSTS)
]);

const authors = await authorsRes.json();
const posts = await postsRes.json();

const avatarUrl =
  location.hostname.includes("github.io")
    ? `/devnotes${post.author.avatar}`
    : post.author.avatar;

authors.forEach(author => {
  const authorPosts = posts.filter(p => p.authorId === author.id);

  const div = document.createElement("div");
  div.className = "author";

  div.innerHTML = `
    <img src="${avatarUrl}">

    <div>
      <h2>${author.name}</h2>
      <p>${author.bio}</p>
      <p><strong>${authorPosts.length}</strong> article(s)</p>

      <a href="../pages/index.html?author=${author.id}">
        Voir les articles
      </a>
    </div>
  `;

  container.appendChild(div);
});
