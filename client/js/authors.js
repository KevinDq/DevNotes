const API_AUTHORS = "http://localhost:3000/api/authors";
const API_POSTS = "http://localhost:3000/api/posts";

const container = document.getElementById("authors");

const [authorsRes, postsRes] = await Promise.all([
  fetch(API_AUTHORS),
  fetch(API_POSTS)
]);

const authors = await authorsRes.json();
const posts = await postsRes.json();

authors.forEach(author => {
  const authorPosts = posts.filter(p => p.authorId === author.id);

  const div = document.createElement("div");
  div.className = "author";

  div.innerHTML = `
    <img src="${author.avatar}" alt="${author.name}" />

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
