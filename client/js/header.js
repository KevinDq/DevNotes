const headerContainer = document.createElement("div");

fetch("/partials/header.html")
  .then(res => res.text())
  .then(html => {
    headerContainer.innerHTML = html;
    document.body.prepend(headerContainer);
  });
